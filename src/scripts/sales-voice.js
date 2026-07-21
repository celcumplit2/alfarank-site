const FORM_SELECTOR = "[data-voice-form]";
const FIELD_SELECTOR = [
  "input[name]:not([type='hidden']):not([type='password']):not([type='submit']):not([type='file'])",
  "textarea[name]",
  "select[name]"
].join(",");

const SILENCE_AUTO_STOP_MS = 1400;
const PAUSE_GRACE_MS = 1800;
const NO_SPEECH_AUTO_STOP_MS = 9000;
const MAX_RECORDING_MS = 45000;
const VOICE_RMS_THRESHOLD = 0.035;
const TRANSIENT_VOICE_STATUSES = new Set([408, 429, 500, 502, 503, 504]);
const MAX_SAFE_ERROR_CHARS = 360;

let activeRecording = null;

function preferredMimeType() {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) || "";
}

function voiceSupported() {
  return Boolean(window.isSecureContext && typeof MediaRecorder !== "undefined" && navigator.mediaDevices?.getUserMedia);
}

function friendlyMicError(error) {
  if (error instanceof DOMException) {
    if (error.name === "NotAllowedError") {
      return "Доступ к микрофону запрещён. Разрешите микрофон для этого сайта в настройках браузера.";
    }
    if (error.name === "NotFoundError") return "Микрофон не найден. Проверьте подключение устройства.";
    if (error.name === "NotReadableError") return "Микрофон занят другим приложением или недоступен.";
  }
  return error instanceof Error ? error.message : "Браузер не дал доступ к микрофону.";
}

function permissionError(message, code = "permission-denied") {
  const error = new Error(message);
  error.code = code;
  return error;
}

function isMicrophonePermissionError(error) {
  return Boolean(
    error?.code === "permission-denied" ||
      error?.code === "permission-timeout" ||
      (error instanceof DOMException && ["NotAllowedError", "SecurityError"].includes(error.name))
  );
}

function microphoneSettingsHint() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("firefox")) {
    return "Нажмите значок разрешений слева от адреса сайта, сбросьте блокировку микрофона и выберите «Разрешить» при следующем запросе.";
  }
  if (userAgent.includes("safari") && !userAgent.includes("chrome") && !userAgent.includes("chromium")) {
    return "Откройте Safari → «Настройки для этого веб-сайта» → «Микрофон» и выберите «Разрешить».";
  }
  return "Нажмите значок настроек сайта слева от адреса, откройте «Микрофон» и выберите «Разрешить».";
}

function showPermissionHelp(instance, feedback = "") {
  instance.permissionHelp.hidden = false;
  instance.permissionHint.textContent = microphoneSettingsHint();
  instance.permissionFeedback.hidden = !feedback;
  instance.permissionFeedback.textContent = feedback;
  setPanelStatus(instance, "Браузер не смог открыть микрофон. Остальные поля карточки доступны.", "error");
}

function hidePermissionHelp(instance) {
  instance.permissionHelp.hidden = true;
  instance.permissionFeedback.hidden = true;
  instance.permissionFeedback.textContent = "";
}

async function checkMicrophonePermission(instance) {
  instance.permissionCheck.disabled = true;
  instance.permissionCheck.textContent = "Проверяю...";
  hidePermissionHelp(instance);
  await startListening(instance);
  instance.permissionCheck.disabled = false;
  instance.permissionCheck.textContent = "Проверить микрофон";
}

function fieldLabel(field) {
  const label = field.closest("label");
  return label?.querySelector(":scope > span")?.textContent?.trim() || field.name || "поле";
}

function eligibleFields(form) {
  return Array.from(form.querySelectorAll(FIELD_SELECTOR)).filter((field) => !field.disabled);
}

function formTitle(form) {
  return form.querySelector(":scope > .sales-panel-head h2")?.textContent?.trim() || "Карточка Sales Tracker";
}

function fieldDefinition(field) {
  const type =
    field instanceof HTMLInputElement && field.type === "checkbox"
      ? "checkbox"
      : field instanceof HTMLSelectElement
        ? "select"
        : field.matches("[data-date-field]")
          ? "date"
          : field instanceof HTMLTextAreaElement
            ? "textarea"
            : "text";

  return {
    name: field.name,
    label: fieldLabel(field),
    type,
    required: field.required,
    options:
      field instanceof HTMLSelectElement
        ? Array.from(field.options)
            .filter((option) => !option.disabled)
            .map((option) => ({ value: option.value, label: option.textContent?.trim() || option.value }))
        : []
  };
}

