//new ambiente
//heroku config:set NAME=Diego
//heroku config:unset NAME
//heroku config:set JWT_SECRET=pojiaj234oi234oij234oij1
var env = process.env.NODE_ENV || "development";

if (env === "development" || env === "test" ) {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
