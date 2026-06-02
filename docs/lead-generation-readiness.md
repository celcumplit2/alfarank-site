# Готовность к лидогенерации

Рабочая задача для постепенного доведения сайта AlfaRank до состояния, в
котором он может стабильно принимать, измерять и обрабатывать лиды из
органического, рекламного, партнерского и прямого трафика.

## Текущая оценка

Ориентировочная готовность: 95%.

Сильные стороны:

- Главная и ключевые страницы уже объясняют, что AlfaRank строит цифровые
  системы, а не продает абстрактные услуги.
- Есть CTA на заявку, отдельная страница `/start-project/`, LP-формы,
  thank-you page и запись заявок в Cloudflare D1.
- На `/start-project/` добавлен короткий вход для холодного лида: имя, email
  и одна формулировка проблемы перед полным брифом.
- Формы сохраняют `source_path`, `landing_page`, `landing_offer`, `form_variant`, язык,
  канал лида, partner/ref-код и UTM-метки.
- API присваивает заявке `lead_score`, `lead_priority`, `routing_bucket` и
  `next_action`, чтобы webhook/CRM сразу получали первичную маршрутизацию.
- Remote D1 уже содержит поля расширенной атрибуции и маршрутизации после
  применения migrations `0004`, `0005` и `0006`.
- Добавлен защищенный endpoint `/api/lead-report` для просмотра сводки по
  источникам, офферам, приоритетам, маршрутам и последним лидам.
- `/api/lead-report` и `/lead-desk/` поддерживают рабочие фильтры по status,
  channel, priority, routing bucket, offer и partner/ref, чтобы оператор видел
  не только общий поток, но и конкретную очередь обработки.
- `/api/lead-report` показывает UTM source/medium/campaign breakdown, чтобы
  сравнивать рекламные, партнерские и контентные кампании без ручного SQL.
- `/api/lead-report` отдельно показывает partner/ref breakdown с active count
  и average score, чтобы партнерские источники можно было сравнивать до
  подключения полноценной CRM.
- `/api/lead-report` и `/lead-desk/` показывают `partner_performance`: total,
  active, contacted, qualified+, proposal, won/lost, unknown ref count,
  average score и performance по каждому partner/ref.
- `/api/lead-report`, `/api/lead-export`, analytics events, and `/lead-desk/`
  preserve `form_variant`, so start-project quick intake, full brief, LP quick
  signals, LP full briefs, and partner forms can be compared as separate lead
  sources.
- `/api/lead-report` и `/lead-desk/` показывают pipeline conversion totals:
  active, contacted, qualified+, proposal, won/lost и win rate, чтобы видеть
  не только входящий поток, но и продвижение лидов по воронке.
- Добавлен защищенный endpoint `/api/lead-status` для перевода лида по
  статусам `new -> contacted -> qualified -> proposal -> won/lost` с owner,
  note и датой обновления.
- Добавлен lifecycle event history: migration `0007` создает
  `project_request_status_events`, `/api/lead-status` возвращает
  `status_event`, а `/api/lead-report` и `/lead-desk/` показывают
  `status_events`. Remote D1 migration `0007` applied; Pages deploy still
  pending.
- `/api/lead-status` now also emits optional lifecycle notifications as
  `project_request.status_updated` to the same webhook/Telegram destinations
  after the D1 status update and event insert succeed. Production destinations
  still need to be configured and verified.
- Добавлен notification delivery audit: migration `0008` создает
  `project_request_notification_events`, webhook/Telegram delivery attempts are
  recorded after notification attempts, and `/api/lead-report` plus
  `/lead-desk/` expose `notification_events`. Remote D1 migration `0008` is
  applied.
- Added form variant tracking: migration `0009` stores `form_variant` on new
  leads and report/export/Lead Desk use it for form-source comparison. Remote
  D1 migration `0009` is applied; Pages deploy and production smoke are still
  pending.
- Report/export/Lead Desk now support `locale=en|ru|ro` filtering and a
  `by_locale` breakdown, so multilingual demand can be reviewed as separate
  EN/RU/RO queues.
- Report/export/Lead Desk now support exact `utm_source`, `utm_medium`, and
  `utm_campaign` filters, so campaign queues and CSV handoffs can be worked by
  traffic source, not only by aggregate UTM breakdown.
