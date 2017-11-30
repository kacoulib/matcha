<<<<<<< HEAD
'use strict'
let	mongoose		= require('mongoose'),
	elasticSearch 	= require('elasticsearch'),
	Schema			= mongoose.Schema,
	ObjectId 		= Schema.Types.ObjectId,
	userSchema,
	User;
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds157833.mlab.com:57833/matcha', {
	  useMongoClient: true,
	})
mongoose.set('debug', true); // to remove
// Schema
userSchema 	= new Schema(
{
	personal :
	{
		first_name:
		{
			type: String,
			lowercase: true,
			trim: true,
			required: true,
			validate: (str) => str.indexOf('$') < 0
		},
		last_name:
		{
			type: String,
			lowercase: true,
			trim: true,
			required: true,
			validate: (str) => str.indexOf('$') < 0
		},
		age:
		{
			type : Number,
			min : 18,
			max : 110,
			required: true 
		},
		sex:
		{
			type : String,
			enum: ['male', 'female'],
			required: true
		},
		adresses:
		[{
			type : String,
			required : true
		}],
		orientation:
		{
			type : String,
			enum: ['heterosexual', 'bisexual', 'homosexual'],
			required: true
		},
		bio: String,
		email:
		{
			type : String,
			required: true,
			unique: true,
			validate: (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
		},
		pictures:
		{
			type :[String],
			validate : (pics) => pics.length < 5
		},
		profil_picture: String,
	},
	public : 
	{
		tags: [String],
		viewers: [String],
		likers: [String]
	}
}, { bufferCommands: false });

User		= mongoose.model('User', userSchema);


// Api
exports.create	= (userData) =>
{
	let	newUser	= new User(userData);

	 console.log(mongoose);
	 var promise = newUser.save();
	 promise.then((err) =>
	{
	 	console.log("sending user");
		if (err)
			throw err;
	})
 console.log("after sending user");

}

exports.find	= (search_terms) =>
{}

exports.update	= (userData) =>
{
	let	newUser	= new User(userData);

	newUser.save((err) =>
	{
		if (err)
			throw err;
	})
}

exports.delete	= (user_id) =>
{
	User.findOne({})
=======
'use strict'
let	mongoose		= require('mongoose'),
	elasticSearch 	= require('elasticsearch'),
	Schema			= mongoose.Schema,
	ObjectId 		= Schema.Types.ObjectId,
	userSchema,
	User;

// Schema
userSchema 	= new Schema(
{
	first_name:
	{
		type: String,
		lowercase: true,
		trim: true,
		required: true,
		validate: (str) => str.indexOf('$') < 0
	},
	last_name:
	{
		type: String,
		lowercase: true,
		trim: true,
		required: true,
		validate: (str) => str.indexOf('$') < 0
	},
	age:
	{
		type : Number,
		min : 18,
		max : 110,
		required: true 
	},
	sex:
	{
		type : String,
		enum: ['male', 'female'],
		required: true
	},
	adresses:
	[{
		type : String,
		required : true
	}],
	orientation:
	{
		type : String,
		enum: ['heterosexual', 'bisexual', 'homosexual'],
		required: true
	},
	bio: String,
	email:
	{
		type : String,
		required: true,
		unique: true,
		validate: (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
	},
	pictures:
	{
		type :[String],
		validate : (pics) => pics.length < 5
	},
	profil_picture: String,
	tags: [ObjectId],
	viewers: [String],
	likers: [String]
});

User		= mongoose.model('User', userSchema);


// Api
exports.create	= (userData) =>
{
	let	newUser	= new User(userData);

	// console.log(userData);
	newUser.save((err) =>
	{
		if (err)
			throw err;
	})
}

exports.find	= (search_terms) =>
{}

exports.update	= (userData) =>
{
	let	newUser	= new User(userData);

	newUser.save((err) =>
	{
		if (err)
			throw err;
	})
}

exports.delete	= (user_id) =>
{
	User.findOne({})
>>>>>>> dc96621d39dee5c67817c9b34ee3a7d3b080879d
}