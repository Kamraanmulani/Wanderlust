const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// ++++++++++ RENDER SIGN UP FORM and SIGN UP +++++++++++++
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

// ++++++++++ RENDER LOGN IN FORM and LOG IN +++++++++++++
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// ++++++++++LOG OUT+++++++++++++
router.get("/logout", userController.logout);

module.exports = router;
