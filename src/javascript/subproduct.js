document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav");

    const updateNavBlur = () => {
        if (window.scrollY > 10) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    };

    updateNavBlur();
    window.addEventListener("scroll", updateNavBlur);

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
    document.getElementById("back-link").href = `Product_details.html?id=${productId}`;

    // Check if slides exist
    if (!product.slides || product.slides.length === 0) {
        alert("Content is coming soon");
        window.location.href = `Product_details.html?id=${productId}`;
        return;
    }

    // =============================================
    //  2. BUILD SLIDES DYNAMICALLY
    // =============================================

    const wrapper = document.getElementById("swiper-wrapper");

    product.slides.forEach((slide, index) => {
        let mediaHTML = "";
        if (slide.type === "youtube") {
            // Convert Shorts URL to embed URL if needed, and enable the YouTube JS API for keyboard control
            let videoSrc = slide.src.replace('/shorts/', '/embed/');
            videoSrc = videoSrc.replace('?&', '?');
            try {
                const url = new URL(videoSrc);
                url.searchParams.set('rel', '0');
                url.searchParams.set('modestbranding', '1');
                url.searchParams.set('controls', '1');
                url.searchParams.set('enablejsapi', '1');
                url.searchParams.set('origin', window.location.origin);
                videoSrc = url.toString();
            } catch (error) {
                if (!videoSrc.includes('?')) {
                    videoSrc += '?rel=0&modestbranding=1&controls=1&enablejsapi=1';
                } else {
                    if (!videoSrc.includes('rel=')) videoSrc += '&rel=0';
                    if (!videoSrc.includes('modestbranding=')) videoSrc += '&modestbranding=1';
                    if (!videoSrc.includes('controls=')) videoSrc += '&controls=1';
                    if (!videoSrc.includes('enablejsapi=')) videoSrc += '&enablejsapi=1';
                }
            }
            mediaHTML = `
                <iframe
                    src="${videoSrc}"
                    title="${slide.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
                </iframe>`;
        } else {
            mediaHTML = `<video src="${slide.src}" controls></video>`;
        }

        // Only first slide gets the section heading
        const headingHTML = index === 0
            ? `<div class="heading-1"><h1>${product.sectionHeading}</h1></div>`
            : "";

        wrapper.innerHTML += `
            <div class="swiper-slide">
                ${headingHTML}
                <div class="video swiper-no-swiping">${mediaHTML}</div>
                <div class="video-descr">
                    <h1 class="video-title">${slide.title}</h1>
                    <hr>
                    <p>${slide.description}</p>
                </div>
            </div>`;
    });

    let swiper;

    // =============================================
    //  3. ALLOW IFRAME INTERACTIONS
    // =============================================

    // Disable swiper mousewheel when hovering over iframes to allow clicks
    document.querySelectorAll('.video iframe').forEach(iframe => {
        iframe.addEventListener('mouseenter', () => {
            if (swiper && swiper.mousewheel) swiper.mousewheel.disable();
        });
        iframe.addEventListener('mouseleave', () => {
            if (swiper && swiper.mousewheel) swiper.mousewheel.enable();
        });
    });

    // Prevent swiper from capturing wheel events on iframes
    document.addEventListener('wheel', (e) => {
        if (e.target.closest('.video iframe')) {
            e.stopPropagation();
        }
    }, true);

    // Prevent swiper from capturing touch events on iframes
    ['touchstart', 'touchmove', 'touchend'].forEach(eventType => {
        document.addEventListener(eventType, (e) => {
            if (e.target.closest('.video iframe')) {
                e.stopPropagation();
            }
        }, true);
    });

    // =============================================
    //  4. DETECT DEVICE
    // =============================================

    const isMobile = window.innerWidth <= 768;

    // =============================================
    //  4. SWIPER INITIALIZATION
    // =============================================

    swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        effect: isMobile ? "slide" : "fade",
        speed: isMobile ? 400 : 200,

        mousewheel: isMobile ? false : {
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
        preventClicks: false,
        preventClicksPropagation: false,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets",
        },
    });

    const getActiveVideoElement = () => {
        const activeSlide = document.querySelector('.swiper-slide-active');
        return activeSlide?.querySelector('video');
    };

    const getActiveIframeElement = () => {
        const activeSlide = document.querySelector('.swiper-slide-active');
        return activeSlide?.querySelector('iframe');
    };

    const iframePlayerStates = new WeakMap();

    const postYoutubeCommand = (iframe, command) => {
        if (!iframe?.contentWindow) return;
        let targetOrigin = '*';
        try {
            const url = new URL(iframe.src);
            targetOrigin = url.origin;
        } catch (error) {
        }
        iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: command,
            args: [],
        }), targetOrigin);
    };

    window.addEventListener('message', (event) => {
        if (!event.data) return;
        let data = event.data;
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (err) {
                return;
            }
        }
        if (data.event !== 'onStateChange') return;

        const iframe = Array.from(document.querySelectorAll('iframe')).find(frame => frame.contentWindow === event.source);
        if (!iframe) return;

        iframePlayerStates.set(iframe, data.info);
    });

    const toggleActiveMediaPlayback = () => {
        const activeVideo = getActiveVideoElement();
        if (activeVideo) {
            if (activeVideo.paused) {
                activeVideo.play();
            } else {
                activeVideo.pause();
            }
            return;
        }

        const activeIframe = getActiveIframeElement();
        if (activeIframe) {
            const state = iframePlayerStates.get(activeIframe);
            if (state === 1) {
                postYoutubeCommand(activeIframe, 'pauseVideo');
            } else {
                postYoutubeCommand(activeIframe, 'playVideo');
            }
        }
    };

    const isMediaControlKey = (event) => {
        const mediaCodes = ['Space', 'MediaPlayPause', 'MediaPlay', 'MediaPause', 'MediaStop'];
        return mediaCodes.includes(event.code) || mediaCodes.includes(event.key);
    };

    document.addEventListener('keydown', (event) => {
        const activeElement = document.activeElement;
        if (!isMediaControlKey(event)) return;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable)) return;

        event.preventDefault();
        toggleActiveMediaPlayback();
    });

    // =============================================
    //  5. HEADER LOGIC
    // =============================================

    const resetHeader = () => {
        const nav = document.getElementById("nav");
        const links = document.querySelectorAll(".list_item a");
        const menuImg = document.getElementById("menu-img");

        gsap.to(nav, { backgroundColor: "rgba(17, 17, 17, 0.3)", duration: 0.3, overwrite: "auto" });
        gsap.to(links, { color: "white", duration: 0.3 });
        if (menuImg) {
            menuImg.src = "src/assets/menu2.png";
        }
    };

    const setHeaderDark = () => {
        const nav = document.getElementById("nav");
        const links = document.querySelectorAll(".list_item a");
        const menuImg = document.getElementById("menu-img");

        gsap.to(nav, { backgroundColor: "#0a0a0a", duration: 0.3, overwrite: "auto" });
        gsap.to(links, { color: "black", duration: 0.3 });
        if (menuImg) {
            menuImg.src = "src/assets/menu2.png";
        }
    };

    // =============================================
    //  6. SCROLL TRAP (WHEEL + TOUCH)
    // =============================================

    let allowFooterScroll = false;
    let lastSlideIndex = 0;
    const page2 = document.querySelector(".page2");

    const updateScrollLock = () => {
        if (!isMobile) {
            // Let the wheel event handler manage desktop
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            return;
        }
        if (swiper.isEnd) {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        } else {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            // Ensure we stay at the top when locked
            window.scrollTo(0, 0);
        }
    };

    swiper.on("slideChangeTransitionEnd", () => {
        // Pause and reset all videos in non-active slides
        const allVideos = document.querySelectorAll('.swiper-slide video');
        allVideos.forEach(video => {
            const parentSlide = video.closest('.swiper-slide');
            if (!parentSlide?.classList.contains('swiper-slide-active')) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Pause all iframes in non-active slides
        const allIframes = document.querySelectorAll('.swiper-slide iframe');
        allIframes.forEach(iframe => {
            const parentSlide = iframe.closest('.swiper-slide');
            if (!parentSlide?.classList.contains('swiper-slide-active')) {
                postYoutubeCommand(iframe, 'pauseVideo');
            }
        });

        const currentIndex = swiper.activeIndex;
        const isMovingBackward = currentIndex < lastSlideIndex;
        lastSlideIndex = currentIndex;

        if (!swiper.isEnd) {
            allowFooterScroll = false;
            if (isMovingBackward && window.scrollY > 0) {
                gsap.to(window, { scrollTo: 0, duration: 0.3 });
            }
        }
        updateScrollLock();
    });

    swiper.on("reachEnd", () => {
        allowFooterScroll = false;
        lastSlideIndex = swiper.activeIndex;
    });

    window.addEventListener("wheel", (e) => {
        if (isMobile) return;
        const rect = page2.getBoundingClientRect();
        if (Math.abs(rect.top) < 15) {
            if (swiper.isEnd && e.deltaY > 0) {
                if (allowFooterScroll) return;
                allowFooterScroll = true;
                if (e.cancelable) e.preventDefault();
                return;
            }
            if (swiper.isBeginning && e.deltaY < 0) return;
            if (e.cancelable) e.preventDefault();
        }
    }, { passive: false });

    // Initial lock check
    updateScrollLock();

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

    // ScrollTrigger for top-arr removed. Managed by swiper instead.

    const updateTopArrow = () => {
        // Show arrow only when past the middle of the slides
        if (swiper.activeIndex > swiper.slides.length / 2) {
            gsap.to("#top-arr", { display: "flex", opacity: 1, duration: 0.3 });
        } else {
            gsap.to("#top-arr", { opacity: 0, display: "none", duration: 0.3 });
        }
    };

    swiper.on("slideChange", updateTopArrow);
    // Initialize state
    gsap.set("#top-arr", { opacity: 0, display: "none" });

    document.getElementById("top-arr").addEventListener("click", () => {
        gsap.to(window, {
            duration: 0.2,
            scrollTo: 0,
            ease: "expo.out",
            onComplete: () => {
                swiper.slideTo(0, 0);
                resetHeader();
            },
        });
    });
});