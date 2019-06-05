const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../Setup/url").secret;

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.json({ success: false, errMessage: "User Already Exists" });
  } else {
    let newUser = new User({
      username,
      email,
      password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save().catch(err => console.log(err));
      });
    });
    return res.json({
      success: true,
      errMessage: "User Registered Successfully"
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ success: false, errMessage: "User Doesn't exist." });
  } else {
    var payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    bcrypt
      .compare(password, user.password)
      .then(isCorrect => {
        if (!isCorrect)
          return res.json({
            success: false,
            errMessage: "Password Incorrect."
          });
        else {
          jsonwt.sign(payload, key, { expiresIn: 9000000 }, (err, token) => {
            res.cookie("auth_t", token, { maxAge: 90000000 });
            return res.json({ success: true, errMessage: "Logged In..." });
          });
        }
      })
      .catch(err => console.log(err));
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth_t");
  req.logout();
});

module.exports = router;
