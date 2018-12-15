const express = require("express")
const router = express.Router()
const Campground = require("../models/campground")
const middleware = require("../middleware")

/**
 * GET MAPPING
 *
 * Show all campgrounds from getting DB.
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
 * POST MAPPING
 *
 * Add new campground to DB
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
 * GET MAPPING
 *
 * Show form to create new campground
 */
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new")
})

/**
 * GET MAPPING
 *
 * Shows more info about one campground
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
 * GET MAPPING
 *
 * Edit campground route
 */
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    res.render("campgrounds/edit", {campground: foundCampground})
  })
})

/**
 * PUT MAPPING
 *
 * Update campground route
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
 * DELETE MAPPING
 *
 * Destroy campground route
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