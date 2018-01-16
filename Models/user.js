'use strict'
let	mongoose		= require('mongoose'),
	bcrypt			= require('bcrypt-nodejs'),
	Schema			= mongoose.Schema,
	userSchema;

// Schema
userSchema 	= new Schema(
{
	name:
	{
		first:
		{
			type: String,
			lowercase: true,
			trim: true,
			validate: (str) => str.indexOf('$') < 0
		},
		last:
		{
			type: String,
			lowercase: true,
			trim: true,
			validate: (str) => str.indexOf('$') < 0
		}
	},
	password:
	{
		type : String,
		required : true,
		alidate: (str) => str.length > 2, // change the min size
		index: {unique: true}
	},
	email:
	{
		type : String,
		required: true,
		index: {unique: true},
		validate:
		{
			validator: (email) =>  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email),
			message : 'Invalid adress mail'
		},
	},
	age:
	{
		type : Date,
		required: true
	},
	location:
	{
		name :
		{
			type : String,
			required : true
		},
		loc :
		{
			type : [Number],
			index: '2d',
			required : true
		}
	},
	gender:
	{
		type : String,
		enum: ['male', 'female', 'other'],
		required: true
	},
	orientation:
	{
		type : String,
		enum: ['heterosexual', 'bisexual', 'homosexual'],
		default : 'bisexual',
		required: true
	},
	bio: String,
	pictures:
	{
		type :[String],
		validate : (pics) => pics.length < 5
	},
	status:
	{
		type : [String], 
		enum: ['active', 'locked'],
		default: 'active'
	},
	profil_picture: String,
	tags:
	{
		type: [String],
		enum: ['bio', 'geek', 'piercing', 'sport']
	},
	viewers: [String],
	likers: [String]
});

userSchema.index({location : '2dsphere'});

userSchema.methods.generateHash = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password)
{

	if (password != null)
	{
	console.log(bcrypt.compareSync(password, this.password), '4')
	// return (false)
    	return bcrypt.compareSync(password, this.password);
	}
    else
    	return (false);
};

module.exports = mongoose.model('User', userSchema);
