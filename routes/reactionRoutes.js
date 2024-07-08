const router = require('express').Router();
const reactionController = require('../controllers/reactionController');

// POST create a new reaction
router.post('/', reactionController.createReaction);

// GET a single reaction by id
router.get('/:reactionId', reactionController.getReactionById);

// PUT update a reaction by id
router.put('/:reactionId', reactionController.updateReaction);

// DELETE remove a reaction by id
router.delete('/:reactionId', reactionController.deleteReaction);

module.exports = router;
