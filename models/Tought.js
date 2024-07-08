const mongoose = require('mongoose');
const reactionSchema = require('./Reaction'); // Assuming Reaction schema is defined in Reaction.js
const Schema = mongoose.Schema;

// Define the thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
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
    },
    reactions: [reactionSchema] // Embedding the reactionSchema as an array of subdocuments
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false // Disable virtual `_id` field
  }
);

// Virtual getter to get the length of reactions array
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Virtual getter to format createdAt as ISO string
thoughtSchema.virtual('createdAtFormatted').get(function() {
  return this.createdAt.toISOString();
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;

