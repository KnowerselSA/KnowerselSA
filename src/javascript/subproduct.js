document.addEventListener("DOMContentLoaded", () => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
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
        }
    });

    window.addEventListener('wheel', function(e) {
        const page2 = document.querySelector('.page2');
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
    }, { passive: false });

    // --- YOUR HEADER & NAV LOGIC (UNCHANGED) ---
    const resetHeader = () => {
        const nav = document.getElementById("nav");
        const links = document.querySelectorAll(".list_item a");
        gsap.to(nav, { backgroundColor: "rgba(17, 17, 17, 0.3)", duration: 0.3, overwrite: "auto" });
        gsap.to(links, { color: "black", duration: 0.3 });
    };

    const setHeaderDark = () => {
        const nav = document.getElementById("nav");
        const links = document.querySelectorAll(".list_item a");
        gsap.to(nav, { backgroundColor: "black", duration: 0.3, overwrite: "auto" });
        gsap.to(links, { color: "white", duration: 0.3 });
    };
      const reset2Header = () => {
        const nav = document.getElementById("nav");
        const links = document.querySelectorAll(".list_item a");
        gsap.to(nav, { backgroundColor: "transparent", duration: 0.3, overwrite: "auto" });
        gsap.to(links, { color: "black", duration: 0.3 });
    };

    ScrollTrigger.create({
        trigger: ".page2",
        // markers : true,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: setHeaderDark,
        onLeave: resetHeader,
        onEnterBack: setHeaderDark,
        onLeaveBack: reset2Header
    });

    document.getElementById("top-arr").addEventListener("click", () => {
        gsap.to(window, { 
            duration: 0.8, 
            scrollTo: 0, 
            onComplete: () => {
                swiper.slideTo(0, 0);
                resetHeader();
            }
        });
    });
});