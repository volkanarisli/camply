/**
 * User is model that designed for containing data.
 *
 * @class models-user.js
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
 * Importing Passport Local Mongoose Library
 *
 * @property passportLocalMongoose
 * @type {require}
 * @default "passport-local-mongoose"
 */
const passportLocalMongoose = require("passport-local-mongoose")

/**
 * User Schema
 *
 * @constructor UserSchema
 * @param {String} username
 * @param {String} password
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