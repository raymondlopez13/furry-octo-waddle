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
});
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(data => {
        res.json(data);
    })
});
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(data => {
        if(!data){
            res.json({message: 'no user with this ID!'});
        }
        res.json(data);
    })
});
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data));
})

module.exports = router;