const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.find({}).select('-__v')
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).json(err);
            console.log(err)
        });
});

router.get('/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .populate(
            {
                path: 'thoughts',
                select: '-__v'
            }
        )
        .populate(
            {
                path: 'friends',
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
    User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})

router.put('/:id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(rer))
})
//add friend
router.post('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId }},
        { new: true, runValidators: true}
    )
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})
//remove friend
router.delete('/:userId/friends/:friendId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }},
        { new: true }
    )
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err))
})

module.exports = router;