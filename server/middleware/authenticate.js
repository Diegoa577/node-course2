var {User} = require("./../models/user");

var authenticate = (req,res,next) =>{
  var token =req.header("x-auth");

  User.findByToken(token).then((user) =>{
    if(!user) {
return Promise.reject();
    }
    req.user = user;
    req.token = token;
    //permite accionar el otro codigo
    next();
  }).catch((e) =>{
    res.status(401).send();
  });
};

module.exports ={authenticate}
