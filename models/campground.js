/**
 * Campground is model that designed for containing data.
 *
 * @class models-campground.js
 * @type {*|NodeJS}
 */

/**
 * Importing Mongoose Library
 *
 * @property mongoose
 * @type {require}
 * @default "mongoose"
 */
const mongoose = require("mongoose")

/**
 * Campground Schema
 *
 * @constructor campgroundSchema
 * @param {String} name
 * @param {String} price
 * @param {String} image
 * @param {String} description
 * @param {Object} author
 * @param {Object} comments
 */
const campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
})

/**
 * @type {Model}
 *
 * @exports campgroundSchema
 */
module.exports = mongoose.model("Campground", campgroundSchema)