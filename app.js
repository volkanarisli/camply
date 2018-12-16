/**
 * Index is a main route.
 *
 * @class index.js
 * @extends express, app, bodyParser, mongoose, flash, passport, LocalStrategy, methodOverride, User, commentRoutes,
 * campgroundRoutes, indexRoutes
 * @type {*|NodeJS}
 */
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  User = require("./models/user"),
  commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index")

/**
 * Importing Dotenv Library
 *
 * @property dotenv
 * @type {Object}
 * @default "dotenv"
 */
require('dotenv').config()

/**
 * Connect Database
 *
 * @method mongoose.connect
 * @param {String} DATABASEURL
 * @param {boolean} useNewUrlParser
 */
mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true });

/**
 * Parsing Body
 *
 * @method app.set
 * @param {boolean} bodyParser.urlencoded
 */
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Sets view engine
 *
 * @method app.set
 * @param {String} view engine
 * @param {String} ejs
 */
app.set("view engine", "ejs")

/**
 * Uses express
 *
 * @method app.set
 * @param {String} express.static
 */
app.use(express.static(__dirname + "/public"));

/**
 * Overrides method
 *
 * @method app.set
 * @param {String} methodOverride
 */
app.use(methodOverride("_method"));

/**
 * Uses flash
 *
 * @method app.set
 * @param {Function} flash
 */
app.use(flash());

/**
 * Uses express session
 *
 * @method app.set
 * @param {String} secret
 * @param {boolean} resave
 * @param {boolean} saveUninitialized
 */
app.use(require("express-session")({
  secret: "Once again rusty is the cutest dog",
  resave: false,
  saveUninitialized: false

}))

/**
 * Initializes Passport
 *
 * @method app.set
 * @param {Function} passport.initialize
 */
app.use(passport.initialize())

/**
 * Creates Passport Session
 *
 * @method app.set
 * @param {Function} passport.session
 */
app.use(passport.session())

/**
 * Add Local Strategy to Passport
 *
 * @method passport.use
 * @param {Object} LocalStrategy
 */
passport.use(new LocalStrategy(User.authenticate()))

/**
 * Serializes User
 *
 * @method passport.serializeUser
 * @param {Function} User.serializeUser
 */
passport.serializeUser(User.serializeUser())

/**
 * Deserializes User
 *
 * @method passport.deserializeUser
 * @param {Function} User.deserializeUser
 */
passport.deserializeUser(User.deserializeUser())

/**
 * Routes
 *
 * @method app.use
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  next()
})

/**
 * Imports comment routes
 *
 * @method app.use
 * @param {String} path
 * @param {Class} commentRoutes
 */
app.use("/campgrounds/:id/comments", commentRoutes)

/**
 * Imports campground routes
 *
 * @method app.use
 * @param {String} path
 * @param {Class} campgroundRoutes
 */
app.use("/campgrounds", campgroundRoutes)

/**
 * Imports index routes
 *
 * @method app.use
 * @param {String} path
 * @param {Class} indexRoutes
 */
app.use("/", indexRoutes)

/**
 * Listens port.
 *
 * @method app.listen
 * @param {String} PORT
 */
app.listen(process.env.PORT || 8000, () => {
  console.log("The Camply Server Has Started")
})