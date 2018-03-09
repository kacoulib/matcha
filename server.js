'use strict'

const	express			= require('express'),
		session				= require('express-session'),
		mysql					= require('mysql'),
		app						= express(),
		admin					= express(),
		cookieParser	= require('cookie-parser'),
		bodyParser		= require('body-parser'),
		passport			= require('passport'),
		server				= require('http').createServer(app),
		io						= require('socket.io')(server),
		jwt						= require('jsonwebtoken');



// Database login ==============================================================

require('dotenv').config();

let con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

con.connect(function(err)
{
	if (err)
		throw err;

	console.log('Database connected');

	// configuration ===============================================================

	require('./Middlewares/auth.js')(passport, con);

	app.use((req, res,next)=>
	{
		//res.setHeader('Access-Control-Allow-Origin',  'http://localhost:3001');
		res.setHeader('Access-Control-Allow-Origin',  '*');
		res.header('Access-Control-Allow-Credentials', true);
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		next();
	});


	// set up our express application
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());

	// required for passport
	app.use(session(
	{
		secret: 'theMatchaSuperSessionSESSid0rNot',
		resave: false,
		saveUninitialized: true,
		cookie:
		{
			secure: false,
			maxAge: 1000 * 60 * 60 * 24
		}
	}));
	app.use(passport.initialize());
	app.use(passport.session());


	app.use(function(req, res, next)
	{
	   // check header or url parameters or post parameters for token
	   var token = req.headers['authorization'];
	   if (!token) return next(); //if no token, continue

	   console.log('ok')
	   token = token.replace('Bearer ', '');

	   jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
	     if (err) {
	       return res.status(401).json({
	         success: false,
	         message: 'Please register Log in using a valid email to submit posts'
	       });
	     } else {
	       req.user = user; //set the user to req so other routes can use it
	       next();
	     }
	   });
	});

	// routes ====================================================================
	require('./Routes/users.js')(app, passport, con);


	// Messaging =================================================================

	io.on('connect', function (socket)
	{
		// Sending message after bein connect

		socket.on('newMessage', function(data)
		{
			socket.emit('message', {user_name: 'user 2', text: 'ok'})
		})
	});
})



// Launch ======================================================================
server.listen(3000, () => console.log('listening 3000.....'))
