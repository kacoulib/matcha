"STRICT MODE"

let localStrategy	= require('passport-local').Strategy,
		User = require('../Models/user.js'),
		userUtils			= require('../Utils/userDataValidator'),
		dataUtils			= require('../Utils/dataValidator'),
		bcrypt				= require('bcrypt-nodejs');


module.exports = function (passport, con)
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
        User.findById(id, con)
					.then((user)=>next(null, user))
					.catch((err)=> next(err, null));
    });


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
	passport.use('local-signin', new localStrategy(
	{
		usernameField: 'loginOrEmail',
		passwordField: 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback

	},
	function(req, loginOrEmail, password, next)
	{
		User.findByLoginOrEmail(loginOrEmail, loginOrEmail, con)
		.then((user)=>
		{
			if (!user)
				return next(null, false, { message: 'Incorrect login or email.' });

				bcrypt.hashSync(new_user.password, bcrypt.genSaltSync(8), null)
			if (!(user[0].password == password))
				return next(null, false, 'Oops! Wrong password.');
			return next(null, user[0]);
		})
		.catch((err)=>next(err))
	}));

    // =========================================================================
    // LOCAL Register =============================================================
    // =========================================================================
	passport.use('local-signup', new localStrategy(
	{
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true,
		session: false
	},
	function(req, email, password, next)
	{
		// asynchronous
		// User.findOne wont fire unless data is sent back
		process.nextTick(function()
		{
			// create the user
			let new_user = userUtils.cleanNewUser(req.body);

			if (!dataUtils.is_new_user_valid(new_user))
				return next(null, false, 'Invalid data');

			User.findByLoginOrEmail(new_user.login, new_user.email, con)
			.then((err)=>{next(null, false, { message: 'The email or login provided is already taken.' })})
			.catch((user)=>
			{
				new_user.status = 'online';

				bcrypt.hash(new_user.password, bcrypt.genSaltSync(8), null, (err, salt)=>
				{
					if (err)
						return next(null, false, { message: 'Error.' });

						new_user.password = salt;

					// save the new user
					User.add(new_user, con)
					.then((new_user_id)=>
					{
						new_user.id = new_user_id;

						return next(null, new_user);
					})
					.catch((e)=> next(null, false, { message: 'User insertion Error.' }));
				})
			})
		});
	}))
}
