const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    let sess;
    Post.findAll({
        attributes: ['id',"title",'post_text','created_at'],
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
    }).then(data => {
        sess = req.session;
        const posts = data.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.get('/login', (req,res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
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
    }).then(data => {
        const post = data.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
});

module.exports = router;