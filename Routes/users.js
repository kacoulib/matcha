'use strict'

let 	app				= require('express').Router(),
		db				= require('../Models/user.js'),
		user;


// Profile
app.get(['/', '/me'], (req, res) =>
{
	// user = db.find({id : req.session.user.id});
	// res.jsonp(JSON.stringify({'user' : 'user subscribe'}))

	res.send('home sweet home');
})
.post('/test', (req, res) =>
{
	console.log(req.body)
	res.send('home test');
})
.post(['/', '/me'], (req, res) =>
{
	console.log(req.body)
	res.send('home swith home');
})
.put(['/', '/me'], (req, res) =>
{
	res.send('home swith home');
}).delete(['/', '/me'], (req, res) =>
{
	res.send('home swith home');
});


// Login
app.get('/login', (req, res) =>
{
	console.log(req)
	res.send('user login');
})
.get('/logout', (req, res) =>
{
	res.send('user logout');
})
.post('/subscribe', (req, res) =>
{
	console.log(req.body)
	let data = db.create(req.body);
	if (!data)
		data = 'user subscribe';
	res.send(data);
})


// Find
app.get('/:name', (req, res) =>
{
	res.send('user is = '+req.params.name);
})

module.exports = app;
