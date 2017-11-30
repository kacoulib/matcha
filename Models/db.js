const	mongoose		= require('mongoose');

module.exports.mongoose = mongoose;

module.exports.connect = function (callback)
{
	mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds157833.mlab.com:57833/matcha', {
	  useMongoClient: true,
	})
	
	callback(mongoose.connection);
}