- `/api/lead-report` and Lead Desk now expose `source_performance` for
  channels, offers, form variants, UTM sources, and UTM campaigns. Each source
  row includes total, active, contacted, qualified+, proposal, won/lost, latest
  lead time, and average score, so campaigns can be judged by funnel movement
  instead of raw volume only.
- `/api/lead-report`, `/api/lead-export`, and Lead Desk now support
  `response_sla` filtering, with quick operator shortcuts for overdue,
  due-soon, new, and partner leads.
- Lead Desk and CSV export now show the computed first-response due time plus
  remaining/overdue hours, so the operator queue can be worked by deadline.
- `/api/lead-report`, `/api/lead-export`, and Lead Desk now compute
  follow-up SLA after a lead is touched: `stale`, `due_soon`, `on_track`,
  `not_started`, or `closed`.
- `/api/lead-report`, `/api/lead-export`, and Lead Desk now expose owner and
  next-action gap controls: operators can filter active leads that still need
  an owner or a concrete next action.
- `/api/lead-report`, `/api/lead-export`, and Lead Desk now support
  `created_from` / `created_to` period filters, including quick Lead Desk
  ranges for the last 7 and 30 days.
- Lead Desk active queue now exposes follow-up context from the request:
  problem, desired result, output, integrations, budget, timeline, contact
  details, mailto follow-up, and copy-summary action.
- Lead Desk now restores filters from the page URL, keeps queue filters synced
  in the address bar, and can copy a safe view link without exposing the report
  token. This makes campaign, SLA, partner, owner, locale, and date-filtered
  queues repeatable for daily lead handling.
- Отчет считает first-response SLA без новой миграции: high-лиды должны быть
  тронуты за 4 часа, medium за 12 часов, low за 24 часа; Lead Desk показывает
  `overdue`, `due_soon`, `on_track` и `touched`.
- Добавлен защищенный CSV export `/api/lead-export`, чтобы выгружать лиды с
  атрибуцией, routing и lifecycle без ручного SQL и до подключения CRM.
- `/api/lead-export` поддерживает фильтр `partner_ref`, чтобы выгружать лиды
  конкретного партнера или referral-источника.
- Добавлена внутренняя страница `/lead-desk/` с `noindex, nofollow`: оператор
  вводит `LEAD_REPORT_TOKEN`, видит очередь лидов, меняет статусы и выгружает
  CSV без передачи токена в URL. Фильтры отчета и CSV совпадают, поэтому можно
  работать с конкретным каналом, партнером, оффером или SLA-очередью без D1
  console.
- Для публичных форм добавлен опциональный Cloudflare Turnstile: виджет
  включается через `PUBLIC_TURNSTILE_SITE_KEY`, серверная проверка через
  `TURNSTILE_SECRET_KEY`; без ключей текущие формы продолжают работать как
  раньше.
- Добавлена опциональная Telegram-доставка новых лидов: после записи в D1
  функция может отправлять в рабочий чат приоритет, маршрут, контакт,
  источник, UTM, partner/ref-код и ссылку на `/lead-desk/`.
- Добавлен `npm run qa:lead-flow`, который отправляет EN/RU/RO smoke-заявки и
  при наличии токена сверяет их через `/api/lead-report` и проверяет
  lifecycle-обновление через `/api/lead-status` и CSV export.
- Добавлен `npm run qa:lead-flow:local`: команда сама собирает сайт, поднимает
  локальный `wrangler pages dev` с D1 persistence и временным
  `LEAD_REPORT_TOKEN`, запускает локальный webhook capture, проверяет
  `project_request.created` и `project_request.status_updated`, запускает
  EN/RU/RO smoke, verifies `notification_events`, и гасит runtime после
  проверки.
- Добавлен `npm run qa:lead-readiness`, который перед preview/production
  проверяет формы, hidden attribution fields, partner-program, sitemap, Lead
  Desk, API endpoints, migrations и документацию; при
  `LEAD_AUDIT_REQUIRE_ENV=1` missing production env становятся ошибкой.
- Добавлен `npm run qa:lead-env`: отдельный production preflight без вывода
  секретов. Он проверяет `LEAD_REPORT_TOKEN`, канал уведомлений, быстрые
  контакты, аналитический адаптер и согласованность Turnstile-ключей; выводит
  readiness map с filled variable names, ready/missing статусами и без значений.
- Добавлен `npm run qa:lead-d1`: no-secret remote D1 migration/schema audit,
  который проверяет локальные lead migrations, отсутствие pending remote
  migrations, таблицы lead lifecycle/notifications и ключевые колонки.
