// Imports
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
gsap.registerPlugin(ScrollTrigger) 

// Loading screen / Экран загрузки
var loadingScreen = document.querySelector(".loadingScreen");
window.addEventListener('load', function() {
    loadingScreen.style.display = 'none';
})
// End of Loading screen / Экран загрузки

// smooth scroll
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);
// end of smooth scroll