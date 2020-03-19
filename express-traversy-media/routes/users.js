const express = require('express');
const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

//User Model 
let User = require('../models/user');

router.get('/register', function (req, res) {

    res.render('register', {
        title: 'Register'
    });

});

router.post('/register', [

    check('name', 'name is required').notEmpty(),
    check('username', 'username is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password must be at least 5 chars').isLength({ min: 5 }).custom((value, { req }) => {
        if (value !== req.body.password2) {
            throw new Error("Passwords don't match");

        } else {
            return value;
        }
    })
], function (req, res) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);

        res.render('register', {
            title: 'Register',
            errors: errors.errors,
        });
        return;
    }

    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // const password2 = req.body.password2;
    let user = new User({
        name: name,
        username: username,
        email: email,
        password: password,
    });

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    user.password = hash;
                    user.save(function (err) {

                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            req.flash('success', 'You are now registered');
                            res.redirect('/users/login');
                        }
                    })
                }
            });

        }


    });


});

router.get('/login', function (req, res) {

    res.render('login', {
        title: 'Login',
    });

});

router.post('/login', function (req, res, next) {

    passport.authenticate('local', {
        
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
        failureMessage: 'Could not login',
        successFlash: true,
        successMessage: 'login Succesful',

    })(req, res, next);

});

router.get('/logout', function (req, res) {  
    req.logout();
    req.flash('success', 'You have been logged out!');
    res.redirect('/users/login');
})

module.exports = router;
