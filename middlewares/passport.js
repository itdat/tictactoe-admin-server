const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const adminModel = require("../models/Admin");
//const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const configAuth = require("../utils/oauth");
//const JWTStrategy = passportJWT.Strategy;
//const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


passport.use(
  new FacebookStrategy(
    {
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: ["id", "displayName"],
    },
    // facebook will send user token and profile information
    function (accessToken, refreshToken, profile, done) {
      const { id, name } = profile._json;
      const adminData = {
        username: id,
        name: name,
        password: accessToken,
      };
      new adminModel(adminData).save();
      done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
      profileFields: ["email","displayName"],
    },

    function (accessToken, refreshToken, profile, done) {
      const { email, name } = profile._json;
      const adminData = {
        username: email,
        name: name,
        password: accessToken,
      };
      new adminModel(adminData).save();
      done(null, profile);
    }
  )
);
