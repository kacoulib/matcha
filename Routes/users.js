'use strict'

const nodemailer	= require('nodemailer'),
			User				= require('../Models/User/user'),
			crypto			= require('crypto'),
			multer  		= require('multer'),
			jwt 				= require('../Middlewares/jwt.js'),
			dataUtils		= require('../Utils/dataValidator'),
			userUtils		= require('../Utils/userDataValidator'),
			uploadUtils	= require('../Utils/upload'),
			bcrypt			= require('bcrypt-nodejs');


var storage = multer.diskStorage({

  destination: function (req, file, cb)
	{
		if (!req.user || !req.user.login)
			return (false);

    cb(null, process.cwd() + '/www/src/public/img/profiles/'+req.user.login)
  },
  filename: function (req, file, cb)
	{
		let tmp = file.originalname.split('.'),
				len = tmp.length;

    cb(null, file.fieldname+'.'+tmp[len - 1])
  }
})

var upload = multer({ storage: storage, fileFilter: (req, file, cb)=>
{
	let tmp = file.originalname.split('.'),
			len = tmp ? tmp.length : 0;


	if (!tmp || isNaN(file.fieldname))
		return (cb(null, false));

	return (cb(null, true));
} })

function isAuthenticated(req,res,next)
{
	if (req.user)
		return next();
	else
		return res.status(401).json({sucess: false, message: 'User not authenticated'})
}

