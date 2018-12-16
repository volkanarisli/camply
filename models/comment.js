/**
 * Comment is model that designed for containing data.
 *
 * @class models-comment.js
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
 * Comment Schema
 *
 * @constructor commentSchema
 * @param {String} text
 * @param {Object} author
 * @param {String} username
 */
const commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
})

/**
 * @type {Model}
 *
 * @exports commentSchema
 */
module.exports = mongoose.model("Comment", commentSchema)