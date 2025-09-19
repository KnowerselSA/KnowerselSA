// INTRO TEXT ANIMATION
setTimeout(() => {
    const text = document.getElementById("bg-text");
    text.classList.add("color-changed")

},3000) ;

// animation for navabr after scrolling
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
})
// *****************end ******************************
