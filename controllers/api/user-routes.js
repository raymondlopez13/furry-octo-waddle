const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    }).then(data => {
        res.json(data);
    })
});
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data));
})
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(data => {
        res.json(data);
    })
});

module.exports = router;