const assert = require('assert')
const UserValidation = require("./models/user-validation")

describe("Applying for testing on comments.js", () => {
  var validApp

  before(() => {
    validApp = new UserValidation({
      username: 'this is a sample text.',
      password: 'Tugberk1907'
    })
  })

  describe("Using valid price, image, description, author and comments", () => {
    it("is valid", () => {
      assert(validApp.isValid(), "Not Valid")
    })
    it("reports a valid username", () => {
      assert(validApp.usernameIsValid(), "Username is not Valid")
    })
    it("reports a valid password", () => {
      assert(validApp.passwordIsValid(), "Password is not Valid")
    })
  })
})