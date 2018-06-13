var mongoose = require("mongoose");
//para hacer promesas
mongoose.Promise = global.Promise;
//development and local
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
