'use strict'

let dataValidator = require('../Utils/dataValidator.js');

module.exports =
{
	all: (con)=>
	{
		return new Promise((resolve, reject)=>
		{
			con.query(' SELECT id, first_name, last_name, login, email, age, nb_image, profile_image, gender, orientation, bio, status, is_lock, reset_pass FROM User', (err, user)=>
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
			if (!dataValidator.is_valid_db_id(id))
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

	findByLoginOrEmail: (login, email, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			con.query('select * from User where login = ? or email = ?', [login, email], (err, user)=>
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

	update: (new_user, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			con.query('UPDATE User SET ? WHERE email = :email', {new_user}, (err, user)=> (err ? reject(err) : resolve(user.insertId)));
		})
	},

	delete: (id, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			if (!dataValidator.is_valid_db_id(id))
				return reject('Not a valid user');

			con.query('DELETE FROM User WHERE id = ?', [id], (err, user)=>(err || user.affectedRows < 1 ? reject(err) : resolve(user.insertId)));
		})
	},
};
