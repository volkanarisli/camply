var _ = require('underscore')._

var CampgroundApplication = function(args) {

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

module.exports = CampgroundApplication

/*

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
 */