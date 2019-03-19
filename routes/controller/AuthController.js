const mongoose = require('mongoose');
const passport = require('passport');
const Account = require('../../models/account');

const controller = {
    index: (req, res) => {
        res.render('index', {
            title: 'ACNAPI Challenge',
            user: req.user,
            error: req.flash('error')
        });
    },
    loginGet: (req, res) => {
        res.render('login', { 
            title: 'Login', 
            user: req.user, 
            error: req.flash('error'),
        });
    },
    loginPost: (req, res, next) => {
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    },
    registerGet: (req, res) => {
        res.render('register', { title: 'Register' });
    },
    registerPost: (req, res, next) => {

        var newUser = new Account();

        newUser.name.firstName = req.body.firstName;
        newUser.name.lastName = req.body.lastName;
        newUser.username = req.body.username;

        Account.register(new Account(newUser), req.body.password, (err, account) => {
            if (err) {
                return res.render('register', { error: err.message });
            }

            passport.authenticate('local')(req, res, () => {
                req.session.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
        });
    },
    logout: (req, res, next) => {
        req.logout();
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    },
    ping: (req, res) => {
        res.status(200).send("pong!");
    },
}

module.exports = controller;