let 
	User			= require('../Models/user.js'),
	localStrategy	= require('passport-local').Strategy,
	saltRounds		= 10;


module.exports = function (passport)
{
	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    passport.serializeUser(function(user, next)
    {
        next(null, user.id);
    });

    passport.deserializeUser(function(id, next)
    {
        User.findById(id, function(err, user) {
            next(err, user);
        });
    });


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
	passport.use('local-signin', new localStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback

	},
	function(req, email, password, next)
	{
		console.log(req.user)
		User.findOne({ 'email': email }, function(err, user)
		{
				console.log('0')
			if (err)
				return next(err);

				console.log('1')
			if (!user)
				return next(null, false, { message: 'Incorrect email.' });
				console.log('2')
				
				console.log('3')
			if (!user.validPassword(password))
				return next(null, false, 'Oops! Wrong password.');

			req.logIn(user, function (err)
			{
				if (err)
					return next(err);
				console.log('User login succefully');
				console.log(user);
				console.log('-------------');
				return next(null, user);
			})
		});
	}));

    // =========================================================================
    // LOCAL Register =============================================================
    // =========================================================================
	passport.use('local-signup', new localStrategy(
	{
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, next)
	{

		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function()
		{
			User.findOne({ 'email' :  email }, function(err, user)
			{
				// if there are any errors
				if (err)
					return next(err);

				// if theres email exist
				if (user)
					return next(null, false, 'That email is already taken.');

				// if there is no user with that email
				// create the user
				let newUser	= new User(
				{
					age			: req.body.age,
					gender		: req.body.gender,
					adresses	: req.body.adresses,
					orientation	: req.body.orientation,
					location	: req.body.location,
					bio			: req.body.bio,
					email		: req.body.email
				});

				newUser.password = newUser.generateHash(password)

				// save the new user
				newUser.save(function(err)
				{
					if (err)
						throw err;
					return next(null, newUser);
				});
			});    
		});
	}))
}