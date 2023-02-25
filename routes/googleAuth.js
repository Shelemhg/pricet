const express = require('express');
const router = express.Router();


//Google OAuth20

const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

const session = require('express-session');
router.use(session({ secret:'cats'}));
router.use(passport.initialize());
router.use(passport.session());


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}





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
    res.send(`Welcome ${req.user.displayName}`);
});


router.get('/logout', (req, res) => {
    req.logout(function(err){
        if(err) { return next(err);}
    });
    req.session.destroy();
    res.send('Bye!');
});

module.exports = router;