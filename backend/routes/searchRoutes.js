const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController');

router.get('/:query', searchProducts);
console.log(router.stack);
module.exports = router;
