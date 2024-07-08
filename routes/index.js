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

