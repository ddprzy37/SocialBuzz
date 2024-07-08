// Import mongoose library
const mongoose = require('mongoose');

// MongoDB connection URI
const MONGODB_URI = 'mongodb://localhost:27017/social-media-api';

// Configure mongoose to use promises
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notifications of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export the connection
module.exports = db;

