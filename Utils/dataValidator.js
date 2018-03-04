'use strict'

function is_major(age)
{
	if (!age)
		return (false);

	let minDate = new Date('1970-01-01 00:00:01'),
			maxDate = new Date('2038-01-19 03:14:07'),
			date = new Date(age);

	return (date > minDate && date < maxDate);
}

function is_valid_email(email)
{
	if (!email)
		return (false);

	return (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false)
}

function is_valid_db_id(id)
{
	if (isNaN(id)|| id < 0)
		return (false);

	return (true);
}

function is_valid_gender(gender)
{
	return (['female', 'male', 'other'].indexOf(gender) >= 0);
}

module.exports =
{
	is_major: is_major,

	is_valid_email: is_valid_email,

	is_valid_db_id:	is_valid_db_id,

	is_new_user_valid: (user) =>
	{
		let min_len = 4,
				required_fields = ['first_name', 'last_name', 'login', 'password', 'email', 'age', 'nb_image', 'profile_image', 'gender', 'orientation', 'bio', 'status', 'is_lock', 'reset_pass'],
				required_fields_len = required_fields.length,
				key;

		for (key in user)
		{
			if (user.hasOwnProperty(key))
			{
				switch (key)
				{
					case 'id':
						if (!is_valid_db_id(user[key]))
							return (false);
						break;
					case 'first_name':
					case 'last_name':
					case 'login':
					case 'password':
						if (user[key].length < min_len)
							return (false);
						break;
					case 'age':
						if (!is_major(user[key]))
							return (false);
						break;
					case 'email':
						if (!is_valid_email(user[key]))
							return (false);
						break;
					case 'gender':
						if (!is_valid_gender(user[key]))
							return (false);
						break;
					default:
						break;
				}
				required_fields_len--;
			}
		}

		return (required_fields_len == 0);
	}
}
