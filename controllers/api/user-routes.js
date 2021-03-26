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
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
    
            res.json(dbUserData);
          });
    })
});
router.post('/login', (req, res) => {
    User.findOne({
        where: {
        email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
        }

        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});
//logout
router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
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
            return;
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