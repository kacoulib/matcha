'use strict'
let	mongoose		= require('mongoose'),
	elasticSearch 	= require('elasticsearch'),
	Schema			= mongoose.Schema,
	userSchema,
	User;

// Schema
userSchema 	= new Schema(
{
	personal :
	{
		first_name: { type: String, lowercase: true, trim: true , required: true },
		last_name: { type: String, lowercase: true, trim: true , required: true },
		age: { type : Number, min : 18, max : 110, required: true },
		sex:
		{
			type : String,
			enum: ['male', 'female'],
			required: true
		},
		adress:
		{
			type : String,
			required : true
		},
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
		score: Number,
		viewers: [String],
		likers: [String]
	}
});

User		= mongoose.model('user', userSchema);


// Api
exports.create	= (user) =>
{
	let	newUser	= new User(user);

	newUser.save((err) =>
	{
		if (err)
			throw err;
	})
}

exports.find	= (search_terms) =>
{}

exports.update	= (user) =>
{
	let	newUser	= new User(user);

	newUser.save((err) =>
	{
		if (err)
			throw err;
	})
}

exports.delete	= (user_id) =>
{}