const axios = require('axios');

const searchProducts = async (req, res) => {
  const { query } = req.params;
  console.log(query);
  try {
    const googleShoppingProducts = await fetchGoogleShoppingData(query);
    googleShoppingProducts.sort((a, b) => a.productPrice - b.productPrice);
    res.json(googleShoppingProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product data' });
  }
};

const fetchGoogleShoppingData = async (query) => {
  let data = JSON.stringify({
    "q": query,
    "location": "United States",
    "gl": "tr"
  });

  let config = {
    method: 'post',
    url: 'https://google.serper.dev/shopping',
    headers: { 
      'X-API-KEY': '015126cb440b330583010285766f934bba2a13a0', 
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(config);
    const products = response.data.shopping.slice(0, 8); // Take only the first 8 products
    return products.map(product => {
      // Extract the numeric part of the price and convert it to a float
      const priceFloat = parseFloat(product.price.replace(/[^0-9,.-]/g, '').replace(',', '.'));
      return {
        productName: product.title,
        productPrice: priceFloat,
        productLink: product.link,
        productImage: product.imageUrl,
        productSeller: product.source,
      };
    });
  } catch (error) {
    console.error('Error fetching data from API', error);
    throw new Error('Failed to fetch product data from API');
  }
};

module.exports = { searchProducts };
