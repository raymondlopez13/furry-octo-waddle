const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');

router.get('/', (req,res) => {
    Post.findAll({
        include: [
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
                attributes: ['comment_text'],
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
        post_url: req.body.post_url,
        user_id: req.body.user_id
    }).then(data => res.json(data));
});

router.put('/:id', (req,res) => {
    Post.update({
        title: req.body.title
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