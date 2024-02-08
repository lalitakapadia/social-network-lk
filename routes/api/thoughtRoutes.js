const router = require('express').Router();

const {

    getAllThoughts,
    getThoughtById,
    createThought,
    findAndUpdateThought,
    deleteThought,
    createReaction,
    deleteReaction,
    
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getThoughtById)
.put(findAndUpdateThought)
.delete(deleteThought);

// function for thoughtId and reaction
router.route('/: thoughtId/reactions')
.post(createReaction);

router.route('/: thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;

