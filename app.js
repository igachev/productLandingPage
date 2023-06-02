import { currentPic } from "./services/galleryService.js";
import { expand,minimize } from "./services/faqService.js";

let pics = document.querySelectorAll('.pic');

const question = document.querySelector('.question')
const answer = document.querySelector('.answer')
const expandBtns = document.querySelectorAll('.expand-btn')
const minimizeBtns = document.querySelectorAll('.minimize-btn')
const navbar = document.querySelector('.nav');




//open clicked image
pics.forEach((pic) => {
    pic.addEventListener('click',currentPic);
})

//expand FAQ question
expandBtns.forEach((btn) => {
btn.addEventListener('click',expand)
})

//minimize FAQ question
minimizeBtns.forEach((btn) => {
    btn.addEventListener('click',minimize)
})

//add sticky navigation bar on scroll
window.addEventListener('scroll',addStickyNavbar)

function addStickyNavbar() {
    let sticky = navbar.getBoundingClientRect().bottom;
    let media = window.matchMedia("(max-width: 400px)")
    if(media) {
        sticky = document.querySelector('.first-img').getBoundingClientRect().bottom;
    }
    
    if(window.pageYOffset >= sticky) {
        navbar.classList.add('sticky')
    }
    else {
        navbar.classList.remove('sticky')
    }
}