function setPanelStatus(instance, message, mode = "") {
  instance.status.textContent = message;
  instance.status.dataset.mode = mode;
}

function setButtonPhase(instance, phase) {
  instance.button.dataset.phase = phase;
  instance.button.disabled = phase === "requesting" || phase === "transcribing";
  instance.button.setAttribute("aria-pressed", phase === "listening" ? "true" : "false");
  instance.buttonLabel.textContent =
    phase === "listening"
      ? "Остановить"
      : phase === "requesting"
        ? "Подключаю..."
        : phase === "transcribing"
          ? "Распознаю..."
          : "Говорить";
}

function normalizeChoice(value) {
  return String(value || "")
    .toLocaleLowerCase("ru-RU")
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/gi, " ")
    .trim();
}

function editDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1)
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function selectOptionFromSpeech(select, transcript) {
  const spoken = normalizeChoice(transcript);
  if (!spoken) return false;
  const aliases = new Map([
    ["высокая", "высокий"],
    ["высокое", "высокий"],
    ["средняя", "средний"],
    ["среднее", "средний"],
    ["низкая", "низкий"],
    ["низкое", "низкий"],
    ["готово", "сделано"],
    ["выполнено", "сделано"],
    ["запланировать", "запланировано"]
  ]);
  const normalizedSpoken = aliases.get(spoken) || spoken;
  const ranked = Array.from(select.options)
    .filter((option) => !option.disabled)
    .map((option) => {
      const label = normalizeChoice(option.label || option.textContent || option.value);
      const value = normalizeChoice(option.value);
      let score = 0;
      if (label === normalizedSpoken || value === normalizedSpoken) score = 100;
      else if (label.includes(normalizedSpoken) || normalizedSpoken.includes(label)) score = 80;
      else {
        const distance = Math.min(editDistance(normalizedSpoken, label), editDistance(normalizedSpoken, value));
        score = 60 - (distance / Math.max(normalizedSpoken.length, label.length, 1)) * 60;
      }
      return { option, score };
    })
    .sort((left, right) => right.score - left.score);

  if (!ranked[0] || ranked[0].score < 34) return false;
  select.value = ranked[0].option.value;
  return true;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function validDateParts(day, month, year) {
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function formatSpokenDate(transcript) {
  const spoken = normalizeChoice(transcript);
  const today = new Date();
  const relativeDays = spoken.includes("послезавтра")
    ? 2
    : spoken.includes("завтра")
      ? 1
      : spoken.includes("сегодня")
        ? 0
        : null;

  if (relativeDays !== null) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + relativeDays);
    return `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()}`;
  }

  const numeric = String(transcript).match(/(?:^|\D)(\d{1,2})[.\-/\s](\d{1,2})(?:[.\-/\s](\d{2,4}))?(?:\D|$)/);
  if (numeric) {
    const day = Number(numeric[1]);
    const month = Number(numeric[2]);
    const rawYear = numeric[3] ? Number(numeric[3]) : today.getFullYear();
    const year = rawYear < 100 ? 2000 + rawYear : rawYear;
    if (validDateParts(day, month, year)) return `${pad2(day)}.${pad2(month)}.${year}`;
  }

  const months = {
    января: 1,
    январь: 1,
    февраля: 2,
    февраль: 2,
    марта: 3,
    март: 3,
    апреля: 4,
    апрель: 4,
    мая: 5,
    май: 5,
    июня: 6,
    июнь: 6,
    июля: 7,
    июль: 7,
    августа: 8,
    август: 8,
    сентября: 9,
    сентябрь: 9,
    октября: 10,
    октябрь: 10,
    ноября: 11,
    ноябрь: 11,
    декабря: 12,
    декабрь: 12
  };
  const monthName = Object.keys(months).find((name) => spoken.includes(name));
  if (monthName) {
    const numbers = spoken.match(/\d{1,4}/g) || [];
    const day = Number(numbers[0]);
    const year = Number(numbers[1] || today.getFullYear());
    const month = months[monthName];
    if (validDateParts(day, month, year)) return `${pad2(day)}.${pad2(month)}.${year}`;
  }
  return "";
}

