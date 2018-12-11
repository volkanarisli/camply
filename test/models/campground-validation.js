var _ = require('underscore')._

var CampgroundValidation = function(args) {

  _.extend(this,args)

  this.priceIsValid = () => {
    return this.price && this.price !== null
  }

  this.imageIsValid = () => {
    return this.image
  }

  this.descriptionIsValid = () => {
    return this.description && this.description.length > 3
  }

  this.authorIsValid = () => {
    return this.author.id && this.author.username && this.author.username.length > 3
  }

  this.commentsIsValid = () => {
    return this.comments
  }

  this.isValid = () => {
    return this.priceIsValid() &&
        this.imageIsValid() &&
        this.descriptionIsValid() &&
        this.authorIsValid() &&
        this.commentsIsValid()
  }
}

module.exports = CampgroundValidation