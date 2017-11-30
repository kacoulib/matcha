'use strict'

let 	app				= require('express').Router(),
		userDb			= require('../Models/user.js');


// Profile
app.get(['/', '/me'], (req, res) =>
{
	// user = userDb.find({id : req.session.user.id});
	res.send('home swith home');
})
.post(['/', '/me'], (req, res) =>
{
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
	res.send('user login');
})
.get('/logout', (req, res) =>
{
	res.send('user logout');
})
.post('/subscribe', (req, res) =>
{
	userDb.create(req.body);
	// console.log(req.body)
	res.send(req.body);
})


// Find
app.get('/:name', (req, res) =>
{
	res.send('user is = '+req.params.name);
})

module.exports = app;
