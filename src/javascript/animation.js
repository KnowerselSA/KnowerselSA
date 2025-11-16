// Initialize Lenis
const lenis = new Lenis({
    smooth : true ,
    duration : 1,
     wheelMultiplier: 2,
     smoothTouch: true,
  touchMultiplier: 2,
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


gsap.registerPlugin(ScrollTrigger);

//for intro text
gsap.from(".beyond", {
    scale : 5,
    y : -300,
  opacity: 0,
//   scale: 0.5,
  duration: 1,
  ease : 'power2.out',
  scrollTrigger: {
    trigger: ".background-text",
    scroller: "[data-container-scroll]" ,
    // markers: true,
    start: "top 50%",
    end: "top 0%",
    toggleActions: "play none none reverse",
  },
});
gsap.from(".horizon", {
    x : 300,
    scale :5,
  opacity: 0,
//   scale: 0.5,
  duration: 1,
  ease : 'power2.out',
  scrollTrigger: {
    trigger: ".background-text",
    scroller: "[data-container-scroll]" ,
    // markers: true,
    start: "top 50%",
    end: "top 0%",
    toggleActions: "play none none reverse",
  },
});

// PARA 1 animation
gsap.from(".para-1 p", {
  y: "50vw",
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
 smoothTouch: true,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".para-1",
   scroller: "[data-container-scroll]",
    // markers: true,
    start: "top 70%",
    end: "top 30%",
    toggleActions: "play none none reverse",
  },
});

// PARA 2 animation
gsap.from(".para-2 p", {
  y: "50px",
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  smoothTouch: true,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".para-2",
   scroller: "[data-container-scroll]",
    // markers: true,
    start: "top 70%",
    end: "top 30%",
    toggleActions: "play none none reverse",
  },
});

// redirect-para animation
gsap.from(".redirect-para span", {
  y: "50px",
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  smoothTouch: true,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".redirect-para",
    scroller: "[data-container-scroll]",
    // markers: true,
    start: "top 75%",
    end: "top 30%",
    toggleActions: "play none none reverse",
  },
});

// ****************CONTACT FORM ANIMATION***************************
gsap.from(".left-content", {
//   x: -500,
scale :0 ,
  opacity: 0,
  duration: 1.5,
  ease: "power2.out",
});
gsap.from(".divider" , {
    opacity:0,
    duration : 2
})
gsap.from(".contact-form", {
  scale :0,
  opacity: 0,
  duration: 1.5,
  ease: "power2.out",
  
});
// tl.from(".box2" , {
//     x : 100 ,
//     opacity : 0 ,
//     duration : 0.5 ,

// })
// tl.from(".box3" , {
//     x : 100 ,
//     opacity : 0 ,
//     duration : 0.5 ,

// })
// tl.from(".box4" , {
//     x : 100 ,
//     opacity : 0 ,
//     duration : 0.5 ,

// })
// tl.from(".box5" , {
//     x : 100 ,
//     opacity : 0 ,
//     duration : 0.5 ,

// })

const ele = document.querySelectorAll(".project");
console.log(ele)

// animation after clicking
ele.forEach((item) =>{
    item.addEventListener("click", () => {
        if(item == ele[0]) {
  gsap.to(".project .img1", {
    scale: 5,
    x:400,
    duration: 1
  });
  setTimeout(function (){
     window.location.href = "http://127.0.0.1:5501/KnowerselSA/contact.html";
  } , 1000)
 }else{
     gsap.to(".project .img2", {
        x :-500 ,
    scale: 5,
    duration: 1
  });
  setTimeout(function (){
     window.location.href = "http://127.0.0.1:5501/KnowerselSA/contact.html";
  } , 1000)

 }
});

})


// animation after loading
gsap.from(".project1 " , {
    
    x : -1250,
    duration : 1.5,
    ease : 'power2.out'
})
gsap.from(".project2" , {
    x : 1250,
    duration : 1.5,
    ease : 'power2.out'
})

