let 
	User			= require('../Models/user.js'),
	localStrategy	= require('passport-local').Strategy,
	saltRounds		= 10;


module.exports = function (passport)
{
	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    passport.serializeUser(function(user, done)
    {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done)
    {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

console.log('haha')

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
	passport.use('local-signup', new localStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
        // passReqToCallback : true 
	},
	function(email, password, next)
	{
			console.log("---------------")
			// console.log(req)
		User.findOne({ 'email': email }, function(err, user)
		{
				console.log('0')
			if (err)
				return next(err);

				console.log('1')
			if (!user)
				return next(null, false, { message: 'Incorrect email.' });
				console.log('2')
				
				console.log('password= '+password)
			if (!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			else
				return done(null, user);
			// console.log(email +' '+ password)
		});
	}));

}