/**
 * User is model that designed for containing data.
 *
 * @type {*|Mongoose}, {*|passport-local-mongoose}
 */
const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

/**
 * User Schema
 *
 * <b>Entities:</b>
 * username(String)
 * password(String)
 */
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
})

UserSchema.plugin(passportLocalMongoose)

/**
 * @type {Model}
 *
 * @exports UserSchema
 */
module.exports = mongoose.model("User", UserSchema)