document.addEventListener("DOMContentLoaded", () => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    effect: "fade",
    speed: 200, // Slightly slower for a more premium feel
    mousewheel: {
      // CRITICAL CHANGE: releaseOnEdges MUST be false to trap the user
      releaseOnEdges: true,
      sensitivity: 1,
      thresholdDelta: 20,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  window.addEventListener(
    "wheel",
    function (e) {
      const page2 = document.querySelector(".page2");
      const rect = page2.getBoundingClientRect();

      // Tolerance: Is the slider occupying the screen?
      const isCentered = Math.abs(rect.top) < 15;

      if (isCentered) {
        const scrollingUp = e.deltaY < 0;
        const scrollingDown = e.deltaY > 0;

        // 1. EXIT DOWN: Only if on LAST slide and user scrolls DOWN
        if (swiper.isEnd && scrollingDown) {
          return; // Release to browser (scrolls to footer)
        }

        // 2. EXIT UP: Only if on FIRST slide and user scrolls UP
        else if (swiper.isBeginning && scrollingUp) {
          return; // Release to browser (scrolls to header)
        }

        // 3. THE TRAP: For all other cases, block page scroll.
        // When coming UP from footer, swiper.isBeginning is FALSE.
        // This code hits the 'else' and prevents the page from moving up,
        // forcing the Swiper to handle the wheel and change slides instead.
        else {
          if (e.cancelable) e.preventDefault();
        }
      }
    },
    { passive: false }
  );

  // --- YOUR HEADER & NAV LOGIC (UNCHANGED) ---
  const resetHeader = () => {
    const nav = document.getElementById("nav");
    const links = document.querySelectorAll(".list_item a");
    const backImg = document.querySelector(".list_item a img");
    const menuImg = document.getElementById("menu-img");

    // 1. Header Background to Grey/Transparent [cite: 10, 33]
    gsap.to(nav, {
        backgroundColor: "rgba(17, 17, 17, 0.3)",
        duration: 0.3,
        overwrite: "auto",
    });

    // 2. Link colors to Black [cite: 5]
    gsap.to(links, { color: "black", duration: 0.3 });

    // 3. Back PNG to Original (Black)
    if (backImg) {
        gsap.to(backImg, {
            filter: "brightness(0) invert(0)", 
            duration: 0.3
        });
    }

    // 4. Menu PNG to Original (Black/Default)
    if (menuImg) {
        // Assuming your light-mode menu icon is menu.png
        menuImg.src = "src/assets/menu.png"; 
        gsap.to(menuImg, {
            filter: "brightness(0) invert(0)",
            duration: 0.3
        });
    }
};

const setHeaderDark = () => {
    const nav = document.getElementById("nav");
    const links = document.querySelectorAll(".list_item a");
    const backImg = document.querySelector(".list_item a img");
    const menuImg = document.getElementById("menu-img");

    // 1. Header Background to Solid Black [cite: 23, 34]
    gsap.to(nav, {
        backgroundColor: "black",
        duration: 0.3,
        overwrite: "auto",
    });

    // 2. Link colors to White [cite: 10, 25]
    gsap.to(links, { color: "white", duration: 0.3 });

    // 3. Back PNG to White
    if (backImg) {
        gsap.to(backImg, {
            filter: "brightness(0) invert(1)", 
            duration: 0.3
        });
    }

    // 4. Menu PNG to White
    if (menuImg) {
        // Assuming your dark-mode menu icon is menu2.png
        menuImg.src = "src/assets/menu2.png"; 
        gsap.to(menuImg, {
            filter: "brightness(0) invert(1)",
            duration: 0.3
        });
    }
};

const reset2Header = () => {
    const nav = document.getElementById("nav");
    const links = document.querySelectorAll(".list_item a");
    const backImg = document.querySelector(".list_item a img");
    const menuImg = document.getElementById("menu-img");

    // 1. Header Background to Grey/Transparent [cite: 10, 33]
    gsap.to(nav, {
        backgroundColor: "transparent",
        duration: 0.3,
        overwrite: "auto",
    });

    // 2. Link colors to Black [cite: 5]
    gsap.to(links, { color: "black", duration: 0.3 });

    // 3. Back PNG to Original (Black)
    if (backImg) {
        gsap.to(backImg, {
            filter: "brightness(0) invert(0)", 
            duration: 0.3
        });
    }

    // 4. Menu PNG to Original (Black/Default)
    if (menuImg) {
        // Assuming your light-mode menu icon is menu.png
        menuImg.src = "src/assets/menu.png"; 
        gsap.to(menuImg, {
            filter: "brightness(0) invert(0)",
            duration: 0.3
        });
    }
};


  ScrollTrigger.create({
    trigger: ".page2",
    // markers : true,
    start: "top 50%",
    end: "bottom 50%",
    onEnter: setHeaderDark,
    onLeave: resetHeader,
    onEnterBack: setHeaderDark,
    onLeaveBack: reset2Header,
  });

//   return to top arrow
  ScrollTrigger.create({
    trigger: ".page2", // Show when reaching the slider
    start: "top 50%",
    onEnter: () => gsap.to("#top-arr", { display: "flex", opacity: 1, duration: 0.3 }),
    onLeaveBack: () => gsap.to("#top-arr", { opacity: 0, display: "none", duration: 0.3 }),
});
document.getElementById("top-arr").addEventListener("click", () => {
    // Ensure the element is flex/block before scrolling
    gsap.set("#top-arr", { display: "flex" }); 

    gsap.to(window, {
      duration: 0.2,
      scrollTo: 0,
      ease: "expo.out",
      onComplete: () => {
        swiper.slideTo(0, 0);
        resetHeader();
        // Optionally hide it again once you are at the very top
        gsap.to("#top-arr", { opacity: 0, display: "none", duration: 0.3 });
      },
    });
});

});

