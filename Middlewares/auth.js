"STRICT MODE"

let localStrategy	= require('passport-local').Strategy,
		userUtils			= require('../Utils/user'),
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
        con.query("select * from User where id = "+id, (err,rows)=> next(err, user));
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
		con.query('select * from User where email = ? or login = ?', [loginOrEmail, loginOrEmail], (err, rows)=>
		{
			if (err)
				return next(err);

			if (!rows)
				return next(null, false, { message: 'Incorrect login or email.' });

			if (!(rows[0].password == password))
				return next(null, false, 'Oops! Wrong password.');

				if (err)
					return next(err);

				return next(null, rows[0]);
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
			con.query('select * from User where email = ? or login = ?', [new_user.email, new_user.login], (err, rows)=>
			{
				// if there are any errors
				if (err)
					return next(err);

				// if theres email exist
				if (rows[0])
				{
					console.log('already exist')
					return next(null, false, 'That email is already taken.');
				}

				new_user.status = 'online';
				new_user.password = bcrypt.hashSync(new_user.password, bcrypt.genSaltSync(8), null);

				// save the new user
				con.query('INSERT INTO User SET ?', new_user, (err, new_inserted_user)=>
				{
					if (err)
						throw err;
						new_user.id = new_inserted_user.insertId;

					console.log('User succefully create');
					return next(null, new_user);
				});
			});
		});
	}))
}
