const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {

    passport.use(new LocalStrategy(function (username, password, done) {

        // Match Username
        let query = { username: username };
        User.findOne(query, function (err, user) {
            if (err) {
                throw err;
            }

            if (!user) {
                return done(null, false, { message: 'No user Found' });
            }

            // Match Password
            bcrypt.compare(password, user.password, function (err, success) {
                if (err) throw err;
                if (success) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password do not match' });
                }
            })
        });

    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

};