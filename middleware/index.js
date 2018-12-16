/**
 * Index is a middleware to validate requests and responses.
 *
 * @class middleware-index.js
 * @type {*|NodeJS}
 */

/**
 * Importing Campground Model
 *
 * @property Campground
 * @type {require}
 * @default "../models/campground"
 */
const Campground = require("../models/campground")

/**
 * Importing Comment Model
 *
 * @property Campground
 * @type {require}
 * @default "../models/comment"
 */
const Comment = require("../models/comment")

/**
 * It stores middleware objects.
 *
 * @property middlewareObj
 * @type {Object}
 * @default ""
 */
const middlewareObj = {}

/**
 * Checks campground ownership
 *
 * @method checkCampgroundOwnership
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        req.flash("error", "Campground not found");
        res.redirect("back")
      } else {
        if (foundCampground.author.id.equals(req.user._id) || req.user.username == "admin") {
          next();
        } else {
          req.flash("error", "You don't have permisson to do that");
          res.redirect("back")
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that")
    res.redirect("back")
  }
}

/**
 * Checks comment ownership
 *
 * @method checkCampgroundOwnership
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back")
      } else {
        if (foundComment.author.id.equals(req.user._id) || req.user.username == "admin") {
          next()
        } else {
          req.flash("error", "You don't have permission to do that")
          res.redirect("back")
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that")
    res.redirect("back")
  }
}

/**
 * Checks the user is logged in
 *
 * @method checkCampgroundOwnership
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash("error", "You need to be logged in to do that")
  res.redirect("/login")
}

/**
 * @exports middlewareObj
 */
module.exports = middlewareObj