const express = require('express');
const app = express();
const session= require('express-session');
const cookieSession = require('cookie-session');



app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
    res.render('pages/auth');
  });

  // Passport Setup

  const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req , res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, db){
    cb(null, user);
});

passport.deserializeUser(function(obj,cb){
    cb (null. obj);
});
    
  

// Google Auth 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';

passport.use(new GoogleStrategy({
    clientID:"860629440429-0ik0bagpff4m1pvj86seo4p3dp1e4441.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL:"http://localhost:8000/users/auth/google/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    userProfile=profile;
    return done(null, profile);
  }
));

app.get('/auth/google', 
passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/error' }),
function(req, res) {
  // Successful authentication, redirect success.
  res.redirect('/success');
});

app.listen(8000, ()=>{
    console.log("Server running on port 8000");
})