function setFieldValue(field, value) {
  const transcript = typeof value === "string" ? value : value ? "да" : "нет";
  if (field instanceof HTMLSelectElement) {
    if (!selectOptionFromSpeech(field, transcript)) {
      throw new Error(`Не нашёл вариант «${transcript}» в поле «${fieldLabel(field)}».`);
    }
  } else if (field instanceof HTMLInputElement && field.type === "checkbox") {
    if (typeof value === "boolean") field.checked = value;
    else {
      const spoken = normalizeChoice(transcript);
      field.checked = !/(^|\s)(нет|не нужно|не нужна|выключить|убрать)(\s|$)/.test(spoken);
    }
  } else if (field.matches("[data-date-field]")) {
    const date = formatSpokenDate(transcript);
    if (!date) throw new Error(`Не понял дату «${transcript}». Скажите, например: «25 июля 2026».`);
    field.value = date;
  } else {
    field.value = transcript.trim().replace(field instanceof HTMLTextAreaElement ? /\s+$/ : /[.\s]+$/, "");
  }

  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  field.closest("label")?.classList.add("is-voice-filled");
  window.setTimeout(() => field.closest("label")?.classList.remove("is-voice-filled"), 1600);
}

function stopTracks(session) {
  if (session.silenceTimer) window.clearInterval(session.silenceTimer);
  if (session.maxTimer) window.clearTimeout(session.maxTimer);
  session.audioContext?.close().catch(() => {});
  session.stream?.getTracks().forEach((track) => track.stop());
  session.silenceTimer = null;
  session.maxTimer = null;
  session.audioContext = null;
}

function startVoiceDetection(session) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  session.maxTimer = window.setTimeout(() => {
    if (session.recorder.state === "recording") session.recorder.stop();
  }, MAX_RECORDING_MS);
  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  const source = audioContext.createMediaStreamSource(session.stream);
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024;
  source.connect(analyser);

  const samples = new Uint8Array(analyser.fftSize);
  session.audioContext = audioContext;
  session.startedAt = Date.now();
  session.lastSpeechAt = session.startedAt;
  session.speechDetected = false;
  session.pauseStartedAt = null;

  session.silenceTimer = window.setInterval(() => {
    if (session.recorder.state !== "recording") return;
    analyser.getByteTimeDomainData(samples);
    let total = 0;
    for (const sample of samples) {
      const centered = (sample - 128) / 128;
      total += centered * centered;
    }

    const now = Date.now();
    const rms = Math.sqrt(total / samples.length);
    if (rms > VOICE_RMS_THRESHOLD) {
      session.speechDetected = true;
      session.lastSpeechAt = now;
      session.pauseStartedAt = null;
    }

    if (!session.speechDetected && now - session.startedAt > NO_SPEECH_AUTO_STOP_MS) {
      setPanelStatus(session.instance, "Речь не услышана. Останавливаю запись.", "error");
      session.recorder.stop();
      return;
    }
    if (!session.speechDetected || now - session.lastSpeechAt <= SILENCE_AUTO_STOP_MS) return;
    if (!session.pauseStartedAt) {
      session.pauseStartedAt = now;
      setPanelStatus(session.instance, "Пауза — ещё слушаю...", "listening");
      return;
    }
    if (now - session.pauseStartedAt > PAUSE_GRACE_MS) session.recorder.stop();
  }, 140);
}

function fallbackVoiceError(response) {
  if (TRANSIENT_VOICE_STATUSES.has(response.status)) {
    return "Сервис распознавания временно не ответил. Попробуйте ещё раз через несколько секунд.";
  }
  if (response.status === 401 || response.status === 403) {
    return "Сессия Sales Tracker истекла. Обновите страницу и войдите снова.";
  }
  if (response.status === 413) return "Аудиозапись слишком длинная. Продиктуйте карточку короче.";
  return "Не удалось обработать аудио. Попробуйте ещё раз.";
}

function safeVoiceError(value, response) {
  const message = String(value || "").replace(/\s+/g, " ").trim();
  const looksLikeMarkup = /<(?:!doctype|html|head|body|script|style|div|h[1-6]|p)\b/i.test(message);
  if (!message || looksLikeMarkup || message.length > MAX_SAFE_ERROR_CHARS) return fallbackVoiceError(response);
  return message;
}

