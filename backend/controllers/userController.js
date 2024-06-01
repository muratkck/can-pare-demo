const User = require('../models/User');
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const registerUser = async (req, res) => {
  const { name, surname, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, surname, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getUsers = async (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
};

// Updated function to get a specific user by email
const getUser = async (req, res) => {
  const { email } = req.params; // Assuming email is passed as a URL parameter
  try {
    const user = await User.findOne({ email });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

const addFavoriteProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      $addToSet: { favorites: productId }
    }, { new: true });

    res.json({
      message: 'Product added to favorites successfully',
      favorites: updatedUser.favorites
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating favorites: ' + error.message });
  }
};

const getFavorites = async (req, res) => {

  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving favorites: ' + error.message });
  }
};

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};



module.exports = { registerUser, authUser, getUser, getUsers, addFavoriteProduct, getFavorites, protect };
