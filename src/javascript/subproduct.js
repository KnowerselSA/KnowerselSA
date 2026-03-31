document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nav").classList.add("scrolled");
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // =============================================
  //  1. LOAD PRODUCT FROM URL
  //  URL format: content.html?id=product_1
  // =============================================

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = PRODUCTS[productId];

  if (!product) {
    console.warn(`No product found for id: "${productId}". Redirecting...`);
    window.location.href = "product.html";
    return;
  }

  // Set page title
  document.title = product.pageTitle;

  // Back arrow → returns to Product_details.html with same id
  document.getElementById("back-link").href =
    `Product_details.html?id=${productId}`;

  // =============================================
  //  2. BUILD SLIDES DYNAMICALLY
  // =============================================

  const wrapper = document.getElementById("swiper-wrapper");

  product.slides.forEach((slide, index) => {
    let mediaHTML = "";
    if (slide.type === "youtube") {
      mediaHTML = `
                <iframe
                    tabindex="0"
                    src="${slide.src}${slide.src.includes('?') ? '&' : '?'}enablejsapi=1"
                    title="${slide.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>`;
    } else {
      mediaHTML = `<video tabindex="0" src="${slide.src}" controls></video>`;
    }

    // Only first slide gets the section heading
    const headingHTML =
      index === 0
        ? `<div class="heading-1"><h1 class="research-heading">${product.sectionHeading}</h1></div>`
        : "";
    wrapper.innerHTML += `
            <div class="swiper-slide">
                ${headingHTML}
                <div class="video">${mediaHTML}</div>
                <div class="video-descr">
                    <h1 class="video-title">${slide.title}</h1>
                    <hr>
                    <p>${slide.description}</p>
                </div>
            </div>`;
  });

  // =============================================
  //  3. DETECT DEVICE
  // =============================================

  const isMobile = window.innerWidth <= 768;

  // =============================================
  //  4. SWIPER INITIALIZATION
  // =============================================

  const swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    effect: isMobile ? "slide" : "fade",
    speed: isMobile ? 400 : 200,

    mousewheel: isMobile
      ? false
      : {
          releaseOnEdges: true,
          sensitivity: 1,
          thresholdDelta: 20,
          enabled: true,
        },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    touchReleaseOnEdges: true,
    simulateTouch: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
    },

    on: {
      slideChange: function () {
        // Pause all native HTML5 local videos
        document.querySelectorAll('.mySwiper .swiper-slide video').forEach((vid) => {
          if (!vid.paused) {
            vid.pause();
          }
        });
        
        // Stop any playing iframe globally by forcing a soft buffer reload.
        // This securely stops YouTube videos AND local .mp4 files accidentally mounted manually inside iframes!
        document.querySelectorAll('.mySwiper .swiper-slide iframe').forEach((iframe) => {
          let currentFrame = iframe.src;
          iframe.src = currentFrame; 
        });
      }
    }
  });

  ScrollTrigger.refresh();

  // =============================================
  //  5. HEADER LOGIC
  // =============================================

  const resetHeader = () => {
    const nav = document.getElementById("nav");
    const links = document.querySelectorAll(".list_item a");
    const menuImg = document.getElementById("menu-img");

    gsap.to(nav, {
      backgroundColor: "rgba(17, 17, 17, 0.76)",
      duration: 0.3,
      overwrite: "auto",
    });
    gsap.to(links, { color: "white", duration: 0.3 });
    if (menuImg) {
      menuImg.src = "src/assets/menu.png";
      gsap.to(menuImg, { filter: "brightness(0) invert(0)", duration: 0.3 });
    }
  };

  const setHeaderDark = () => {
    const nav = document.getElementById("nav");
    const links = document.querySelectorAll(".list_item a");
    const menuImg = document.getElementById("menu-img");

    gsap.to(nav, {
      backgroundColor: "white",
      duration: 0.3,
      overwrite: "auto",
    });
    gsap.to(links, { color: "black", duration: 0.3 });
    if (menuImg) {
      menuImg.src = "src/assets/menu2.png";
      gsap.to(menuImg, { filter: "brightness(0) invert(1)", duration: 0.3 });
    }
  };

  // =============================================
  //  6. SCROLL TRAP (WHEEL + TOUCH)
  // =============================================

  const page2 = document.querySelector(".page2");
  const footer = document.querySelector("footer");
  let touchStartY = 0;

  // Track when Swiper section is in view
  const page2Observer = new IntersectionObserver(
    (entries) => {
      // intentionally empty — we use footer observer for header logic
    },
    { threshold: 0.6 },
  );
  page2Observer.observe(page2);

  // Footer observer — resets navbar when footer is visible
  const footerObserver = new IntersectionObserver(
    (entries) => {
      console.log("footer intersecting:", entries[0].isIntersecting);
      if (entries[0].isIntersecting) {
        resetHeader();
      } else {
        // Footer left view — check if page2 is still visible
        const rect = page2.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setHeaderDark();
        }
      }
    },
    { threshold: 0, rootMargin: "0px" },
  );

  footerObserver.observe(footer);

  window.addEventListener(
    "wheel",
    (e) => {
      if (isMobile) return;
      const rect = page2.getBoundingClientRect();
      if (Math.abs(rect.top) < 15) {
        if (swiper.isEnd && e.deltaY > 0) return; // allow scroll to footer
        if (e.cancelable) e.preventDefault();
      }
    },
    { passive: false },
  );

  window.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true },
  );

  window.addEventListener(
    "touchmove",
    (e) => {
      if (!isMobile) return;
      const touchMoveY = e.touches[0].clientY;
      const rect = page2.getBoundingClientRect();
      if (Math.abs(rect.top) < 50) {
        const deltaY = touchStartY - touchMoveY;
        if (swiper.isEnd && deltaY > 5) return; // allow scroll to footer
        if (e.cancelable) e.preventDefault();
      }
    },
    { passive: false },
  );

  // =============================================
  //  7. SCROLL TRIGGERS
  // =============================================

  ScrollTrigger.create({
    trigger: ".page2",
    start: "top 50%",
    end: "bottom 50%",
    onEnter: setHeaderDark,
    onLeave: resetHeader,
    onEnterBack: setHeaderDark,
    onLeaveBack: resetHeader,
  });

  ScrollTrigger.create({
    trigger: ".page2",
    start: "top 50%",
    onEnter: () =>
      gsap.to("#top-arr", { display: "flex", opacity: 1, duration: 0.3 }),
    onLeaveBack: () =>
      gsap.to("#top-arr", { opacity: 0, display: "none", duration: 0.3 }),
  });

  // Arrow button → scroll to page2 and go to last slide
  document.getElementById("top-arr").addEventListener("click", () => {
    page2.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      swiper.slideTo(swiper.slides.length - 1, 400);
    }, 500);
  });
});
