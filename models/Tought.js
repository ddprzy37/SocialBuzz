const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
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
    get: timestamp => timestamp.toISOString().split('T')[0]
  },
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Reaction'
  }]
}, {
  toJSON: {
    getters: true,
    virtuals: true
  },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);