module.exports = function (app, passport, con)
{



	// =====================================
	app.get(['/', '/me'], upload.array('pictures', 5), (req, res) =>
	{
			res.json({sucess: true, user: req.user});
	})
	.post('/me/:id', upload.array('pictures', 5), (req, res, next) =>
	{
	})
	.put('/me/:id', uploadUtils.upload.any('pictures'), (req, res, next) =>
	{
		console.log(req.file)
		console.log(req.files)

		return (res.json({sucess: true, message: 'user updated'}));

		User.findById(req.params.id, (err, user) =>
		{
			if (err)
				throw err;

			user.age 			=	client_data.age			|| user.age;
			user.gender 		=	client_data.gender			|| user.gender;
			user.adresses 		= 	client_data.adresses		|| user.adresses;
			user.orientation	= 	client_data.orientation	|| user.orientation;
			user.location 		= 	client_data.location		|| user.location;
			user.name.first 	=	client_data.first		|| user.name.first;
			user.name.last 		=	client_data.last		|| user.name.last;
			user.bio 			=	client_data.bio			|| user.bio;
			user.email 			=	client_data.email			|| user.email;

			user.save((err) =>
			{
				if (err)
					throw err;
				res.json({sucess: true, message: 'user updated'});
			})
		})

	})


	// =====================================
	// SIGNUP ==============================
	// =====================================

	app.get('/user/all/', (req, res) =>
	{
		let params = {},
			key,
			queries = req.query;

		for (key in queries)
			params[key] = queries[key];

		User.all(req.user, params, con).then((users)=>
		{
				return (res.json({sucess: true, users: users}));
		})
		.catch((err)=>
		{
				return (res.status(401).json({sucess: false, message: err}));

		})
	})

	// =====================================
	// TOKEN  ==============================
	// =====================================
	app.post('/verify_token', (req, res, next) =>
	{
		let token = req.body.token;

		if (!token)
			return (res.status(401).json({sucess: false, message: 'Token not valid'}));

		jwt.verify(token, (err, tokenUser) =>
		{

			try
			{
				if (err)
					throw (err);

				res.json({
					sucess: true
				});
			}
			catch (e)
			{
				res.status(401).json({sucess: false, message: "Token not valid"})
			}
		})
	})

	app.get('/get_token/:token', (req, res, next) =>
	{
		let token = req.params.token;

		if (!token)
			return (res.status(401).json({sucess: false, message: 'User no found'}));

		jwt.verify(token, (err, tokenUser) =>
		{

			try
			{
				if (err)
					throw (err);

				//User.findById({_id: tokenUser._id}, (err, user) =>
				// {
				// 	let new_user;

				// 	if (err)
				// 		throw (err);

				// 	new_user = userUtils.getCleanUser(user);

				// 	res.json({
				// 		sucess: true,
				// 		user: new_user,
				// 		token: jwt.generateToken(new_user)
				// 	});
				// })

			}
			catch (e)
			{
				res.status(401).json({sucess: false, message: "Token can't be verified"})
			}
		})
	})

	/*	====================================
 		============= EMAIL ================
 		====================================  */

	app.post('/send_password_reset_mail', (req, res) =>
	{
		User.findOne({email: req.body.email}, (err, user)=>
		{
			if (err)
				throw err;
			if (!user)
				return (res.status(401).json({sucess: false, message: 'User no found'}));

			const transport = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
				    user: process.env.MAIL_ADDRR,
				    pass: process.env.MAIL_PASS
				}
			}),
			reset_key = crypto.randomBytes(25).toString('hex');

			transport.sendMail({
			    from: "kacoulib ✔ <kaoculib@student.42.fr>", // sender address
			    to: "coulibaly91karim@gmail.com", // list of receivers
			    subject: "Matcha password reset", // Subject line
			    html: "<b><a href='http://localhost:3001/pass_reset/"+ reset_key +"'>Link ✔</a></b>" // html body
			}, function(err, response)
			{
			    if(err)
			        throw err;

			        console.log("Message sent: " + response.message);


			    user.reset_pass = reset_key;
			    user.save((err)=>
			    {
			    	if (err)
			    		throw err;

					res.json({message: 'An email has been sent to you with an link.\nplease follow the link inside it.'});
			    })
			    transport.close();
			});
		})
	})

	app.post('/reset_pass', (req, res) =>
	{
		if (!req.body.reset_pass)
			return (res.status(401).json({sucess: false, message: 'User no found'}));

		User.findOne({reset_pass: req.body.reset_pass}, (err, user)=>
		{
			if (err)
				throw err;
			if (!user)
				return (res.status(401).json({sucess: false, message: 'User no found'}));

		    user.password = user.generateHash(req.password);
		    user.reset_pass = null;
		    user.save((err)=>
		    {
		    	if (err)
		    		throw err;

				res.json({sucess: true, message: 'User password update successfuly.'});
		    })
		})
	})


	/*	====================================
 		SIGN IN =================== SIGN out
		====================================  */

	app.post('/sign_in', (req, res, next) =>
	{
		passport.authenticate('local-signin', (err, user, errMessage)=>
		{
			if (err)
				return (res.status(401).json({sucess: false, err}));

			let new_user = userUtils.cleanSignInUser(user),
				token = jwt.generateToken(new_user);

			res.json({
				sucess: true,
				user: new_user,
				token: token
			})
		})(req, res, next);
	})


	app.get('/logout', function(req, res)
	{
		console.log((req.session.user ? req.session.user.name.first : '...') + ' logout')
		delete req.session.user;
		req.logout();
		// res.redirect('/');
		res.send('user logout successfuly');
	});

	/*	====================================
		============= USER CRUD ============
		====================================  */

	app.post('/user', (req, res, next) =>
	{
			passport.authenticate('local-signup', (err, user, errMessage) =>
			{

				if (err || errMessage)
				{
					console.log(err)
					console.log(errMessage)
					return (res.status(401).json({sucess: false, errMessage}));
				}

				let new_user = userUtils.tokenazableUser(user),
				token = jwt.generateToken(new_user);

				res.json({
					sucess: true,
					user: new_user,
					token: token
				})
			})(req, res, next);
	})
	.get('/user/:id', (req, res, next) =>
	{
		console.log('user id = ',req.params.id)
			User.findById(req.params.id, con).then((user)=>
			{
				console.log('found user = ',user)
					return (res.json({sucess: true, user: user}));
			})
			.catch((err)=>
			{
					return (res.status(401).json({sucess: false, message: err}));

			})
	})

	.put('/user', (req, res, next)=>
	{
		let new_user = userUtils.cleanUpdateUser(req.body);

		if (!dataUtils.is_update_user_valid(new_user))
			return (res.status(401).json({sucess: false, message: 'Invalid data'}));


		User.findByLogin(new_user.login, con)
		.then((user)=>
		{
			if (new_user.password)
				new_user.password = bcrypt.hashSync(new_user.password, bcrypt.genSaltSync(8));

			User.update(new_user, con)
			.then(()=>
			{
				User.findById(user[0].id, con).then((updated_user)=>
				{
					// console.log('before = ', updated_user)
					updated_user = userUtils.tokenazableUser(updated_user[0]);
					let token = jwt.generateToken(updated_user);

					res.json({
						sucess: true,
						user: updated_user,
						message: 'User updated',
						token: token
					})
				})
				.catch((err)=>{console.log(err);(res.status(401).json({sucess: false, message: 'Error while updating user.' }))})
			})
			.catch((err)=>(res.status(401).json({sucess: false, message: 'Error while updating user.' })))
		})
		.catch((user)=>(res.status(401).json({sucess: false, message: 'User not found.' })))
	})

	.delete('/user/:id', (req, res, next) =>
	{
			let id  = req.params.id;

			User.delete(id, con).then((user)=>
			{
					return (res.json({sucess: true, message: `User ${id} deteled`}));
			})
			.catch((err)=>
			{
					return (res.status(401).json({sucess: false, message: err}));
			})
	})
}