async function readJsonResponse(response) {
  const text = await response.text();
  try {
    const payload = text ? JSON.parse(text) : {};
    if (payload && typeof payload === "object" && "error" in payload) payload.error = safeVoiceError(payload.error, response);
    return payload;
  } catch {
    return { error: safeVoiceError(text || response.statusText, response) };
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function requestVoice(body, instance) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    let response;
    try {
      response = await fetch("/api/sales/voice", { method: "POST", credentials: "same-origin", body });
    } catch {
      if (attempt === 0) {
        setPanelStatus(instance, "Связь прервалась. Повторяю запрос к Grok...");
        await wait(700);
        continue;
      }
      throw new Error("Не удалось связаться с сервисом распознавания. Проверьте интернет и попробуйте ещё раз.");
    }

    const payload = await readJsonResponse(response);
    if (response.ok) return payload;
    if (attempt === 0 && TRANSIENT_VOICE_STATUSES.has(response.status)) {
      setPanelStatus(instance, "Grok временно не ответил. Автоматически повторяю запрос...");
      await wait(900);
      continue;
    }
    throw new Error(payload.error || fallbackVoiceError(response));
  }
  throw new Error("Сервис распознавания временно недоступен. Попробуйте ещё раз через несколько секунд.");
}

async function transcribe(session, chunks) {
  const { instance, recorder } = session;
  setButtonPhase(instance, "transcribing");
  setPanelStatus(instance, "Grok распознаёт речь и раскладывает значения по полям карточки...");

  const mimeType = recorder.mimeType || "audio/webm";
  const extension = mimeType.includes("mp4") ? "m4a" : "webm";
  const audio = new Blob(chunks, { type: mimeType });
  const fields = eligibleFields(instance.form);
  const body = new FormData();
  body.append("file", new File([audio], `sales-voice.${extension}`, { type: mimeType }));
  body.append("form_title", formTitle(instance.form));
  body.append("form_schema", JSON.stringify(fields.map(fieldDefinition)));

  const payload = await requestVoice(body, instance);
  const transcript = String(payload.text || "").trim();
  if (!transcript) throw new Error("Речь не распознана. Попробуйте сказать короче и ближе к микрофону.");
  const values = payload.values && typeof payload.values === "object" ? payload.values : {};
  const filled = [];
  const failures = [];
  for (const field of fields) {
    if (!Object.prototype.hasOwnProperty.call(values, field.name)) continue;
    const value = values[field.name];
    if (value === null || value === undefined || value === "") continue;
    try {
      setFieldValue(field, value);
      filled.push(fieldLabel(field));
    } catch (error) {
      failures.push(error instanceof Error ? error.message : fieldLabel(field));
    }
  }

  if (!filled.length) throw new Error(failures[0] || "Grok не нашёл в диктовке значений для полей этой карточки.");
  const filledSummary = filled.slice(0, 6).join(", ");
  const more = filled.length > 6 ? ` и ещё ${filled.length - 6}` : "";
  const warning = failures.length ? ` Не заполнено: ${failures.join("; ")}` : "";
  setPanelStatus(instance, `Заполнено полей: ${filled.length} — ${filledSummary}${more}.${warning}`, failures.length ? "error" : "success");
}

async function requestMicrophone() {
  let timedOut = false;
  const streamPromise = navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    if (timedOut) {
      stream.getTracks().forEach((track) => track.stop());
      throw new Error("Запрос доступа к микрофону уже истёк. Нажмите «Говорить» ещё раз.");
    }
    return stream;
  });
  return Promise.race([
    streamPromise,
    new Promise((_, reject) => {
      window.setTimeout(() => {
        timedOut = true;
        reject(permissionError("Браузер не показал запрос доступа к микрофону.", "permission-timeout"));
      }, 10000);
    })
  ]);
}

async function startListening(instance) {
  if (activeRecording) {
    if (activeRecording.instance === instance && activeRecording.recorder.state === "recording") activeRecording.recorder.stop();
    return;
  }
  if (!eligibleFields(instance.form).length) return;

  try {
    setButtonPhase(instance, "requesting");
    setPanelStatus(instance, "Жду доступ к микрофону...");
    const stream = await requestMicrophone();
    hidePermissionHelp(instance);
    const mimeType = preferredMimeType();
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    const chunks = [];
    const session = { instance, stream, recorder, silenceTimer: null, maxTimer: null, audioContext: null };
    activeRecording = session;

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    });
    recorder.addEventListener("error", () => {
      stopTracks(session);
      activeRecording = null;
      setButtonPhase(instance, "idle");
      setPanelStatus(instance, "Не удалось записать аудио. Попробуйте ещё раз.", "error");
    });
    recorder.addEventListener("stop", () => {
      stopTracks(session);
      activeRecording = null;
      if (!chunks.length) {
        setButtonPhase(instance, "idle");
        setPanelStatus(instance, "Запись получилась пустой. Попробуйте ещё раз.", "error");
        return;
      }
      transcribe(session, chunks)
        .catch((error) => setPanelStatus(instance, error instanceof Error ? error.message : "Не удалось распознать аудио.", "error"))
        .finally(() => setButtonPhase(instance, "idle"));
    });

    recorder.start();
    startVoiceDetection(session);
    setButtonPhase(instance, "listening");
    setPanelStatus(instance, "Слушаю всю карточку. Назовите поля и значения, затем просто замолчите.", "listening");
  } catch (error) {
    activeRecording?.stream?.getTracks().forEach((track) => track.stop());
    activeRecording = null;
    setButtonPhase(instance, "idle");
    if (isMicrophonePermissionError(error)) {
      showPermissionHelp(instance);
    } else {
      setPanelStatus(instance, friendlyMicError(error), "error");
    }
  }
}

