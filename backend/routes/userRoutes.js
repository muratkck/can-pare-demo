const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', authUser);

module.exports = router;
