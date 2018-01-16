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
		console.log('home')
		res.send([{name:'test', passport: 'dsfd'}, {name:'toto', passport: 'toto'}]);
	})
	.put(['/', 'me'], (req, res) =>
	{}).delete(['/', '/me'], (req, res) =>
	{
		res.send('home swith home');
	});

	// =====================================
	// USER CRUD (with login links) ========
	// =====================================
	app.get('/all', (req, res) =>
	{
		User
		.find()
		// .skip(1)
		.limit(10)
		.exec((err, data)=>
		{
			if (err)
				throw err;
			res.send(data);
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
