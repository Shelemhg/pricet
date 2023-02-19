const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "175717049775-fjnns5q81lvmt82iijsb36r88mtfckbr.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
//   function(accessToken, refreshToken, profile, cb) {
    function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));