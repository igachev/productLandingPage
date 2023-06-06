const { expect } = require('chai');
const { chromium } = require('playwright-chromium');

const options = { headless: false, slowMo: 200 };
const url = 'http://127.0.0.1:5500/';

let mockData = {
  images: [
    {href: '/img/1.jpg'},
    {href: '/img/2.jpg'},
    {href: '/img/3.jpg'},
    {href: '/img/4.jpg'},
    {href: '/img/5.jpg'},
    {href: '/img/6.jpg'},
    {href: '/img/7.jpg'},
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


  describe('test nextImage() functionality', () => {

    it('modal-box should contain only one image at a time',async() => {
    await page.goto(url)
    await page.click('text="Gallery"')
    const link = await page.$(`a[href="${mockData.images[0].href}"]`);
    await link.click()
    await page.waitForTimeout(500);
    await page.click('.right-arrow')
    let totalImagesInModalBox = await page.$$eval('.modal-box img', i => i);
    expect(totalImagesInModalBox.length).to.equal(1)
    })

    it('should display the next image in order correctly',async () => {
      await page.goto(url)
    await page.click('text="Gallery"')
    const link = await page.$(`a[href="${mockData.images[0].href}"]`);
    await link.click()
    await page.waitForTimeout(500);
    await page.click('.right-arrow')
    let currentImage = await page.$eval('.modal-box img', i => i.src.split('/'));
    let currentImagePath = `/${currentImage[3]}/${currentImage[4]}`
    expect(currentImagePath).to.equals(mockData.images[1].href)
    })

    it('should display first image in gallery when reaching the end of gallery',async () => {
      await page.goto(url)
    await page.click('text="Gallery"')
    const link = await page.$(`a[href="${mockData.images[6].href}"]`);
    await link.click()
    await page.waitForTimeout(500);
    await page.click('.right-arrow')
    let currentImage = await page.$eval('.modal-box img', i => i.src.split('/'));
    let currentImagePath = `/${currentImage[3]}/${currentImage[4]}`
    expect(currentImagePath).to.equals(mockData.images[0].href)
    })


  })

  describe('test previousImage() functionality', () => {

    it('modal-box should contain only one image at a time',async() => {
      await page.goto(url)
      await page.click('text="Gallery"')
      const link = await page.$(`a[href="${mockData.images[1].href}"]`);
      await link.click()
      await page.waitForTimeout(500);
      await page.click('.left-arrow')
      let totalImagesInModalBox = await page.$$eval('.modal-box img', i => i);
      expect(totalImagesInModalBox.length).to.equal(1)
      })

      it('should display the previous image in order correctly',async () => {
        await page.goto(url)
      await page.click('text="Gallery"')
      const link = await page.$(`a[href="${mockData.images[2].href}"]`);
      await link.click()
      await page.waitForTimeout(500);
      await page.click('.left-arrow')
      let currentImage = await page.$eval('.modal-box img', i => i.src.split('/'));
      let currentImagePath = `/${currentImage[3]}/${currentImage[4]}`
      expect(currentImagePath).to.equals(mockData.images[1].href)
      })


      it('should display last image in gallery',async () => {
        await page.goto(url)
      await page.click('text="Gallery"')
      const link = await page.$(`a[href="${mockData.images[0].href}"]`);
      await link.click()
      await page.waitForTimeout(500);
      await page.click('.left-arrow')
      let currentImage = await page.$eval('.modal-box img', i => i.src.split('/'));
      let currentImagePath = `/${currentImage[3]}/${currentImage[4]}`
      expect(currentImagePath).to.equals(mockData.images[6].href)
      })

  })

})

