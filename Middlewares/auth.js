module.exports.isUserAuth = (req, res, next) =>
{
	if (true)
		return (next());

	res.redirect('/');
}

module.exports.isAdminAuth = (req, res, next) =>
{
	if (true)
		return (next());

	res.redirect('/');
}