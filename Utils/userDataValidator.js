'use strict'

let  dataValidator = require('../Utils/dataValidator'),
		user_struct = require('../Models/User/struct/columns');



module.exports =
{
	tokenazableUser: (user)=> dataValidator.exclude_data(user_struct , user, ['password', 'is_lock', 'reset_pass', 'status']),

	cleanNewUser: (user)=>
	{
		user.popularity = 0;
		return dataValidator.exclude_data(user_struct , user, ['id', 'pic0', 'pic1', 'pic2', 'pic3', 'pic4', 'city', 'lng', 'lat']);
	},

	cleanSignInUser: (user)=> dataValidator.exclude_data(user_struct , user, ['id']),

	cleanUpdateUser: (user)=> dataValidator.extract_data_and_exclude(user_struct , user, ['id']),

	convertAgeToDate: (age) =>
	{
		let d,
		result;

		if (isNaN(age))
			return;

		d = new Date();
		age = parseInt(age);
		result = new Date(`${d.getDay()}/${d.getMonth()}/${d.getFullYear() - age}`);

		return (result.toJSON());
	}
}
