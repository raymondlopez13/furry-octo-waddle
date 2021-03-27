const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req,res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    }).then(data => {
        const posts = data.get({ plain: true });
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    })
});
router.get('/edit/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id,
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
        const posts = data.get({ plain: true });
        res.render('edit-post', { posts, loggedIn: req.session.loggedIn });
      }).catch(err => {
          console.log(err);
          res.status(400).json(err);
      })
})

module.exports = router;