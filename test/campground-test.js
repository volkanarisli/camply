const assert = require('assert')
const campgroundValidation = require("./models/campground-validation")

describe("Applying for mission", () => {
  var validApp

  before(() => {
    validApp = new campgroundValidation({
      price: 30,
      image: "google.com/imageurl",
      description: 'this is a description about camp',
      author: {
        id: 1,
        username: 'tugberkgoc',
      },
      comments: "this is a comment about camp"
    })
  })

  describe("Using valid price, image, description, author and comments", () => {
    it("is valid", () => {
      assert(validApp.isValid(), "Not Valid")
    })
    it("reports a valid price", () => {
      assert(validApp.priceIsValid(), "Price is not Valid")
    })
    it("reports a valid image", () => {
      assert(validApp.imageIsValid(), "Image is not Valid")
    })
    it("reports a valid description", () => {
      assert(validApp.descriptionIsValid(), "Description is not Valid")
    })
    it("reports a valid author", () => {
      assert(validApp.authorIsValid(), "Author is not Valid")
    })
    it("reports a valid comments", () => {
      assert(validApp.commentsIsValid(), "Comment is not Valid")
    })
  })
})