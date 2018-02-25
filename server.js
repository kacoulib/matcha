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
		io				= require('socket.io')(server),
		database		= require('./Models/database.js'),
		jwt				= require('jsonwebtoken');

// console.log(mysql)

// configuration ===============================================================

mongoose.connect(database.url, {useMongoClient: true}, (err)=>
{
	if (err)
		throw  err;
	console.log('connected')
})

require('./Middlewares/auth.js')(passport);

app.use((req, res,next)=>
{
	res.setHeader('Access-Control-Allow-Origin',  'http://localhost:3001');
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


// app.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.headers['authorization'];
//   if (!token) return next(); //if no token, continue

//   console.log('ok')
//   token = token.replace('Bearer ', '');

//   jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
//     if (err) {
//       return res.status(401).json({
//         success: false,
//         message: 'Please register Log in using a valid email to submit posts'
//       });
//     } else {
//       req.user = user; //set the user to req so other routes can use it
//       next();
//     }
//   });
// });

// let faker = require('faker');
// let	User			= require('./Models/user.js');

// let get_random = (max) => Math.floor(Math.random() * Math.floor(max));

// let data = {};
// let orientation = ['heterosexual', 'bisexual', 'homosexual'];
// let gender = ['male', 'female', 'other'];
// let tags = ['bio', 'geek', 'piercing', 'sport'],
// 	j = 0;
// 	for (var i = 0; i < 2; i++)
// 	{
// 		data.name = {first: faker.name.firstName(), last: faker.name.lastName()};
// 		data.email = faker.internet.email();
// 		data.age = faker.date.past();
// 		data.gender = gender[get_random(3)];
// 		data.profil_picture = faker.image.avatar();
// 		data.location = {};
// 		data.location.name = faker.address.streetAddress();
// 		data.location.loc = [faker.address.longitude(), faker.address.latitude()];
// 		data.orientation = orientation[get_random(3)];
// 		data.pictures = [data.profil_picture, faker.image.avatar(), faker.image.avatar(), faker.image.avatar()];
// 		data.tags = tags[get_random(4)];
// 		let newUser = new User(data);
// 		newUser.password = newUser.generateHash("test");
// 		newUser.save((err)=>
// 		{
// 			if (err)
// 				throw err;
// 			console.log('user ['+ j + '] created')
// 			j++;
// 		})
// 	}
// routes ======================================================================
require('./Routes/users.js')(app, passport);


// // Messaging ======================================================================

io.on('connect', function (socket)
{
	// Sending message after bein connect

	socket.on('newMessage', function(data)
	{
		socket.emit('message', {user_name: 'user 2', text: 'ok'})
	})
});


// Launch ======================================================================
server.listen(3000, () => console.log('listening 3000'))
