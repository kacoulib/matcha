const	mongoose		= require('mongoose');

module.exports.mongoose = mongoose;

module.exports.connect = function (callback)
{
	mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds135156.mlab.com:35156/42matcha', {
	  useMongoClient: true,
	})
	
	callback(mongoose.connection);
}

