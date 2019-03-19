const express = require('express');
const passport = require('passport');
const AuthController = require('./controller/AuthController');
const passportFacebook = require('../auth/facebook');
// const passportTwitter = require('../auth/twitter'); //maybe later
// const passportGoogle = require('../auth/google');
const router = express.Router();

router.get('/', AuthController.index);

// Route to handle the register get & post method
router.get('/register', AuthController.registerGet);
router.post('/register', AuthController.registerPost);

// Route to handle the login get & post method
router.get('/login', AuthController.loginGet);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), AuthController.loginPost);

// Facebook login
router.get('/auth/facebook', passportFacebook.authenticate('facebook'));
router.get('/auth/facebook/callback', passportFacebook.authenticate('facebook', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/');
});

// Route to handle the logout
router.get('/logout', AuthController.logout);

// Check if user authenticated or not
function userAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

// Test Connection
router.get('/ping', AuthController.ping);

module.exports = router;
