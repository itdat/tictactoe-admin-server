const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const adminController = require("./../controllers/adminController");
//Register
router.route("/register").post(adminController.Register);

//Login
router.route("/login").post(adminController.Login);

//Login with Facebook
router.route("/login/facebook").get(passport.authenticate("facebook"));

router.route("/login/facebook/callback").get(
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "https://tictactoe-admin.netlify.app/login",
  })
);

// Login with Google
router.route("/login/google").get(
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.route("/login/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "https://tictactoe-admin.netlify.app/login",
  })
);

module.exports = router;
