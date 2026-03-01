
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("nav");
  const right_section = document.getElementById("nav-right")
  const scrollPosition = window.scrollY;

  // Define the scroll threshold (e.g., 50 pixels)
  if (scrollPosition > 50) {
    // Add the 'scrolled' class if the user has scrolled past the threshold
    navbar.classList.add("scrolled");
  } else {
    // Remove the 'scrolled' class if the user scrolls back to the top
    navbar.classList.remove("scrolled");
  }
});
// *****************end ******************************


// ****************MOBILE MENU ***********************
(function () {
  // IDs/classes used in your HTML
  const MENU_ID = "mobileMenu";
  const MENU_BTN_ID = "menuBtn";

  // find elements
  const menu = document.getElementById(MENU_ID);
  const menuBtn = document.getElementById(MENU_BTN_ID);

  if (!menu || !menuBtn) {
    console.warn("Mobile menu or button not found. Make sure #mobileMenu and #menuBtn exist.");
    return;
  }

  // 1) Move menu element to document.body so it's outside stacked/pinned containers
  if (menu.parentElement !== document.body) {
    document.body.appendChild(menu);
  }

  // 2) create (or reuse) overlay for dimming and outside-click
  let overlay = document.querySelector(".body-menu-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "body-menu-overlay";
    document.body.appendChild(overlay);
  }

  // helper state
  let isOpen = false;

  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("visible");
    // lock body scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    isOpen = true;
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("visible");
    // restore scroll
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    isOpen = false;
  }

  // toggle on button click (stopPropagation so doc click doesn't close instantly)
  menuBtn.addEventListener("click", function (ev) {
    ev.stopPropagation();
    if (isOpen) closeMenu();
    else openMenu();
  }, { passive: true });

  // close when clicking overlay
  overlay.addEventListener("click", () => closeMenu(), { passive: true });

  // close when clicking outside the menu (anywhere in document)
  document.addEventListener("click", function (e) {
    if (!isOpen) return;
    if (menu.contains(e.target) || menuBtn.contains(e.target)) return;
    closeMenu();
  }, { passive: true });

  // close on Esc key
  document.addEventListener("keydown", function (e) {
    if (isOpen && e.key === "Escape") closeMenu();
  });

  // close when clicking any link inside menu
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => closeMenu());
  });

  // On SPA navigation or page updates you might re-attach menu to body again:
  // (Optional) observe DOM mutations if menu gets re-inserted somewhere else
})();

// hover effect for mobile
document.querySelectorAll(".socials-items").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});