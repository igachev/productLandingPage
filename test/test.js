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

describe('test currentPic() functionality', function() {
  this.timeout(20000);
  let browser;
  let page;
  

  before(async () => {
    browser = await chromium.launch(options);
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

