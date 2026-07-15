(() => {
  if (window.__alfaNativeSelectsSetup) return;
  window.__alfaNativeSelectsSetup = true;

  const enhancedSelects = new WeakMap();
  const selectsToSync = new Set();
  let selectCounter = 0;
  const selectSelector = "select:not([multiple]):not([size]):not([data-native-select]):not([data-ar-native-enhanced])";
  const layerHostSelector = ".sales-panel, .sales-filterbar, .sales-login-card";

  const optionLabel = (option) => {
    if (!option) return "";
    return (option.label || option.textContent || option.value || "").trim();
  };

  const getSelectedOption = (select) => select.options[select.selectedIndex] || select.options[0] || null;

  const updateButton = (select) => {
    const instance = enhancedSelects.get(select);
    if (!instance) return;
    const selectedOption = getSelectedOption(select);
    const label = optionLabel(selectedOption);
    instance.value.textContent = label || select.getAttribute("placeholder") || "";
    instance.wrapper.classList.toggle("is-disabled", select.disabled);
    instance.wrapper.classList.toggle("is-empty", !select.value);
    instance.button.disabled = select.disabled;
    instance.lastValue = select.value;
    instance.lastSelectedIndex = select.selectedIndex;
    instance.lastDisabled = select.disabled;
    instance.lastOptionsLength = select.options.length;
  };

  const closeSelect = (wrapper) => {
    if (!wrapper) return;
    const button = wrapper.querySelector(".ar-native-select__button");
    wrapper.classList.remove("is-open");
    wrapper.closest(layerHostSelector)?.classList.remove("has-open-native-select");
    button?.setAttribute("aria-expanded", "false");
  };

  const closeAllSelects = (exceptWrapper = null) => {
    document.querySelectorAll("[data-ar-native-select].is-open").forEach((wrapper) => {
      if (wrapper !== exceptWrapper) closeSelect(wrapper);
    });
  };

  const focusOption = (instance, direction = 0) => {
    const options = Array.from(instance.menu.querySelectorAll(".ar-native-select__option:not(:disabled)"));
    if (!options.length) return;
    const selected = instance.menu.querySelector(".ar-native-select__option.is-selected:not(:disabled)");
    const active = document.activeElement;
    const currentIndex = options.includes(active) ? options.indexOf(active) : options.indexOf(selected);
    const nextIndex = currentIndex < 0 ? 0 : Math.max(0, Math.min(options.length - 1, currentIndex + direction));
    options[nextIndex]?.focus();
  };

  const renderOptions = (select) => {
    const instance = enhancedSelects.get(select);
    if (!instance) return;
    instance.menu.textContent = "";
    instance.button.removeAttribute("aria-activedescendant");

    Array.from(select.options).forEach((option, index) => {
      const item = document.createElement("button");
      const selected = index === select.selectedIndex;
      item.type = "button";
      item.className = "ar-native-select__option";
      item.id = `${instance.menu.id}-option-${index}`;
      item.dataset.index = String(index);
      item.textContent = optionLabel(option);
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", selected ? "true" : "false");
      item.tabIndex = -1;

      if (selected) {
        item.classList.add("is-selected");
        instance.button.setAttribute("aria-activedescendant", item.id);
      }

      if (option.disabled) {
        item.disabled = true;
        item.setAttribute("aria-disabled", "true");
      }

      item.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (option.disabled) return;
        select.selectedIndex = index;
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
        renderOptions(select);
        closeSelect(instance.wrapper);
        instance.button.focus();
      });

      item.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          focusOption(instance, 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          focusOption(instance, -1);
        } else if (event.key === "Home") {
          event.preventDefault();
          const firstOption = instance.menu.querySelector(".ar-native-select__option:not(:disabled)");
          firstOption?.focus();
        } else if (event.key === "End") {
          event.preventDefault();
          const options = instance.menu.querySelectorAll(".ar-native-select__option:not(:disabled)");
          options[options.length - 1]?.focus();
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          item.click();
        } else if (event.key === "Escape") {
          event.preventDefault();
          closeSelect(instance.wrapper);
          instance.button.focus();
        }
      });

      instance.menu.appendChild(item);
    });

    updateButton(select);
  };

  const openSelect = (select, focusSelected = false) => {
    const instance = enhancedSelects.get(select);
    if (!instance || select.disabled) return;
    renderOptions(select);
    closeAllSelects(instance.wrapper);
    instance.wrapper.classList.add("is-open");
    instance.wrapper.closest(layerHostSelector)?.classList.add("has-open-native-select");
    instance.button.setAttribute("aria-expanded", "true");
    if (focusSelected) {
      requestAnimationFrame(() => focusOption(instance));
    }
  };

  const syncSelect = (select) => {
    const instance = enhancedSelects.get(select);
    if (!instance) return;
    if (!select.isConnected) {
      selectsToSync.delete(select);
      return;
    }
    if (
      instance.lastValue !== select.value ||
      instance.lastSelectedIndex !== select.selectedIndex ||
      instance.lastDisabled !== select.disabled ||
      instance.lastOptionsLength !== select.options.length
    ) {
      renderOptions(select);
    }
  };

  const enhanceSelect = (select) => {
    if (!(select instanceof HTMLSelectElement) || !select.matches(selectSelector)) return;

    const wrapper = document.createElement("div");
    const button = document.createElement("button");
    const value = document.createElement("span");
    const menu = document.createElement("div");
    const labelText = Array.from(select.labels || [])
      .map((label) => label.textContent.trim())
      .filter(Boolean)
      .join(" ");
    const selectId = select.id || `ar-native-select-${++selectCounter}`;

    if (!select.id) select.id = selectId;
    select.dataset.arNativeEnhanced = "true";
    select.classList.add("ar-native-select__native");
    select.tabIndex = -1;
    select.setAttribute("aria-hidden", "true");

    wrapper.className = "ar-native-select";
    wrapper.dataset.arNativeSelect = "";

    value.className = "ar-native-select__value";

    button.type = "button";
    button.className = "ar-native-select__button";
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", `${selectId}-menu`);
    button.setAttribute("aria-label", select.getAttribute("aria-label") || labelText || select.name || "Select option");
    button.appendChild(value);

    menu.className = "ar-native-select__menu";
    menu.id = `${selectId}-menu`;
    menu.setAttribute("role", "listbox");
    menu.setAttribute("tabindex", "-1");

    wrapper.append(button, menu);
    select.insertAdjacentElement("afterend", wrapper);

    enhancedSelects.set(select, { wrapper, button, value, menu });
    selectsToSync.add(select);

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (wrapper.classList.contains("is-open")) {
        closeSelect(wrapper);
      } else {
        openSelect(select, false);
      }
      button.focus();
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSelect(select, true);
      } else if (event.key === "Escape") {
        closeSelect(wrapper);
      }
    });

    select.addEventListener("change", () => renderOptions(select));
    select.addEventListener("focus", () => button.focus());
    select.addEventListener("invalid", () => {
      wrapper.classList.add("is-invalid");
      button.focus();
    });
    select.addEventListener("input", () => {
      wrapper.classList.remove("is-invalid");
      updateButton(select);
    });

    if ("MutationObserver" in window) {
      const observer = new MutationObserver(() => renderOptions(select));
      observer.observe(select, {
        attributes: true,
        attributeFilter: ["disabled", "label", "selected", "value"],
        childList: true,
        subtree: true
      });
    }

    renderOptions(select);
  };

  const enhanceSelects = (root = document) => {
    if (root instanceof HTMLSelectElement) {
      enhanceSelect(root);
      return;
    }
    if (!(root instanceof Element || root instanceof Document || root instanceof DocumentFragment)) return;
    root.querySelectorAll(selectSelector).forEach(enhanceSelect);
  };

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element) || !event.target.closest("[data-ar-native-select]")) {
      closeAllSelects();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAllSelects();
  });

  enhanceSelects();

  window.setInterval(() => {
    selectsToSync.forEach(syncSelect);
  }, 350);

  if ("MutationObserver" in window) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => enhanceSelects(node));
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
