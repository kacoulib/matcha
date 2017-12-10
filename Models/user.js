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
	gender:
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
		assert.equal(error.errors['name'].message,
        'Path `name` is required.');
		if (err)
		{
			throw err.errors['name'];
			return (err);
		}
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
}