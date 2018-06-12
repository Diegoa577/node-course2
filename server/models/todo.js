var mongoose = require("mongoose");
//save new Something
var Todo = mongoose.model("Todo",{
  text: {
    type: String,
    required: true,
    minlength: 1,
    //elimina los espacios en blancos
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};