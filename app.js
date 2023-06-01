let pics = document.querySelectorAll('.pic');
let contentBox = document.querySelector('.content-box')
let modalBox = document.querySelector('.modal-box')
let closeBtn = document.querySelector('.close-icon');
const question = document.querySelector('.question')
const answer = document.querySelector('.answer')
const expandBtns = document.querySelectorAll('.expand-btn')
const minimizeBtns = document.querySelectorAll('.minimize-btn')
const navbar = document.querySelector('.nav');


let newImg;
/*let images = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'
,'img/5.jpg','img/6.jpg','img/7.jpg']*/
let images = Array.from(pics)
console.log(images[0].href.split('/')[4]);
let index = 0;

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

function currentPic(e) {
e.preventDefault();
console.log(e.target.src.split('/')[4]);
let element = e.target.src.split('/')[4];

newImg = document.createElement('img')

for(let i = 0; i < images.length; i++) {

    if(images[i].href.split('/')[4] == element) {
        index = i;
        newImg.src = e.target.src
    }

}


modalBox.appendChild(newImg)

modalBox.addEventListener('animationend',() => 
modalBox.classList.remove('expand-faq-anime'))

modalBox.classList.add('expand-faq-anime')


//add modal to our page
contentBox.classList.add('open-modal')
//if close btn is clicked modal and image will be removed
document.querySelector('.close-icon').addEventListener('click',closeGallery)

document.querySelector('.right-arrow').addEventListener('click',nextImage)

document.querySelector('.left-arrow').addEventListener('click',previousImage)

document.querySelector('.img-number').innerText = `${index+1} / ${images.length}`
}

function closeGallery(e) { 
    e.preventDefault();
   
    
    modalBox.addEventListener('animationend',onAnimationEnd)

    modalBox.classList.add('close-anime')

    function onAnimationEnd() {
        contentBox.classList.remove('open-modal')
        
        modalBox.innerHTML = `
        <p class="img-number">0</p>
        <i class="close-icon fa-solid fa-xmark fa-4x"></i>
        <i class="right-arrow fa-solid fa-chevron-right fa-3x"></i>
        <i class="left-arrow fa-solid fa-chevron-left fa-3x"></i>
        <img class="put-img" src="" alt="">
        `;
        
        index = 0;

        modalBox.classList.remove('close-anime')
        modalBox.removeEventListener('animationend',onAnimationEnd)
    }
             
}

function nextImage(e) {
    
    e.preventDefault();

    if(modalBox.contains(newImg)) {
        modalBox.removeChild(newImg)
    }
    
index += 1;

    if (index > images.length-1) {
     index = 0;
    }
    
    let modalBoxImage = document.querySelector('.put-img')
    modalBoxImage.src = images[index]
   
    modalBox.addEventListener('animationend',() => {
        modalBoxImage.classList.remove('fade')
    });
    
    modalBoxImage.classList.add('fade')
   
  document.querySelector('.img-number').innerText = `${index+1} / ${images.length}`
}

function previousImage(e) {
    e.preventDefault();
    if(modalBox.contains(newImg)) {
        modalBox.removeChild(newImg)
    }
    
index -= 1;

    if (index < 0) {
     index = images.length - 1;
    }
    let modalBoxImage = document.querySelector('.put-img')
    
    modalBoxImage.src = images[index]

    modalBox.addEventListener('animationend',() =>
     modalBoxImage.classList.remove('fade'));

    modalBoxImage.classList.add('fade')
      document.querySelector('.img-number').innerText = `${index+1} / ${images.length}`
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