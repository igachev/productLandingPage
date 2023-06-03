const { expect } = require('chai');
const { chromium } = require('playwright-chromium');

const options = { headless: false, slowMo: 200 };
const url = 'http://127.0.0.1:5500/';

let mockData = {
  images: [
    {href: '/img/1.jpg'},
    {href: '/img/2.jpg'}
  ]
}

describe('tests:', function() {
  this.timeout(20000);
  let browser;
  let page;
  

  before(async () => {
    browser = await chromium.launch();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
   
  });

  afterEach(async () => {
    await page.close();
  });


  describe('test currentPic() functionality', () => {
  

    it('added image to modal-box should be equal to currently clicked image', async () => {
     await page.goto(url)
     await page.click('text="Gallery"')
     const link = await page.$(`a[href="${mockData.images[0].href}"]`);
     await link.click()
     let addedImage = await page.getAttribute('.modal-box img:last-child', 'src');
     addedImage = addedImage.split('/')[4];
     expect(addedImage).to.equals(mockData.images[0].href.split('/')[2])
    });
  
    it('opened image should display correct image index', async() => {
      await page.goto(url)
      await page.click('text="Gallery"')
      const link = await page.$(`a[href="${mockData.images[1].href}"]`);
      await link.click()
      let textInfo = await page.textContent('p.img-number')
      let allPictures = await page.$$eval('.pic', el => el);
      let currentIndex = mockData.images.indexOf(mockData.images[1]) + 1;
      expect(textInfo).to.equals(`${currentIndex} / ${allPictures.length}`)
    })
  
    it('.modal-box should contains animation expand-faq-anime', async() => {
      await page.goto(url)
      await page.click('text="Gallery"')
      const link = await page.$(`a[href="${mockData.images[1].href}"]`);
      await link.click()
  
      const expandAnimationExists = await page.evaluate(() => {
        const expand = !!document.querySelector('.expand-faq-anime')
        return expand
      })
  
      expect(expandAnimationExists).to.equal(true)
    })
  
  });
  
  
  describe('test closeGallery() functionality', () => {
    
  
    it('should not contain the image in modal-box after closing gallery', async () => {
     await page.goto(url)
     await page.click('text="Gallery"')
     const link = await page.$(`a[href="${mockData.images[0].href}"]`);
     await link.click()
     let lastOpenedImage = await page.$eval('.modal-box img:last-child', i => i.src)
     await page.click('.close-icon')
     await page.waitForTimeout(500);
     let checkForImageAfterClose = await page.$eval('.modal-box img:last-child', i => i.src)
     expect(checkForImageAfterClose).to.not.equals(lastOpenedImage)
    });
  
   it('should reset image index to 0 after closing gallery', async() => {
    await page.goto(url)
     await page.click('text="Gallery"')
     const link = await page.$(`a[href="${mockData.images[0].href}"]`);
     await link.click()
     await page.click('.close-icon')
     await page.waitForTimeout(500);
     let imageIndexAfterClose = await page.$eval('.modal-box .img-number', i => i.textContent)
     expect(imageIndexAfterClose).to.equals('0')
   })

   it('modal-box should contain animation close-anime', async() => {
    await page.goto(url)
    await page.click('text="Gallery"')
    const link = await page.$(`a[href="${mockData.images[0].href}"]`);
    await link.click()
    await page.click('.close-icon')
    let animationExists = Boolean(await page.$eval('.close-anime', i => i.className))
    expect(animationExists).to.equals(true)
   })
  
  });


})

