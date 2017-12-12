'use strict'

const	express			= require('express'),
		session			= require('express-session'),
		app				= express(),
		admin			= express(),
		db				= require('./Models/db'),
		cookieParser	= require('cookie-parser'),
		dotenv			= require('dotenv').config(),
		bodyParser		= require('body-parser'),
		passport		= require('passport'),
		// localStrategy 	= require('passport-local').Strategy,
		server			= require('http').createServer(app),
		socket			= require('socket.io')(server);


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
		// route.use(session({
		// 	secret: '42-matcha secret SESSID',
		// 	resave: false,
		// 	saveUninitialized: true,
		// 	cookie: { secure: true }
		// }));
		route.use(bodyParser.urlencoded({extended: true}));
		// route.use(passport.initialize());
		// route.use(passport.session());

	})
	app.use('/', require('./routes/index.js'));
	// Passport
	require('./Middlewares/auth.js')(passport);

})

socket.on('connection', function(data)
{
	// Sending message after bein connect
	socket.emit('message', {message: 'ok'})

	socket.on('newMessage', function(data)
	{
		console.log('messageSended')
	})

	console.log('connected')
});
server.listen(3000, () => console.log('listening 3000'))