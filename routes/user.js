const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.js")
const passport = require("passport");

router.get("/signup", userController.renderSignUpForm);

router.post("/signup", userController.signUp);

router.get("/login", userController.renderLogInForm);

router.post("/login", passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.logInForm);

router.get("/logout", userController.logOut)

module.exports = router;