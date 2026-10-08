(() => {
  "use strict";
  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.getElementById("mobile-menu");
  if (toggle && mobile) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      mobile.hidden = true;
    };
    toggle.addEventListener("click", () => {
      const shouldOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(shouldOpen));
      mobile.hidden = !shouldOpen;
    });
    mobile.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 890) closeMenu();
    });
  }

  const tabs = Array.from(document.querySelectorAll('[role="tab"].flow-tab'));
  const activateTab = (tab, shouldFocus = false) => {
    tabs.forEach((button) => {
      const active = button === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      if (panel) panel.hidden = !active;
    });
    if (shouldFocus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      activateTab(tabs[next], true);
    });
  });
})();
