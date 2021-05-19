const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { post } = require('./API');

router.get('/', withAuth, async (req, res) => {

    try{
        const postData = await Post.findAll({

            where: {
                user_id:req.session.user_id
            },
            include: [

                {
                    model: User,
                    attributes: ['name'], 
                }, 

                {
                    model: Comment, 
                    attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]

        });

        const posts = postData.map((post) => post.get({plain: true}));
        res.render('dashboard', {
            posts, 
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/newPost', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');

        return; 
    }

    res.render('new-post');
});

router.get('/editPost/:id', withAuth, async (req, res) => {

    try {
        const postData = await post.findByPk(req.params.id, {

            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    }
                }
            ]
        });

        const post = postData.get({ plain: true });
        res.render('edit-post', {
            post, 
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router; 