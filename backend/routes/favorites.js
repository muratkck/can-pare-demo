app.post('/api/favorites/add', async (req, res) => {
    const { userId, productId } = req.body;
    try {
      // Database'e ürün ekleme işlemi
      await addProductToFavorites(userId, productId);
      res.status(200).send('Product added to favorites successfully');
    } catch (error) {
      res.status(500).send('Error adding product to favorites');
    }
  });