const puppeteer = require('puppeteer');


const searchProducts =  async (req, res) => {
  const { query } = req.params;
  console.log(query);
  try {
    const googleShoppingProducts = await scrapeGoogleShopping(query);
    googleShoppingProducts.sort((a, b) => parseFloat(a.productPrice.replace(/[^0-9.]/g, '')) - parseFloat(b.productPrice.replace(/[^0-9.]/g, '')));
    res.json(googleShoppingProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
};

const scrapeGoogleShopping = async (query) => {
  const url = `https://www.google.com/search?tbm=shop&hl=tr&psb=1&ved=2ahUKEwj9xJv92riGAxV5MAYAHf5eDx4Qu-kFegQIABAK&q=${query}&oq=${query}&gs_lp=Egtwcm9kdWN0cy1jYyIHdGVsZWZvbkgAUABYAHAAeACQAQCYAQCgAQCqAQC4AQPIAQCYAgCgAgCYAwCSBwCgBwA&sclient=products-cc`;
  console.log(url);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll('.sh-dgr__gr-auto ');
    
    return Array.from(productElements).slice(0, 8).map((product) => {

        const productName = product.querySelector('.tAxDx').innerText;
        const productPrice = product.querySelector('.a8Pemb').innerText;
        const productLink = product.querySelector('a.Lq5OHe').href;
        const productImage = product.querySelector('.ArOc1c img').getAttribute('src');
        return {productName, productPrice, productLink, productImage};
    });

  });
  //await browser.close();
  //console.log(products);
  return products;
};


module.exports = { searchProducts };
