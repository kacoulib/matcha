'use strict'

function isAuthenticated(req,res,next)
{
	if(req.user)
		return next();
	else
		return res.status(401).json({error: 'User not authenticated'})
}

module.exports = function (app, passport)
{
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get(['/', '/me'], (req, res) =>
	{
		console.log('home')
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
	// LOGIN ===============================
	// =====================================
	app.get('/sign_in', passport.authenticate('local',
	{
		successRedirect: '/',
		failureRedirect: '/sign_in'
	}))
	.post('/sign_in', passport.authenticate('local-signin'))


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res)
	{
		req.logout();
		res.redirect('/');
	});





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
