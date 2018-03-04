'use strict'

module.exports =
{
	tokenazableUser: (user)=>
	{
		let u = {
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			login: user.login,
			email: user.email,
			age: user.age,
			nb_image: 0,
			profile_image: null,
			gender: user.gender,
			orientation: user.orientation,
			bio: '',
			status: 'online',
			is_lock: false,
			reset_pass: null,
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
			nb_image: 0,
			profile_image: null,
			gender: user.gender,
			orientation: user.orientation,
			bio: '',
			status: 'online',
			is_lock: false,
			reset_pass: null
		}

		return (u);
	}
}
