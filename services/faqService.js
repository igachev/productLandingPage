

export function expand(e) {
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
export function minimize(e) {
    e.preventDefault();
    let answer = e.target.parentElement.parentElement.nextElementSibling
    let expandBtn = e.target.parentElement.previousElementSibling
   // console.log(expandBtn)
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