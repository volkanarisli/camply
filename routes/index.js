/**
 * Index is a main route.
 *
 * @class routes-index.js
 * @extends express, router, passport, User, Campground
 * @type {*|NodeJS}
 */

/**
 * Importing Express Library
 *
 * @property express
 * @type {Object}
 * @default "express"
 */
const express = require("express")

/**
 * Importing Router Library
 *
 * @property router
 * @type {Object}
 * @default "express.Router()"
 */
const router = express.Router()

/**
 * Importing Passport Library
 *
 * @property passport
 * @type {Object}
 * @default "passport"
 */
const passport = require("passport")

/**
 * Importing User Class
 *
 * @property User
 * @type {Object}
 * @default "../models/user"
 */
const User = require("../models/user")

/**
 * Importing Campground Class
 *
 * @property Campground
 * @type {Object}
 * @default "../models/campground"
 */
const Campground = require("../models/campground")

/**
 * GET MAPPING: Rooting main route.
 *
 * @method router.get("/")
 * @param {Object} req
 * @param {Object} res
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
 * GET MAPPING: Routes to register form.
 *
 * @method router.get("/register")
 * @param {Object} req
 * @param {Object} res
 */
router.get("/register", function (req, res) {
  res.render("register")
})

/**
 * POST MAPPING: Routes for register as a success or failure.
 *
 * @method router.post("/register")
 * @param {Object} req
 * @param {Object} res
 */
router.post("/register", function (req, res) {
  const newUser = new User({username: req.body.username})
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
 * GET MAPPING: Shows login form to user.
 *
 * @method router.get("/login")
 * @param {Object} req
 * @param {Object} res
 */
router.get("/login", function (req, res) {
  res.render("login")
})

/**
 * POST MAPPING: Routes for authentication to validate login logic.
 *
 * @method router.post("/login")
 * @param {Object} req
 * @param {Object} res
 */
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failueRedirect: "/login"
  }), function (req, res) {
})

/**
 * GET MAPPING: Routes for logout.
 *
 * @method router.get("/logout")
 * @param {Object} req
 * @param {Object} res
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