const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// bring article model
let Article = require('../models/article');

// add article route
router.get('/add', (req, res) => {
    res.render('add_article', {
        title: "Add Article",
    });
});

// load delete
router.delete('/delete/:id', (req, res) => {

    let query = { _id: req.params.id };

    Article.remove(query, function (err) {
        if (err) {
            console.log(err);

        } else {
            res.send('Success');
        }
    });

});


// load edit form
router.get('/edit/:id', (req, res) => {

    Article.findById(req.params.id, (err, article) => {

        if (err) {
            console.log(err);

        } else {
            res.render('edit_article', {
                article: article
            });
        }

    });

});

// add article post
router.post('/add', [

    check('title', 'title is required').notEmpty(),
    check('author', 'author is required').notEmpty(),
    check('body', 'body is required').notEmpty(),

], (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);

        res.render('add_article', {
            title: 'Add Article',
            errors: errors.errors,
        });
        return;
    }

    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {

        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Added');
            res.redirect('/');
        }

    });
});

// Update route 
router.post('/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = { _id: req.params.id };

    Article.update(query, article, (err) => {

        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }

    });
});

// Get the single article
router.get('/:id', (req, res) => {

    Article.findById(req.params.id, (err, article) => {

        if (err) {
            console.log(err);

        } else {
            res.render('show_article', {
                article: article
            });
        }

    });

});

module.exports = router;