function createPanel(form) {
  if (!eligibleFields(form).length) return;
  const panel = document.createElement("section");
  panel.className = "sales-voice-panel sales-wide";
  panel.dataset.voicePanel = "";
  panel.innerHTML = `
    <div class="sales-voice-copy">
      <span>Alfa Pulse Voice</span>
      <strong data-voice-target>Заполнение: вся карточка</strong>
      <p data-voice-status aria-live="polite"></p>
    </div>
    <button class="sales-button sales-voice-button" type="button" data-voice-button data-phase="idle" aria-pressed="false">
      <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M12 15a3.5 3.5 0 0 0 3.5-3.5v-5a3.5 3.5 0 1 0-7 0v5A3.5 3.5 0 0 0 12 15Zm-6-3.5a6 6 0 0 0 12 0M12 17.5V22m-3 0h6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/></svg>
      <span data-voice-button-label>Говорить</span>
    </button>
    <div class="sales-voice-permission-help" data-voice-permission-help hidden>
      <strong>Микрофон не открылся</strong>
      <p data-voice-permission-hint></p>
      <p class="sales-voice-permission-feedback" data-voice-permission-feedback aria-live="polite" hidden></p>
      <div class="sales-voice-permission-actions">
        <button class="sales-button sales-button--primary" type="button" data-voice-permission-check>Проверить микрофон</button>
        <button class="sales-button sales-button--ghost" type="button" data-voice-permission-dismiss>Скрыть</button>
      </div>
    </div>`;

  form.querySelector(":scope > .sales-panel-head")?.insertAdjacentElement("afterend", panel);
  const instance = {
    form,
    panel,
    status: panel.querySelector("[data-voice-status]"),
    button: panel.querySelector("[data-voice-button]"),
    buttonLabel: panel.querySelector("[data-voice-button-label]"),
    permissionHelp: panel.querySelector("[data-voice-permission-help]"),
    permissionHint: panel.querySelector("[data-voice-permission-hint]"),
    permissionFeedback: panel.querySelector("[data-voice-permission-feedback]"),
    permissionCheck: panel.querySelector("[data-voice-permission-check]")
  };

  if (!voiceSupported()) {
    panel.classList.add("is-unavailable");
    instance.button.disabled = true;
    setPanelStatus(
      instance,
      window.isSecureContext ? "Этот браузер не поддерживает запись с микрофона." : "Голосовой ввод доступен только через HTTPS.",
      "error"
    );
  } else {
    setPanelStatus(
      instance,
      "Нажмите «Говорить» и продиктуйте всю карточку: компанию, контакт, сегмент, следующий шаг, дату и другие известные значения."
    );
  }
  instance.button.addEventListener("click", () => startListening(instance));
  instance.permissionCheck.addEventListener("click", () => checkMicrophonePermission(instance));
  panel.querySelector("[data-voice-permission-dismiss]")?.addEventListener("click", () => {
    hidePermissionHelp(instance);
    setPanelStatus(instance, "Голосовой ввод выключен. Карточку можно заполнять вручную.");
  });
}

function initializeVoiceForms() {
  document.querySelectorAll(FORM_SELECTOR).forEach((form) => {
    if (!form.querySelector(":scope > [data-voice-panel]")) createPanel(form);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeVoiceForms, { once: true });
} else {
  initializeVoiceForms();
}

window.addEventListener("pagehide", () => {
  if (!activeRecording) return;
  stopTracks(activeRecording);
  activeRecording = null;
});
