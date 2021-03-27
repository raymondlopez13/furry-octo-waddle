const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req,res) => {
    Comment.findAll().then(data => res.json(data));
});

router.post('/', (req,res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    }).then(data => res.json(data));
});

router.delete('/:id', (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => res.json(data));
});

module.exports = router;