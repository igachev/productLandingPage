import { currentPic } from "./services/galleryService.js";

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
    console.log(sticky)
    if(window.pageYOffset >= sticky) {
        navbar.classList.add('sticky')
    }
    else {
        navbar.classList.remove('sticky')
    }
}




function expand(e) {
    e.preventDefault();
    //console.log(e.target.parentElement.parentElement.nextElementSibling)
    let answer = e.target.parentElement.parentElement.nextElementSibling
    let expandBtn = e.target.parentElement
    let minimizeBtn = e.target.parentElement.nextElementSibling
    let faqBox = e.target.parentElement.parentElement.parentElement

    faqBox.addEventListener('animationend',() => {
        faqBox.classList.remove('expand-faq-anime')
    })

    faqBox.classList.add('expand-faq-anime')
    answer.classList.add('show')
    expandBtn.classList.add('hide')
    minimizeBtn.classList.add('show')
   
}

//hide text content of each FAQ box
function minimize(e) {
    e.preventDefault();
    let answer = e.target.parentElement.parentElement.nextElementSibling
    let expandBtn = e.target.parentElement.previousElementSibling
    console.log(expandBtn)
    let minimizeBtn = e.target.parentElement
    let faqBox = e.target.parentElement.parentElement.parentElement
    
    faqBox.addEventListener('animationend',() => {
        faqBox.classList.remove('close-faq-anime')
    })

    faqBox.classList.add('close-faq-anime')
    expandBtn.classList.remove('hide')
        answer.classList.remove('show')
    minimizeBtn.classList.remove('show')
   
}