// for mobile 
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Setup for Mobile Viewports
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 2. Swiper Initialization (Optimized for Mobile Touch)
    const swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        effect: "slide", // 'slide' is often smoother than 'fade' on mobile processors
        speed: 400,
        mousewheel: false, // Disable mousewheel for mobile
        touchReleaseOnEdges: true, // Allows native scroll when at boundaries
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // 3. Touch Handling Variables
    let touchStartY = 0;
    let touchMoveY = 0;

    // 4. THE MOBILE SCROLL TRAP
    const page2 = document.querySelector(".page2");

    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener("touchmove", (e) => {
        touchMoveY = e.touches[0].clientY;
        const rect = page2.getBoundingClientRect();
        
        // Is Page 2 currently the primary view?
        const isCentered = Math.abs(rect.top) < 50; 

        if (isCentered) {
            const deltaY = touchStartY - touchMoveY;
            const scrollingDown = deltaY > 5;
            const scrollingUp = deltaY < -5;

            // EXIT DOWN: On last slide, swiping UP (to scroll down)
            if (swiper.isEnd && scrollingDown) {
                return; // Let native scroll happen
            }
            // EXIT UP: On first slide, swiping DOWN (to scroll up)
            else if (swiper.isBeginning && scrollingUp) {
                return; // Let native scroll happen
            }
            // TRAP: In middle slides, prevent native scroll so Swiper takes over
            else {
                if (e.cancelable) e.preventDefault();
            }
        }
    }, { passive: false });

    // --- MOBILE HEADER LOGIC ---
    const setHeaderDark = () => {
        const nav = document.getElementById("nav");
        const links = document.querySelectorAll(".list_item a");
        const menuImg = document.getElementById("menu-img");

        gsap.to(nav, { backgroundColor: "black", duration: 0.3 });
        gsap.to(links, { color: "white", duration: 0.3 });
        if (menuImg) {
            menuImg.src = "src/assets/menu2.png";
            gsap.to(menuImg, { filter: "brightness(0) invert(1)", duration: 0.3 });
        }
    };

    const resetHeaderMobile = () => {
        const nav = document.getElementById("nav");
        const links = document.querySelectorAll(".list_item a");
        const menuImg = document.getElementById("menu-img");

        gsap.to(nav, { backgroundColor: "rgba(17, 17, 17, 0.3)", duration: 0.3 });
        gsap.to(links, { color: "black", duration: 0.3 });
        if (menuImg) {
            menuImg.src = "src/assets/menu.png";
            gsap.to(menuImg, { filter: "brightness(0) invert(0)", duration: 0.3 });
        }
    };

    ScrollTrigger.create({
        trigger: ".page2",
        start: "top 20%",
        end: "bottom 80%",
        onEnter: setHeaderDark,
        onLeave: resetHeaderMobile,
        onEnterBack: setHeaderDark,
        onLeaveBack: resetHeaderMobile,
    });
});