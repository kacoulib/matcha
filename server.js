'use strict'

const	express			= require('express'),
		session			= require('express-session'),
		app				= express(),
		admin			= express(),
		cookieParser	= require('cookie-parser'),
		bodyParser		= require('body-parser'),
		mongoose		= require('mongoose'),
		passport		= require('passport'),
		server			= require('http').createServer(app),
		socket			= require('socket.io')(server),
		database		= require('./Models/database.js');


// configuration ===============================================================

mongoose.connect(database.url, {useMongoClient: true})


// app.use((req, res,next)=>
// {

// 	res.setHeader('Access-Control-Allow-Origin',  'http://localhost:8080');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// });

// // set up our express application
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// // required for passport
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
	secret: '42-matcha secret SESSID',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: true }
}));

require('./Middlewares/auth.js')(passport);


// // routes ======================================================================
require('./Routes/users.js')(app, passport);


// // Messaging ======================================================================
socket.on('connection', function(data)
{
	// Sending message after bein connect
	socket.emit('message', {message: 'ok'})

	socket.on('newMessage', function(data)
	{
		console.log('messageSended')
	})

});


// Launch ======================================================================
app.listen(3000)// () => console.log('listening 3000'))