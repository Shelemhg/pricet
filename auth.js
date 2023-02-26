const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

const dotenv = require('dotenv');
dotenv.config();

passport.use(new GoogleStrategy({
		clientID:     process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: "https://pricet.onrender.com/google/callback",
		passReqToCallback   : true
	},
	function(request, accessToken, refreshToken, profile, done) {
		//To use later for DB search of the user
		
		// User.findOrCreate({ googleId: profile.id }, function (err, user) {
		// 	return done(err, user);
		// });
		return done(null, profile);
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
})

passport.deserializeUser(function(user, done) {
	done(null, user);
})