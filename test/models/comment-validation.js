var _ = require('underscore')._

var CommentValidation = function(args) {

  _.extend(this,args)

  this.textIsValid = () => {
    return this.text && this.text.length
  }

  this.authorIdIsValid = () => {
    return this.author.id
  }

  this.authorUsernameIsValid = () => {
    return this.author.username && this.author.username.length > 3
  }

  this.isValid = () => {
    return this.textIsValid() &&
      this.authorIdIsValid() &&
      this.authorUsernameIsValid()
  }
}

module.exports = CommentValidation