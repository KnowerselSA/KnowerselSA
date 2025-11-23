// slider 
var swiper = new Swiper('.mySwiper' ,{
    direction : "vertical" ,
    effect : "fade" ,
     pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
     
      mousewheel :true
});
// product page nav items 
gsap.to(".list_item a" , {
    color : "white" , 
  scrollTrigger :{
    trigger : ".page-container" ,
    // scroller: "body",
    toggleActions: "play none none reverse",
    // markers : true,
    start : "top 10%"
  }
  
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