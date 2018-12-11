const assert = require('assert')
const commentValidation = require("./models/comment-validation")

describe("Applying for testing on comments.js", () => {
  var validApp

  before(() => {
    validApp = new commentValidation({
      text: 'this is a sample text.',
      author: {
        id: 1,
        username: 'usernameexample'
      }
    })
  })

  describe("Using valid price, image, description, author and comments", () => {
    it("is valid", () => {
      assert(validApp.isValid(), "Not Valid")
    })
    it("reports a valid id", () => {
      assert(validApp.authorIdIsValid(), "ID is not Valid")
    })
    it("reports a valid username", () => {
      assert(validApp.authorUsernameIsValid(), "Username is not Valid")
    })
  })
})