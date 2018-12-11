var _ = require('underscore')._

var UserValidation = function(args) {

  _.extend(this,args)

  this.usernameIsValid = () => {
    return this.username && this.username.length > 3
  }

  this.passwordIsValid = () => {
    return this.password && this.password.length > 3
  }

  this.isValid = () => {
    return this.usernameIsValid() &&
      this.passwordIsValid()
  }
}

module.exports = UserValidation