- Добавлен `npm run qa:lead-production-status`: единый no-secret go/no-go
  статус для задачи "Готовность к лидогенерации". Он агрегирует локальный
  production env, Cloudflare Pages config, remote D1 migration/schema audit и
  launch-gate dry-run в один blocker/next-action report.
- Добавлен `npm run lead-env:checklist`: no-secret markdown checklist из
  aggregate status report, чтобы заполнение production inputs, Cloudflare sync,
  live gate и финальная партнерская программа были в одной handoff-памятке.
- Добавлен `npm run qa:lead-analytics`: отдельная проверка first-party event
  layer, conversion context, thank-you tracking, form attribution fields,
  partner-program attribution и vendor forwarding hooks до подключения
  финального аналитического кабинета.
- Lifecycle-проверка локально пройдена на Pages runtime: заявки сохраняются,
  один лид переводится в `contacted`, отчет возвращает status/action queue,
  доступ без токена получает `401`.
- Smoke-заявки скрываются из обычного `/api/lead-report`; для QA-режима
  используется `include_test=1`.
- Smoke-проверка теперь подтверждает не только status/action queue, но и
  offer breakdown, form variant breakdown, UTM breakdown, partner/ref breakdown,
  response SLA breakdown и conversion pipeline totals, а также
  partner-filtered CSV export.
- В layout уже есть внутренняя модель событий для CTA, form start, validation,
  submit attempt и thank-you view.
- Публичные lead-формы используют общий submit-state controller: pending copy,
  disabled submit buttons, duplicate submit protection, `aria-busy`, validation
  status и browser back/forward cache reset работают для каждого
  `form[data-conversion-form]`.
- Аналитический vendor-слой можно включить через build env:
  `PUBLIC_GTM_ID`, `PUBLIC_GA_ID`, `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_PLAUSIBLE_DOMAIN`.
- Быстрые контактные каналы подготовлены как build-time конфиг:
  `PUBLIC_CONTACT_EMAIL`, `PUBLIC_CONTACT_TELEGRAM_URL`,
  `PUBLIC_CONTACT_WHATSAPP_URL`. Без значений они не выводятся на сайт.
- Добавлен блок `What happens next` на `/start-project/` и LP-формах: срок
  первого ответа, маршрутизация заявки, понятный первый scope и human review.
- Добавлен блок `Example first-stage proof` на `/start-project/` и LP:
  case-style паттерны для приема лидов, контентной операции и data/commerce
  контроля без выдуманных клиентских цифр.

Основные разрывы:

- Мгновенные уведомления реализованы через webhook и Telegram, но production
  destinations еще нужно настроить и проверить.
- Не выбран и не подключен финальный аналитический стек.
- Основная форма слишком подробная для части холодного трафика.
- Недостаточно реальных кейсов с клиентскими результатами; при этом
  первый слой proof-паттернов и формат первого этапа уже добавлены.
- Быстрые каналы связи подготовлены в коде, но production-контакты еще не
  заданы.
- Обновленные Pages Functions с `/api/lead-status` нужно задеплоить и
  проверить на preview/production.
- Обновленные Pages Functions со `status_events` нужно задеплоить и проверить
  на preview/production после уже примененной remote migration `0007`.
- Updated Pages Functions that write `project_request_notification_events`
  still need to be deployed and verified on preview/production.
- Production-цепочку нужно регулярно проверять end-to-end.
- Production-переменные теперь можно проверить отдельной командой, но реальные
  значения уведомлений, быстрых контактов и аналитики все еще нужно задать в
  `.env.lead.production.local`, синхронизировать в Cloudflare Pages и пройти
  preflight на preview/production окружении. Локальный draft уже создан с
  сгенерированным `LEAD_REPORT_TOKEN`. Текущий preflight показывает, что
  заполнен только `LEAD_REPORT_TOKEN`; notification route, quick contact и
  analytics пока missing.

## Этапы реализации

### 1. Прием и маршрутизация лидов

Статус: in progress.

- Проверить все входы в форму: главная, LP, solution, system, industry,
  header/footer.
- Сохранять языковой контекст после отправки формы. Status: implemented in
  `functions/api/start-project.ts`.
- Передавать безопасный conversion-контекст на thank-you: `lead_id`, source,
  offer, landing page и UTM без PII. Status: implemented.
- Сохранять атрибуцию первого касания: `locale`, `referrer`, `lead_channel`,
  `partner_ref`. Status: implemented in forms, API, D1 migration and webhook
  payload.
