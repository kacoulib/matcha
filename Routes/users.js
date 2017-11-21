'use strict'

let 	app				= require('express').Router(),
		db				= require('../Models/user.js'),
		user;


// Profile
app.get(['/', '/me'], (req, res) =>
{
	// user = db.find({id : req.session.user.id});
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
.get('/subscribe', (req, res) =>
{
	db.create();
	res.send('user subscribe');
})


// Find
app.get('/:name', (req, res) =>
{
	res.send('user is = '+req.params.name);
})

module.exports = app;
