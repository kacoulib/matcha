'use strict'

module.exports =
{
	tokenazableUser: (user)=>
	{
		let u = {
			name: user.name,
			location: user.location,
			orientation: user.orientation,
			pictures: user.pictures,
			status: user.status,
			tags: user.tags,
			viewers: user.viewers,
			likers: user.likers,
			age: user.age,
			score: user.score,
			reset_pass: user.reset_pass,
			email: user.email,
			gender: user.gender,
			_id: user._id
		}

		return (u);
	},

	cleanNewUser: (user)=>
	{
		let u = {
			first_name: user.first_name,
			last_name: user.last_name,
			login: user.login,
			password: user.password,
			email: user.email,
			age: user.age,
			gender: user.gender,
			orientation: user.orientation,
		}

		return (u);
	}
}
