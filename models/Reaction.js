const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
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
    get: timestamp => timestamp.toISOString().split('T')[0]
  }
}, {
  toJSON: {
    getters: true
  },
  id: false
});

reactionSchema.virtual('createdAtFormatted').get(function() {
  return this.createdAt.toISOString();
});

module.exports = mongoose.model('Reaction', reactionSchema);





