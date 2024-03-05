const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/user");
const dashboardController = require("../controllers/dashboardController");

// Setting up the Passport Authentication process for Google
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Importing and Settin up the .env file
const dotenv = require("dotenv");
path.resolve(__dirname, "../config.env")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done)=>{
    const newUser = {
        googleId: profile.id,
        googleMail: profile.emails[0].value,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      }; 
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    
    }
));

// Google Login Route
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Redirection on Failure or Success of Authentication 
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/loginFailure', successRedirect: "/", }));

// Route on successful authentication
router.get('/dashboard', dashboardController.dashboard);

// Route if something goes wrong in authentication
router.get('/loginFailure', async (req, res)=>{
    res.sendFile(path.join(__dirname, "../../Client/public/loginFailure.html"));
});

// Destroy user session
router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if(error) {
      console.log(error);
      res.send('Error loggin out');
    } else {
      res.redirect('/')
    }
  })
});

// Presist user data after successful authentication
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user data from session.
passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (error) {
      done(error, null);
  }
});

module.exports = router;