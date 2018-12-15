/**
 * Index is a main route.
 *
 * @extends express, router, passport, User, Campground
 * @type {createApplication}
 */
const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/user")
const Campground = require("../models/campground")

/**
 * GET MAPPING
 *
 * Rooting main route.
 */
router.get("/", function (req, res) {
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds})
    }
  })
})

/**
 * GET MAPPING
 *
 * Routes to register form.
 */
router.get("/register", function (req, res) {
  res.render("register")
});

/**
 * POST MAPPING
 *
 * Routes for register as a success or failure.
 */
router.post("/register", function (req, res) {
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message)
      return res.render("register")
    } else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Welcome to YeldCamp" + user.username)
        res.redirect("/campgrounds")
      })
    }
  })
})

/**
 * GET MAPPING
 *
 * Shows login form to user.
 */
router.get("/login", function (req, res) {
  res.render("login")
})

/**
 * POST MAPPING
 *
 * Routes for authentication to validate login logic.
 */
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failueRedirect: "/login"
  }), function (req, res) {
})

/**
 * GET MAPPING
 *
 * Routes for logour.
 */
router.get("/logout", function (req, res) {
  req.logout()
  req.flash("success", "Logged you out")
  res.redirect("/campgrounds")
})

/**
 * @exports router
 */
module.exports = router