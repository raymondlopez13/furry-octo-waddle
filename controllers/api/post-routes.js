const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');

router.get('/', (req,res) => {
    Post.findAll({
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => res.json(data));
});

router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(data => res.json(data));
});

router.post('/', (req,res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    }).then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

router.put('/:id', (req,res) => {
    Post.update({
        title: req.body.title,
        post_text: req.body.post_text
    },
     {
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data));
});

router.delete('/:id', (req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data));
})

module.exports = router;