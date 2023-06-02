
let pics = document.querySelectorAll('.pic');
let contentBox = document.querySelector('.content-box')
let modalBox = document.querySelector('.modal-box')

let newImg;
let images = Array.from(pics)
let index = 0;

export function currentPic(e) {
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