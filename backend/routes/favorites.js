const express = require('express');
const router = express.Router();
const { addFavoriteProduct, protect, getFavorites } = require('../controllers/userController');


router.post('/add', protect, addFavoriteProduct);
router.get('/get', protect, getFavorites);
console.log(router.stack);

module.exports = router;