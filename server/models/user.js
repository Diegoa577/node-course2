//mongoosejs middleware
const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate:{
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});
//obtener solo el id y el email para el usuario
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},"abc123").toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then (() =>{
    return token;
  });
};
//creacion del finBytoken
UserSchema.statics.findByToken = function (token) {
  //mayusucula para no individuales
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, "abc123");
  } catch (e) {
    return Promise.reject();
  }
return User.findOne({
  "_id": decoded._id,
  "tokens.token": token,
  "tokens.access": "auth"
});
};
//guardar la contraseña en hash
UserSchema.pre("save", function (next) {
  var user = this;

  if(user.isModified("password")){
bcrypt.genSalt(10, (err, salt) =>{
  bcrypt.hash(user.password, salt, (err,hash) =>{
  user.password = hash;
  next();
    })
  });
  }else{
    next();
  }
})

//user
var User = mongoose.model("User", UserSchema);

module.exports = {User};
