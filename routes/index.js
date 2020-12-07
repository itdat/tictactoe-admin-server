const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
//const auth = require("../middleware/auth");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
//Register
router.post("/", async (req, res) => {
  const { errors, isValid } = await validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { name, username, password } = req.body;
  try {
    let user = await Admin.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "Username already exists" });
    } else {
      const newAdmin = new Admin({
        name: name,
        username: username,
        password: password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newAdmin.password = hash;
              newAdmin.save().then((user) => {
                res.status(200).json(user);
              });
            }
          });
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
