'use strict'

module.exports =
{
	tokenazableUser: (user)=>
	{
		return {
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
	},

	cleanNewUser: (user)=>
	{
		return {
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
	},

	cleanUpdateUser: (user)=>
	{
		return {
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			login: user.login,
			password: user.password,
			email: user.email,
			age: user.age,
			nb_image: user.nb_image,
			profile_image: user.profile_image,
			gender: user.gender,
			orientation: user.orientation,
			bio: user.bio,
			status: user.status,
			is_lock: user.is_lock,
			reset_pass: user.reset_pass
		}
	}
}
