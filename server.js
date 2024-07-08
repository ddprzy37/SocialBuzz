const express = require('express');
const db = require('./config/db'); // Adjust the path as necessary
const routes = require('./routes'); // This should automatically look for index.js

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
// Add other middleware as needed

// Connect to MongoDB
db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