- Присваивать заявке первичную операционную маршрутизацию: `lead_score`,
  `lead_priority`, `routing_bucket`, `next_action`. Status: implemented in API,
  D1 migration and webhook payload.
- Добавить минимальный lifecycle после приема: `status`, `lead_owner`,
  `lead_follow_up_note`, `lead_status_updated_at`. Status: implemented in
  migration `0006`, `/api/lead-status`, `/api/lead-report`, and smoke test;
  remote D1 migration applied, Pages deploy still pending.
- Добавить историю lifecycle-изменений: `previous_status`, новый status,
  owner, note, next action и timestamp по каждому update. Status: implemented
  in migration `0007`, `/api/lead-status`, `/api/lead-report`, `/lead-desk/`,
  and smoke test; remote D1 migration applied, Pages deploy still pending.
- Добавить мгновенное уведомление о новом лиде: email, Telegram, CRM webhook
  или другой рабочий канал. Status: webhook and Telegram delivery implemented;
  production destinations still need to be configured and verified; protected
  CSV export is implemented as a reliable fallback handoff path.
- Добавить уведомление о смене lifecycle-статуса лида. Status:
  `project_request.status_updated` webhook/Telegram delivery implemented in
  `/api/lead-status`; production destinations still need to be configured and
  verified.
- Добавить audit trail для доставки уведомлений. Status:
  `project_request_notification_events` implemented locally for webhook and
  Telegram attempts, exposed as `notification_events` in `/api/lead-report` and
  `/lead-desk/`; remote migration/deploy verification still pending.
- Internal `/lead-desk/` is implemented as a lightweight operations bridge
  before CRM connection; production still needs deploy verification with
  `LEAD_REPORT_TOKEN`.
- Optional Turnstile spam protection is implemented; production keys still
  need to be configured and verified.
- Не ломать D1 как основной источник хранения заявок.
- Ошибки уведомления не должны приводить к потере заявки.

Готово, когда:

- Реальная заявка сохраняется в D1.
- Заявка получает приоритет и маршрут обработки без ручной классификации.
- Команда получает уведомление без ручной проверки базы.
- Пользователь попадает на корректную thank-you страницу своего языка.

### 2. Аналитика и измерение конверсии

Статус: in progress.

- Выбрать финальный стек: GTM/GA4, Plausible или другой вариант.
- Подключить скрипт аналитики к production. Status: optional GTM, GA4 and
  Plausible adapters implemented; production variables still need to be set.
- Зафиксировать события: page view, CTA click, form start, validation error,
  submit attempt, successful submit/thank-you, lead source.
- Проверить, что события содержат page, offer, locale, lead channel,
  partner/ref-код, UTM, form type и CTA label.
- Подготовить простую отчетную модель по источникам и офферам.
  Status: protected `/api/lead-report` implemented; production
  `LEAD_REPORT_TOKEN` still needs to be set. Report now includes status,
  offer, UTM source/medium/campaign, partner/ref, first-response SLA breakdown,
  conversion pipeline totals, lifecycle `status_events`, report filters and
  priority action queue. Period filtering by `created_from` / `created_to` is
  available for campaign and partner review windows.
- Проверять first-party analytics layer до запуска трафика. Status:
  `npm run qa:lead-analytics` implemented; final production analytics vendor
  variables still need to be set.
- Подготовить выгрузку для ручной обработки/CRM import. Status: protected
  `/api/lead-export` implemented with filters by status, channel, priority,
  bucket, offer, partner_ref, and created date range; production
  `LEAD_REPORT_TOKEN` still needs to be set. CSV now includes response SLA
  fields for handoff review.
- Добавить простой внутренний UI для ручной обработки до CRM. Status:
  implemented at `/lead-desk/`; production deploy verification still pending.

Готово, когда:

- Можно понять, откуда пришел лид и какая страница/CTA его привела.
- Можно сравнивать LP, органику, рекламу и партнерский трафик.
- Можно получить защищенный JSON-отчет без ручного SQL-доступа к D1.

### 3. Быстрый вход для холодного лида

Статус: in progress.

- Добавить короткую версию формы или быстрый contact CTA рядом с полной
  формой. Status: quick form implemented on `/start-project/` and campaign
  LP pages as `lp:<slug>:quick`.
- Оставить подробную форму для квалифицированных заявок. Status: implemented,
  full brief remains on the same page for `/start-project/` and each LP.
