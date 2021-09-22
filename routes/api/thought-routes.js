const router = require('express').Router();
const { Thought, User } = require('../../models');

router.get('/', (req, res) => {
    Thought.find({}).select('-__v')
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).json(err);
            console.log(err)
        });
});

router.get('/:id', (req, res) => {
    Thought.findOne({ _id: req.params.id })
        .populate(
            {
                path: 'username',
                select: '-__v'
            }
        )
        .select('-__v')
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).json(err);
            console.log(err)
        });
})

router.post('/', (req, res) => {
    Thought.create(req.body)
    .then(({_id}) => {
        return User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: _id }},
            { new: true }
        );
    })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(rer))
})
//add reaction
router.post('/:thoughtId/reactions', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body }},
        { new: true, runValidators: true}
    )
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})
//remove reaction
router.post('/:thoughtId/reactions/:reactionId', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactionId: params.reactionId }},
        { new: true }
    )
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})

module.exports = router;