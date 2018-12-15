/**
 * Comment is model that designed for containing data.
 *
 * @type {*|Mongoose}
 */
const mongoose = require("mongoose")

/**
 * Comment Schema
 *
 * <b>Entities:</b>
 * text(String)
 * author(id(ref="user"))
 * username(String)
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