- Упростить первые обязательные поля: имя, контакт, задача. Status:
  implemented for start-project and LP quick intake.
- Остальной контекст добирать после первого контакта.

Готово, когда:

- Холодный посетитель может оставить заявку за 20-30 секунд.
- Серьезный посетитель все еще может дать подробный бриф.

### 4. Доверие и доказательства

Статус: in progress.

- Добавить блоки с примерами систем, типовыми результатами и сценариями.
- Показать формат первого этапа: что клиент получает после старта.
- Добавить ориентиры по срокам, структуре работы и контрольным точкам.
- Показать, что происходит после отправки заявки: срок первого ответа,
  маршрутизация, первый scope и human review. Status: implemented on
  `/start-project/` and LP intake forms through `LeadAssurance`.
- Добавить case-style примеры первых доказуемых результатов без фальшивых
  метрик. Status: implemented through `LeadProofPatterns` on `/start-project/`
  and LP pages.
- Использовать сильные визуальные блоки без перегруза текста.

Готово, когда:

- Посетитель понимает не только "что делают", но и "почему можно доверять".
- Страницы не выглядят как обещание без доказательств.

### 5. Быстрые каналы связи

Статус: in progress.

- Добавить быстрые контакты: Telegram, WhatsApp, email или другой выбранный
  канал. Status: implemented as optional env-driven channels via
  `PUBLIC_CONTACT_EMAIL`, `PUBLIC_CONTACT_TELEGRAM_URL`, and
  `PUBLIC_CONTACT_WHATSAPP_URL`; production values still need to be set.
- Разместить их рядом с формой, в footer и в ключевых CTA-зонах.
- Разместить их рядом с формой, в footer и в ключевых CTA-зонах. Status:
  implemented on `/start-project/` quick intake, LP quick intake, partner
  intake, and footer when at least one contact variable is configured.
- Отдельно трекать клики по быстрым каналам. Status: implemented as
  `quick_contact_click`.

Готово, когда:

- Пользователь может выбрать форму или быстрый контакт.
- Быстрые контакты измеряются как отдельный тип конверсии.

### 6. Production QA лидогенерации

Статус: pending.

- Проверить Cloudflare Pages Function на production/preview.
- Проверить D1 migrations и схему `project_requests`. Status: remote
  migrations `0001`-`0009` applied; production smoke still pending.
- Проверить `project_request_status_events` на preview/production после deploy
  обновленных Pages Functions. Status: remote migration `0007` applied;
  production smoke still pending.
- Применить и проверить `project_request_notification_events` на
  preview/production. Status: migrations through `0009` applied locally and remotely;
  Pages deploy and production smoke still pending.
- Проверить `/api/lead-report` после настройки `LEAD_REPORT_TOKEN`.
- Проверить `/api/lead-export` после настройки `LEAD_REPORT_TOKEN`.
- Провести тестовые заявки на EN/RU/RO.
- Использовать `LEAD_SMOKE_BASE_URL=<preview-or-production-url> npm run
  qa:lead-flow` для повторяемой проверки формы, redirect и report API.
- Для preview/production handoff использовать `npm run qa:lead-flow:remote -- --base-url
  <preview-or-production-url>`: wrapper требует report token, запускает
  production env preflight и проверяет report/status/export, а не только POST.
- Перед preview/production smoke запускать `npm run qa:lead-flow:local`, чтобы
  локально проверить Pages runtime, D1 insert, report, status update, webhook
  delivery, notification event history и CSV export одной командой.
- Использовать `npm run qa:lead-readiness` как pre-launch audit после сборки.
  Для строгой проверки production-переменных запускать с
  `LEAD_AUDIT_REQUIRE_ENV=1`.
- Использовать `npm run qa:lead-env` после задания production-переменных,
  чтобы отдельно проверить Lead Desk/report token, уведомления, аналитику,
  быстрые контакты и Turnstile до запуска рекламного или партнерского трафика.
- `qa:lead-env` writes a no-secret blocker report to
  `artifacts/lead-production-env-summary.json` by default. The report includes
  readiness statuses, filled variable names, placeholder names,
  `next_required_inputs`, warnings, and failures, so production launch blockers
  can be handed off without exposing values.
- Использовать `npm run qa:lead-d1`, чтобы проверить remote D1 migrations и
  schema перед production smoke. Команда пишет
  `artifacts/lead-d1-migrations-summary.json` без секретных значений и теперь
  входит в lead launch gate.
