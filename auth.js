const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

const GOOGLE_CLIENT_ID = '175717049775-fjnns5q81lvmt82iijsb36r88mtfckbr.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';


passport.use(new GoogleStrategy({
		clientID:     GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/google/callback",
		passReqToCallback   : true
	},
	function(request, accessToken, refreshToken, profile, done) {
		User.findOrCreate({ googleId: profile.id }, function (err, user) {
			return done(err, user);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
})

passport.deserializeUser(function(user, done) {
	done(null, user);
})