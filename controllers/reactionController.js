const { Reaction } = require('../models');

// Controller methods
const createReaction = async (req, res) => {
  try {
    const { reactionBody, username } = req.body;
    const newReaction = await Reaction.create({ reactionBody, username });
    res.status(201).json(newReaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReactionById = async (req, res) => {
  try {
    const { reactionId } = req.params;
    const reaction = await Reaction.findById(reactionId);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.json(reaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReaction = async (req, res) => {
  try {
    const { reactionId } = req.params;
    const { reactionBody } = req.body;
    const updatedReaction = await Reaction.findByIdAndUpdate(
      reactionId,
      { reactionBody },
      { new: true }
    );
    if (!updatedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.json(updatedReaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReaction = async (req, res) => {
  try {
    const { reactionId } = req.params;
    const deletedReaction = await Reaction.findByIdAndDelete(reactionId);
    if (!deletedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReaction,
  getReactionById,
  updateReaction,
  deleteReaction
};

