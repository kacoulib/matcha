'use strict'

module.exports =
{
	all: (con)=>
	{
		return new Promise((resolve, reject)=>
		{
			con.query(' SELECT first_name, last_name, login, password, email, age, nb_image, profile_image, gender, orientation, bio, status, is_lock, reset_pass FROM User', (err, user)=>
			{
					if (err)
						return (reject(err));

					return (resolve(user));
			})
		})
	},

	findById: (id, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			if (isNaN(id))
				return reject('Not a valid user');

			con.query('SELECT * FROM User WHERE id = ?', [id], (err, user)=>
			{
					if (err)
						return (reject(err));
					if (!user[0])
					return (reject('No user found'));

					return (resolve(user));
			})
		})
	},

	findByLoginOrEmail: (email, login, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			con.query('select * from User where email = ? or login = ?', [email, login], (err, user)=>
			{
					if (err)
						return (reject(err));
					if (!user[0])
						return (reject('No user found'));

					return (resolve(user));
			})
		})
	},

	add: (new_user, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			con.query('INSERT INTO User SET ?', new_user, (err, user)=> (err ? reject(err) : resolve(user.insertId)));
		})
	},
};
