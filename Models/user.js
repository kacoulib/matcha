'use strict'
let	mongoose		= require('mongoose'),
	Schema			= mongoose.Schema,
	ObjectId 		= Schema.Types.ObjectId,
	userSchema;

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
	status:
	{
		type : [String], 
		required : true,
		enum: ['active', 'locked'],
		default: 'active'
	},
	profil_picture: String,
	tags: [ObjectId],
	viewers: [String],
	likers: [String]
});


exports.User = mongoose.model('User', userSchema);