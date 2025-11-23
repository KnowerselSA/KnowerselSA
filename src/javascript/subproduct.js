// slider
var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  effect: "fade",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  mousewheel: true,
});
// product page nav items
gsap.to(".list_item a", {
  color: "white",
  scrollTrigger: {
    trigger: ".page-container",
    // scroller: "body",
    toggleActions: "play none none reverse",
    // markers : true,
    start: "top 10%",
  },
});

// changing the menu img when it reach the slider
gsap.to("menu-img", {
  scrollTrigger: {
    trigger: ".swiper-wrapper",
    // markers : true,
    start: "top 14%",
    onEnter: () => {
      document.getElementById("menu-img").src = "src/assets/menu2.png";
    },
    onLeaveBack: () => {
      document.getElementById("menu-img").src = "src/assets/menu.png";
    },
  },
});
// const lenis = new Lenis({
//   smooth: true,
//   lerp: 0.05,   // default ~0.1
//    wheelMultiplier: 0.5,
// });

// gsap.registerPlugin(ScrollTrigger);

// gsap.to('.page2' , {
//     y : "-50vh",
//     // duration : 2 ,
//     opacity : 1 ,
//     scrollTrigger:{
//         trigger : ".page1   " ,
//         scroller : "body" ,
//         markers : true ,
//         start : "bottom 70%" ,
//         end : "bottom 30%" ,
//         scrub : true,
//         pin : true ,
//         pinSpacing: false
//     }
// })

// return to top 
gsap.from("#top-arr", {
      opacity : 0,
      ease :"power2.out",
  scrollTrigger: {
    trigger: ".swiper-wrapper",
    // markers : true,
    start: "top 50%",
    // markers : true,

    onEnter: () => {
      document.getElementById("top-arr").style.display = "flex";
    },
    onLeaveBack: () => {
      document.getElementById("top-arr").style.display = "none";
    },
  
  },
});

document.getElementById("top-arr").addEventListener("click" ,  ()=>{
  gsap.to(window , {
    duration : 0.5 ,
    scrollTo : 0,
    ease : "power2.out"
  })
})
// header-color-changed
gsap.to("nav" , {
  scrollTrigger : {
    trigger : ".swiper-wrapper",
    // markers : true,
    start : "top 14%", 
    onEnter : ()=>{
      document.getElementById("nav").style.backgroundColor = "black"
    },
    onLeaveBack: ()=>{
      document.getElementById("nav").style.background ="rgba(17, 17, 17, 0.3)"
    }
  }
})