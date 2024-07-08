const express = require('express');
const router = express.Router();
const reactionController = require('../../controllers/reactionController');

// POST create a new reaction
router.post('/', async (req, res) => {
  try {
    const reaction = await reactionController.createReaction(req.body);
    res.json(reaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single reaction by id
router.get('/:reactionId', async (req, res) => {
  try {
    const reaction = await reactionController.getReactionById(req.params.reactionId);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.json(reaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update a reaction by id
router.put('/:reactionId', async (req, res) => {
  try {
    const updatedReaction = await reactionController.updateReaction(req.params.reactionId, req.body);
    res.json(updatedReaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE remove a reaction by id
router.delete('/:reactionId', async (req, res) => {
  try {
    const deletedReaction = await reactionController.deleteReaction(req.params.reactionId);
    res.json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

