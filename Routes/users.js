'use strict'

const User = require('../Models/user.js');


function isAuthenticated(req,res,next)
{
	if(req.user)
		return next();
	else
		return res.status(401).json({error: 'User not authenticated'})
}

module.exports = function (app, passport)
{
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get(['/', '/me'], (req, res) =>
	{
		User.findById('5a5e42abb755294740df95f7', (err, user)=>
		{
			if (err)
				throw err;
		
			res.send(user);
			
		})
	})
	.put('/me/:id', (req, res, next) =>
	{
		const client_data = req.body;

		User.findById(req.params.id, (err, user) =>
		{
			if (err)
				throw err;

			user.age 			=	client_data.age			|| user.age;
			user.gender 		=	client_data.gender			|| user.gender;
			user.adresses 		= 	client_data.adresses		|| user.adresses;
			user.orientation	= 	client_data.orientation	|| user.orientation;
			user.location 		= 	client_data.location		|| user.location;
			user.name.first 	=	client_data.first		|| user.name.first;
			user.name.last 		=	client_data.last		|| user.name.last;
			user.bio 			=	client_data.bio			|| user.bio;
			user.email 			=	client_data.email			|| user.email;

			if (client_data.new_password.length != 0)
			{
				if (client_data.new_password.length < 3)
					return (res.status(401).json({error: 'Password not valid'}));
				user.password = user.generateHash(client_data.new_password)
			}
			user.save((err) =>
			{
				if (err)
					throw err;
				res.send('user updated');
			})
		})

	}).delete(['/', '/me'], (req, res) =>
	{
		res.send('home swith home');
	});

	// =====================================
	// USER CRUD (with login links) ========
	// =====================================
	app.get('/user/all', (req, res) =>
	{
		User
		.find()
		.skip(1)
		.limit(10)
		.exec((err, data)=>
		{
			if (err)
				throw err;
			res.send(data);
		})
	})
	.get('/user/:id', (req, res, next) =>
	{
		// if (!req.session.test)
		// {
		// 	console.log('session test not set')
		// 	req.session.test = "this's my session test";
		// 	req.session.save((err)=>
		// 	{
		// 		if (err)
		// 			throw err;
		// 		console.log(req.session)
		// 	})
		// 	res.send('Not logged in')
		// }
		// else
		// 	console.log('session test set : '+ req.session.test)

		User.findById(req.params.id, (err, user) =>
		{
			if (err)
				throw err;
			res.send(user);
		})
	})

	// =====================================
	// SIGNUP ==============================
	// =====================================
	app.post('/sign_up', (req, res, next) =>
	{
		console.log(req.body)
		// passport.authenticate('local-signup',
		// {
		// 	successRedirect : '/profile',
		// 	failureRedirect : '/signup'
		// })
		passport.authenticate('local-signup', function(err, user, info) {
			console.log(err)
			console.log(user)
			console.log(info)
        	console.log("authenticate");
    	})(req, res, next);
	})

	/* to remove */app.post('/add_user', (req, res, next)=>
	{
		console.log('ok')
		next();
	})
	// =====================================
	// LOGIN ===============================
	// =====================================
	app.post('/sign_in', passport.authenticate('local-signin'))


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res)
	{
		req.logout();
		res.redirect('/');
	});





	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	app.put('/update/:id', (req, res) =>
	{})
	app.get('/:id', (req, res) =>
	{})


	// =====================================
	// LOGOUT ==============================
	// =====================================

}
