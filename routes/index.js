const router = require('express').Router();

// Import individual route modules
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

// Prefix all routes defined in userRoutes with '/users'
router.use('/users', userRoutes);

// Prefix all routes defined in thoughtRoutes with '/thoughts'
router.use('/thoughts', thoughtRoutes);

// Prefix all routes defined in reactionRoutes with '/reactions'
router.use('/reactions', reactionRoutes);

module.exports = router;
const mongoose = require('mongoose');

// MongoDB connection URI
const MONGODB_URI = 'your_mongodb_connection_uri';

// Mongoose options to avoid deprecated warnings
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Deprecated, but Mongoose still expects it
  useFindAndModify: false // Deprecated, replaced with new options
};

// Connect to MongoDB
mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;


