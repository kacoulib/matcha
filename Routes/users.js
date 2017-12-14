'use strict'

module.exports = function (app, passport)
{
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get(['/', '/me'], (req, res) =>
	{

		res.send('home sweet home');
	})
	.put(['/', 'me'], (req, res) =>
	{})
	.get('/all', (req, res) =>
	{

		res.send('ok')
	}).delete(['/', '/me'], (req, res) =>
	{
		res.send('home swith home');
	});


	// =====================================
	// LOGIN ===============================
	// =====================================
	app.get('/sign_in', passport.authenticate('local',
	{
		successRedirect: '/',
		failureRedirect: '/sign_in'
	}))
	.post('/sign_in', passport.authenticate('local-signup'))
	//	.post('/sign_in', (req, res, next) =>
	// {
	// 	console.log('-----------')
	// 	passport.authenticate('local-signup', (err, user, info) =>
	// 	{
	// 		console.log(info)
	// 	})(req, res, next)
	// })


	// =====================================
	// SIGNUP ==============================
	// =====================================
	app.get('/sign_up', passport.authenticate('local',
	{
		successRedirect: '/',
		failureRedirect: '/sign_up'
	}))
	.post('/sign_up', passport.authenticate('local-signup',
	{
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}))


	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	app.put('/update/:id', (req, res) =>
	{})
	app.get('/:id', (req, res) =>
	{})


	// =====================================
	// LOGOUT ==============================
	// =====================================

}
