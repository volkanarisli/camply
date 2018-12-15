/**
 * Campground is model that designed for containing data.
 *
 * @type {*|Mongoose}
 */
var mongoose = require("mongoose")

/**
 * Campground Schema
 *
 * <b>Entities:</b>
 * name(String)
 * price(String)
 * image(String)
 * description(String)
 * author(id(ref="user"), username(String))
 * comments(ref="Comment")
 */
var campgroundSchema = new mongoose.Schema({
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