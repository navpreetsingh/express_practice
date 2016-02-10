var mongoose = require('mongoose');                  // mongoose for mongodb

module.exports = function(){
	mongoose.connect('mongodb://localhost:27017/express_practice');   // connect to mongoDB database on modulus.io
}
