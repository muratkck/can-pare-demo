const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUser, getUsers } = require('../controllers/userController');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', authUser);

router.get('/getUsers', getUsers);
router.get('/:email', getUser); // Route to get a user by email

module.exports = router;
