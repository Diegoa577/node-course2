var mongoose = require("mongoose");
//user
var user = mongoose.model("Users",{
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {user};
