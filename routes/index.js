const express = require('express');
const router = express.Router();
//ADDED SWAGGER ROUTES
router.use('/', require('./swagger'));
router.use('/amazon', require('./amazon'));



function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}



const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

require('../auth');

router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
);


router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);

router.get('/auth/failure', (req, res) => {
    res.send('Somehting went wrong when trying to authenticate you.');
});

router.get('/protected', isLoggedIn, (req, res) => {
    res.send('Hello');
});




module.exports = router;