const router = require('express').Router();
const thoughtController = require('../controllers/thoughtController');

// GET all thoughts
router.get('/', thoughtController.getAllThoughts);

// GET a single thought by id
router.get('/:thoughtId', thoughtController.getThoughtById);

// POST create a new thought
router.post('/', thoughtController.createThought);

// PUT update a thought by id
router.put('/:thoughtId', thoughtController.updateThought);

// DELETE remove a thought by id
router.delete('/:thoughtId', thoughtController.deleteThought);

// POST add a reaction to a thought
router.post('/:thoughtId/reactions', thoughtController.addReaction);

// DELETE remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

module.exports = router;

