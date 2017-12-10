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
		route.use((req, res,next)=>
		{

			res.setHeader('Access-Control-Allow-Origin',  'http://localhost:8080');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			next();
		});
		route.use(cookieParser());
		route.use(bodyParser.urlencoded({extended: true}));
	})

	app.use('/', auth.isUserAuth, require('./routes/index.js'));
	admin.use('/admin', auth.isAdminAuth, require('./routes/admin/index.js'));
})

app.listen(3000, () => console.log('listening 3000'))
