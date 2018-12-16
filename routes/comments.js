/**
 * Comment is a router that contains restful services.
 *
 * @class routes-comment.js
 * @type {*|NodeJS}
 */

/**
 * Importing Express Library
 *
 * @property express
 * @type {Object}
 * @default "express"
 */
const express = require("express");

/**
 * Importing Router Library
 *
 * @property router
 * @type {Object}
 * @default "express.Router()"
 */
const router = express.Router({mergeParams: true});

/**
 * Importing Campground Class
 *
 * @property Campground
 * @type {Object}
 * @default "../models/campground"
 */
const Campground = require("../models/campground");

/**
 * Importing Comment Class
 *
 * @property Comment
 * @type {Object}
 * @default "../models/comment"
 */
const Comment = require("../models/comment");

/**
 * Importing Middleware Class
 *
 * @property Middleware
 * @type {Object}
 * @default "../middleware"
 */
const middleware = require("../middleware");

/**
 * GET MAPPING: To check from id to give login permission to user.
 *
 * @method router.get("/new")
 * @param {Object} req
 * @param {Object} res
 */
router.get("/new", middleware.isLoggedIn, function (req, res) {
  //console.log(req.params.id);
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground})
    }
  })
})

/**
 * POST MAPPING: Looks up campground using ID, then creates comments.
 *
 * @method router.post("/")
 * @param {Object} req
 * @param {Object} res
 */
router.post("/", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          req.flash("error", "Something went wrong")
          console.log(err)
        } else {
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          comment.save()
          campground.comments.push(comment)
          campground.save()
          //console.log(comment)
          req.flash("success", "Successfully added comment")
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
})

/**
 * GET MAPPING: Checks comment ownership, then comments edit route.
 *
 * @method router.get("/:comment_id/edit")
 * @param {Object} req
 * @param {Object} res
 */
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
    }
  })
})

/**
 * PUT MAPPING: Checks comment ownership, then updates comment.
 *
 * @method router.put("/:comment_id/edit")
 * @param {Object} req
 * @param {Object} res
 */
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
    if (err) {
      res.redirect("back")
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

/**
 * DELETE MAPPING: Checks comment ownership, then destroys comment route.
 *
 * @method router.delete("/:comment_id")
 * @param {Object} req
 * @param {Object} res
 */
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("back")
    } else {
      req.flash("success", "Comment deleted")
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

/**
 * @type {Router|router}
 *
 * @exports router
 */
module.exports = router;