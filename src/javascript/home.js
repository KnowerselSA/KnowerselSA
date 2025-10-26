// // INTRO TEXT ANIMATION
// setTimeout(() => {
//     const text = document.getElementById("bg-text");
//     text.classList.add("color-changed")

// },3000) ;

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

// scroll effect
// function isElementInViewport(el) {
//     const rect = el.getBoundingClientRect();
//     return (
//         rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.bottom >= 0
//     );
// }

// // Function to handle the scroll animation
// function handleScrollReveal() {
//     const revealElements = document.querySelectorAll('.scroll-reveal');

//     revealElements.forEach(el => {
//         if (isElementInViewport(el)) {
//             el.classList.add('visible');
//         } else {
//             // Optional: Remove the class if you want the element to re-animate 
//             // when scrolling back up and then down again.
//             // el.classList.remove('visible'); 
//         }
//     });
// }

// // Attach the function to scroll and load events
// window.addEventListener('scroll', handleScrollReveal);
// window.addEventListener('load', handleScrollReveal);

// // Run once on load to reveal elements already in view
// handleScrollReveal();