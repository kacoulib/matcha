'use strict'

const User = require('../Models/user.js'),
	nodemailer = require('nodemailer'),
	crypto		= require('crypto'),
	multer  = require('multer'),
	upload = multer({dest: './'});


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
	app.get('/test', (req, res) =>
	{
		let r;

		if (req.session.user)
			r = req.session.user.name.first + ' already set';
		else
			r = 'session user not set';
		console.log(r)
		res.send(r);
			
	})
	// =====================================
	app.get(['/', '/me'], (req, res) =>
	{
		User.findById('5a5e42abb755294740df95f7', (err, user)=>
		{
			if (err)
				throw err;
			if (req.session.user)
				console.log(req.session.user.name.first + ' already set')
			else
				// console.log('user not set')
			{
				req.session.user = user;
				console.log(req.session.user.name.first + ' set')
			}
				// console.log(req.session)
			res.send(user);
			
		})
	})
	.put('/me/:id', (req, res, next) =>
	{
		upload.array('pictures')
		const client_data = req.body;
		console.log(req.file)
		console.log(req.body)
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
	app.post('/sign_in', (req, res, next) =>
	{
		passport.authenticate('local-signin', function(err, user, info)
		{
			if (err)
				throw err;
			if (info)
				return (res.status(401).json({error: info}));
			 if (req.session.user)
			 {
	        	console.log("already signin");

				// console.log(req.session)
			}
			else
			{
	        	console.log('user ' +user.name.first + " signin");
			}
			// console.log(req.session)
        	res.send('user login successfuly')
		})(req, res, next);
	})


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res)
	{
		console.log((req.session.user ? req.session.user.name.first : '...') + ' logout')
		delete req.session.user;
		req.logout();
		// res.redirect('/');
		res.send('user logout successfuly');
	});

	app.post('/send_password_reset_mail', (req, res) =>
	{
		User.findOne({email: req.body.email}, (err, user)=>
		{
			if (err)
				throw err;
			if (!user)
				return (res.status(401).json({error: 'User no found'}));

			const transport = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
				    user: process.env.MAIL_ADDRR,
				    pass: process.env.MAIL_PASS
				}
			}),
			reset_key = crypto.randomBytes(25).toString('hex');

			transport.sendMail({
			    from: "kacoulib ✔ <kaoculib@student.42.fr>", // sender address
			    to: "coulibaly91karim@gmail.com", // list of receivers
			    subject: "Matcha password reset", // Subject line
			    html: "<b><a href='http://localhost:3001/pass_reset/"+ reset_key +"'>Link ✔</a></b>" // html body
			}, function(err, response)
			{
			    if(err)
			        throw err;

			        console.log("Message sent: " + response.message);


			    user.reset_pass = reset_key;
			    user.save((err)=>
			    {
			    	if (err)
			    		throw err;

					res.json({message: 'An email has been sent to you with an link.\nplease follow the link inside it.'});
			    })
			    transport.close();
			});
		})
	})

	app.post('/reset_pass', (req, res) =>
	{
		if (!req.body.reset_pass)
			return (res.status(401).json({error: 'User no found'}));

		User.findOne({reset_pass: req.body.reset_pass}, (err, user)=>
		{
			if (err)
				throw err;
			if (!user)
				return (res.status(401).json({error: 'User no found'}));

		    user.password = user.generateHash(req.password);
		    user.reset_pass = null;
		    user.save((err)=>
		    {
		    	if (err)
		    		throw err;

				res.json({message: 'User password update successfuly.'});
		    })
		})
	})


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
