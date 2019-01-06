const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')

passport.use(
  new GoogleStrategy({
    // options fot the google strategy
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  },
  (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('passport')
    console.log(profile)
  })
);
