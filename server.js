'use strict'

const express			= require('express'),
		app				= express(),
		admin			= express(),
		db				= require('./Models/db'),
		cookieParser	= require('cookie-parser'),
		dotenv			= require('dotenv').config(),
		bodyParser		= require('body-parser'),
		auth 			= require('./Middlewares/auth.js');


db.connect(() => 
{
	[app, admin].forEach((route) => 
	{
		route.use(cookieParser());
		route.use(bodyParser.urlencoded({extended: true}));
	})

	app.use('/', auth.isUserAuth, require('./routes/index.js'));
	admin.use('/admin', auth.isAdminAuth, require('./routes/admin/index.js'));
})

app.listen(3000, () => console.log('listening 3000'))
