const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the reaction schema
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => timestamp.toISOString().split('T')[0] // Custom getter for formatting ISO date
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false // Disable virtual `_id` field
  }
);

// Virtual getter to format createdAt as ISO string
reactionSchema.virtual('createdAtFormatted').get(function() {
  return this.createdAt.toISOString();
});

module.exports = reactionSchema;

