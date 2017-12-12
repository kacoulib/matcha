let db				= require('../Models/user.js'),
	localStrategy	= require('passport-local').Strategy;
	User			= db.User;



module.exports = function (passport)
{
    // Serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    console.log('haha')
    // Deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	passport.use(new localStrategy(
	{
		passReqToCallback : true
	},
	function(req, username, password, done)
	{
		console.log(password)
		User.findOne({ username: username }, function(err, user)
		{
			if (err)
				return done(err);
			if (!user)
				return done(null, false, { message: 'Incorrect username.' });
			if (!user.validPassword(password))
				return done(null, false, { message: 'Incorrect password.' });
			return done(null, user);
		});
	}
));

}