- Использовать `npm run qa:lead-production-status -- --cloudflare-env-file .env
  --lead-env-file .env.lead.production.local` как главный go/no-go статус
  задачи "Готовность к лидогенерации". Команда пишет
  `artifacts/lead-production-status.json` без секретных значений и завершается
  ненулевым кодом, пока есть blockers.
- После него использовать `npm run lead-env:checklist`, чтобы записать
  `artifacts/lead-production-checklist.md`: missing production inputs,
  Cloudflare sync/apply, strict audit, live gate и partner-program last stage
  без секретных значений.
- Использовать `npm run qa:lead-analytics`, чтобы проверить event layer,
  thank-you conversion context, form attribution и partner-program attribution
  в собранных страницах до запуска рекламного или партнерского трафика.
- Использовать `npm run lead-env:prepare`, чтобы создать локальный ignored
  `.env.lead.production.local` с сильным `LEAD_REPORT_TOKEN` и явными местами
  для production уведомлений, быстрых контактов, аналитики и Turnstile. Status:
  draft created; audit currently fails only because real notification,
  contact, and analytics values are still blank.
- Использовать `npm run lead-env:sync -- --env-file .env --lead-env-file
  .env.lead.production.local`, чтобы после заполнения файла проверить и
  синхронизировать production lead env в Cloudflare Pages без вывода значений;
  после `--apply` команда сама сверяет имена и типы переменных в Pages project.
- `lead-env:sync` now writes `artifacts/lead-env-sync-summary.json` by default:
  planned variable names/types, current visible env names, hidden current secret
  names by name, mode, result, and post-apply check status without secret
  values.
- Использовать `npm run qa:lead-launch -- --cloudflare-env-file .env
  --lead-env-file .env.lead.production.local` как единый pre-apply gate:
  readiness/build, TypeScript, Astro, production env preflight, Cloudflare sync
  dry-run, Cloudflare Pages/D1 audit и локальный Pages smoke. После `--apply` и
  deploy запускать с `--phase live --base-url <preview-or-production-url>`,
  чтобы подтвердить strict Cloudflare env audit и remote report/status/export
  smoke.
- Launch gate now writes a no-secret handoff summary to
  `artifacts/lead-launch-gate-summary.json` by default, including phase,
  env file names, remote URL, step statuses, timings, and final result.
  Use `--summary-file <path>` for a named launch artifact or `--no-summary`
  to disable the file.
- Использовать `npm run qa:lead-cloudflare -- --env-file .env`, чтобы проверить
  реальный Cloudflare Pages project, production deploy, домены, D1 binding `DB`
  и имена lead env variables без вывода секретных значений.
- Cloudflare audit now writes a no-secret summary to
  `artifacts/lead-cloudflare-summary.json` by default. The report captures
  domains, latest deployment, D1 bindings, visible env names, and lead env
  readiness by name.
- Проверить redirect, сохранение UTM, уведомления и аналитику.
- Зафиксировать smoke-test чеклист перед запуском рекламы.

Готово, когда:

- Заявка проходит полный путь от клика до хранения, lifecycle-обновления,
  уведомления и аналитики.

### 7. Партнерская программа

Статус: pending.

Последний этап задачи. Это отдельный канал лидогенерации, который должен
работать после того, как базовая форма, уведомления и аналитика уже надежны.

- Описать оффер партнерской программы.
- Определить, кто партнер: агентства, разработчики, SEO-специалисты,
  консультанты, владельцы нишевых каналов.
- Добавить отдельную страницу или секцию для партнеров.
- Сделать отдельный intake/форму или параметр `offer=partner-program`.
- Добавить партнерские UTM/ref параметры. Status: base capture implemented via
  `partner_ref`, `partner`, `ref`, `affiliate`, `affiliate_id`; partner page is
  implemented at `/partner-program/`, `/ru/partner-program/`, and
  `/ro/partner-program/`.
- Подготовить правила атрибуции и фиксации источника.

Готово, когда:

- Партнерский лид можно отличить от прямого лида.
- Источник партнера сохраняется в заявке и аналитике.
- Партнерские лиды видны отдельным breakdown в отчете и могут быть выгружены
  отдельно по `partner_ref`.
- Partner performance виден в `/api/lead-report` и `/lead-desk/`, включая
  qualified+/won/lost и неизвестные partner/ref, которые нужно исправить.
- Есть понятный следующий шаг для потенциального партнера.
