// INTRO TEXT ANIMATION
setTimeout(() => {
    const text = document.getElementById("bg-text");
    text.classList.add("color-changed")

},3000) ;

// loading content after clicking the arrow on home page
const arrow = document.querySelector(".img-arrow");

function loadHTMLonce() {
  const html = `<section class="home-para">
        <div class="home-para-container">
            <div class="para-1">
                <p>
                    We are crafting Intelligent Robotic Products,
                    enhancing human-robot coworking.
                </p>
            </div>
            <div class="para-2">
                <p>Making Intelligence Meet The Physical World.
                </p>
            </div>
            <div class="redirect-para">

                <h1>Check out
                    <a href="#">
                        <p>What We're Working On</p>
                        <img src="assets/rightarrow.png" alt="redirect-arrow">
                    </a>
                </h1>
            </div>
        </div>
    </section>
    <footer>
        <div class="footer-container">
            <div class="logo">
                <img src="" alt="logo-img">
            </div>
            <div class="menu">
                <ul>
                    <li class="menu-item"><a href="">Home</a></li>
                    <li class="menu-item"><a href="#">Product</a></li>
                    <li class="menu-item"><a href="#">About us</a></li>
                    <li class="menu-item"><a href="#">Get in Touch</a></li>
                </ul>
            </div>
            <div class="socials">
                <ul>
                    <li class="socials-items"><a href="#"><img src="assets/social-icons/linkedin.png"
                                alt="Linkedin"></a></li>
                    <li class="socials-items"><a href="#"><img src="assets/social-icons/youtube.png" alt="youtube"></a>
                    </li>
                    <li class="socials-items"><a href="#"><img src="assets/social-icons/twitter.png" alt="Twitter"></a>
                    </li>
                    <li class="socials-items"><a href="#"><img src="assets/social-icons/insta.png" alt="Instagram"></a>
                    </li>
                    <li class="socials-items"><a href="#"><img src="assets/social-icons/facebook.png"
                                alt="Facebook"></a></li>
                </ul>
            </div>
            <div class="copyright">
                &copy;2025 LOGO. All Rights Reserved.
            </div>
        </div>
    </footer> `;
    console.log("loading html")
    const load_after = document.getElementById("loaded-content");
    load_after.innerHTML += html;
    window.scrollBy({
        top: 800, // Gets the full height of the page
        behavior: "smooth",
    });
    arrow.removeEventListener("click", loadHTMLonce);
}
arrow.addEventListener("click", loadHTMLonce);
//***************** */ end of arrow *******************

// animation for navabr after scrolling
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("nav");
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
