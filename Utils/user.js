'use strict'

module.exports =
{
	getCleanUser: (user)=>
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
			score: user.score,
			reset_pass: user.reset_pass,
			email: user.email,
			gender: user.gender,
			_id: user._id
		}

		return (u);
	}
}