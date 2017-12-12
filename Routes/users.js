'use strict'

let 	app				= require('express').Router(),
		elasticSearch 	= require('elasticsearch'),
		db				= require('../Models/user.js'),
		passport		= require('passport'),
		User = db.User;


// My Profile
app.get(['/', '/me'], (req, res) =>
{
	// user = db.find({id : req.session.user.id});
	// res.jsonp(JSON.stringify({'user' : 'user subscribe'}))

	res.send('home sweet home');
})
.put(['/', 'me'], (req, res) =>
{})
.get('/all', (req, res) =>
{
	User.find({}, (err, users)=>
	{
		if (err)
			throw err;

		res.send(users);
		return;
	})
}).delete(['/', '/me'], (req, res) =>
{
	res.send('home swith home');
});


// Login
app.get('/sign_in', passport.authenticate('local',
{
	successRedirect: '/',
	failureRedirect: '/sign_in',
	failureFlash: true
}))
.post('/sign_in', passport.authenticate('local',
{
	successRedirect: '/',
	failureRedirect: '/sign_in',
	failureFlash: true
}))
.get('/aut/google', (req, res) =>
{
	console.log(req)
	res.send('user login');
})
.get('/sign_out', (req, res) =>
{
	res.send('user logout');
})
.post('/subscribe', (req, res) =>
{
	let	newUser	= new User(req.body);

	newUser.save((err) =>
	{
		if (err)
		{
			res.status(500).send('Error when creating user');
			throw err;
			return ;
		}
		res.send('user subscribed');
	})
})


// Others Profile
app.put('/update/:id', (req, res) =>
{
	let key;

	if (req.params.id)
	{
		// console.log(req[body])
		User.findById(req.params.id, (err, update_user) =>
		{
			if (err)
			{
				res.status(500).send('Unknown user');
				throw err;
			}

			for (key in req.body)
				update_user[key] = req.body[key];
			update_user.save((err)=>
			{
				if (err)
				{
					res.status(500).send('C\'ant save the user');
					throw err;
				}
				res.send('user saved');
			})

		})
	}
})
app.get('/:id', (req, res) =>
{
	User.findById(req.params.id, (err, user) =>
	{
		if (err)
		{
			res.status(500).send('user not found');
			throw err;
			return ;
		}
		res.send(user);
	})
})

module.exports = app;