'use strict'
let	mongoose		= require('mongoose'),
	bcrypt			= require('bcrypt-nodejs'),
	Schema			= mongoose.Schema,
	ObjectId 		= Schema.Types.ObjectId,
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
	[{
		type : String,
		required : true,
		index: {unique: true}
	}],
	email:
	{
		type : String,
		required: true,
		index: {unique: true},
		validate:
		{
			validator: (email) =>  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email),
			message : 'unvalid adress mail'
		},
	},
	age:
	{
		type : Number,
		min : 18,
		max : 110,
	},
	adresses:
	[{
		type : String,
		required : true
	}],
	gender:
	{
		type : String,
		enum: ['male', 'female'],
		required: true
	},
	orientation:
	{
		type : String,
		enum: ['heterosexual', 'bisexual', 'homosexual'],
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
	tags: [ObjectId],
	viewers: [String],
	likers: [String]
});

userSchema.methods.generateHash = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password)
{
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
