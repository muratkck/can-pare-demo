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
    const products = response.data.shopping.slice(0, 8);
  
    return products.map(product => {

      const priceFloat = parseFloat(product.price.replace(/[^0-9,.-]/g, '').replace(',', '.'));
  
      const stockStatus = product.inStock ? "In Stock" : "Out of Stock";
      const category = product.category || "Unknown category";
      const ratings = product.ratings || "No ratings";
      const promotions = product.promotions ? product.promotions.join(", ") : "No promotions";
  
      return {
        productName: product.title,
        productPrice: priceFloat,
        productLink: product.link,
        productImage: product.imageUrl,
        productSeller: product.source,
        productStock: product.stockStatus,
        productCategory: product.category,
        productRatings: product.ratings,
        productPromotions: product.promotions,
      };
    });
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

module.exports = { searchProducts };
