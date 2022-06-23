let pics = document.querySelectorAll('.pic');
let contentBox = document.querySelector('.content-box')
let modalBox = document.querySelector('.modal-box')
let closeBtn = document.querySelector('.close-icon');

let newImg;
let images = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg']
let index = 0;

pics.forEach((pic) => {
    pic.addEventListener('click',currentPic);
})


function currentPic(e) {
e.preventDefault();

//display clicked img url
let element = e.target.src;
console.log(element);
//get only the name of current clicked image and store it
//in index as number to use it in functions nextImage and
//previousImage
//used -1 because all array elements start from index 0
index = (Number(element.match(/.*\/([^/]+)\.([^?]+)/i)[1]) -1 );
console.log(index);
//create new image
 newImg = document.createElement('img')
//new image content will be equal to the clicked one
newImg.src = element;
//add the clicked image in the modal box
modalBox.appendChild(newImg)
//add modal to our page
contentBox.classList.add('open-modal')
//if close btn is clicked modal and image will be removed
document.querySelector('.close-icon').addEventListener('click',closeGallery)

document.querySelector('.right-arrow').addEventListener('click',nextImage)

document.querySelector('.left-arrow').addEventListener('click',previousImage)
}

function closeGallery(e) { 
    e.preventDefault();
    //when close btn is clicked remove the modal
        contentBox.classList.remove('open-modal')
        //reset modalBox content and insert only
        //close btn, left arrow, right arrow
        modalBox.innerHTML = `
        <i class="close-icon fa-solid fa-xmark fa-2x"></i>
        <i class="right-arrow fa-solid fa-chevron-right fa-3x"></i>
        <i class="left-arrow fa-solid fa-chevron-left fa-3x"></i>
        <img class="put-img" src="" alt="">
        `;
        //reset index value used for nextImage and previousImage
        //after closing the image gallery
        index = 0;
}

function nextImage(e) {
    e.preventDefault();
    //remove currently open image
    if(modalBox.contains(newImg)) {
        modalBox.removeChild(newImg)
    }
    
console.log(index);
//go to next image after click
index += 1;
//if last img is reached next img will be the first one from the array
    if (index > images.length-1) {
     index = 0;
    }
    //update the image in the modal box
    document.querySelector('.put-img').src = images[index]
    
}

function previousImage(e) {
    e.preventDefault();
    //remove currently open image
    if(modalBox.contains(newImg)) {
        modalBox.removeChild(newImg)
    }
    
console.log(index);
//go to previous image after click
index -= 1;
//if first img is reached next img will be the last one from the array
    if (index < 0) {
     index = images.length - 1;
    }
    //update the image in the modal box
    document.querySelector('.put-img').src = images[index]
    
    
}