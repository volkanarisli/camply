/**
 * Campground is a router that contains restful services.
 *
 * @class routes-campground.js
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
 * Importing Campground Class
 *
 * @property Campground
 * @type {Object}
 * @default "../models/campground"
 */
const Campground = require("../models/campground")

/**
 * Importing Middleware Class
 *
 * @property Middleware
 * @type {Object}
 * @default "../middleware"
 */
const middleware = require("../middleware")

/**
 * GET MAPPING: Show all campgrounds from getting DB.
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
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  })
})

/**
 * POST MAPPING: Add new campground to DB
 *
 * @method router.post("/")
 * @param {Object} req
 * @param {Object} res
 */
router.post("/", middleware.isLoggedIn, function (req, res) {
  const name = req.body.name
  const price = req.body.price
  const image = req.body.image
  const desc = req.body.description
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  const newCampground = {name: name, price: price, image: image, description: desc, author: author}
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      //console.log(newlyCreated)
      res.redirect("/campgrounds")
    }
  })
})

/**
 * GET MAPPING: Show form to create new campground
 *
 * @method router.get("/new")
 * @param {Object} req
 * @param {Object} res
 */
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new")
})

/**
 * GET MAPPING: Shows more info about one campground
 *
 * @method router.get("/:id")
 * @param {Object} req
 * @param {Object} res
 */
router.get("/:id", function (req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      if (req.isAuthenticated()) {
        //console.log(foundCampground)
        var usernameofUser = req.user.username
        //console.log(usernameofUser);
        res.render("campgrounds/show", {campground: foundCampground, usernameofUser, usernameofUser});
      } else {
        //console.log(foundCampground)
        res.render("campgrounds/show", {campground: foundCampground, usernameofUser, usernameofUser});
      }
    }
  })
})

/**
 * GET MAPPING: Edit campground route
 *
 * @method router.get("/:id/edit")
 * @param {Object} req
 * @param {Object} res
 */
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    res.render("campgrounds/edit", {campground: foundCampground})
  })
})

/**
 * PUT MAPPING: Update campground route
 *
 * @method router.put("/:id")
 * @param {Object} req
 * @param {Object} res
 */
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err) {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

/**
 * DELETE MAPPING: Destroy campground route
 *
 * @method router.delete("/:id")
 * @param {Object} req
 * @param {Object} res
 */
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds")
    }
  })
})

/**
 * @type {Router|router}
 *
 * @exports router
 */
module.exports = router