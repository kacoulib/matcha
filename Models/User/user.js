'USE STRICT'

let dataValidator = require('../../Utils/dataValidator.js'),
		userDataValidator = require('../../Utils/userDataValidator.js'),
		queryValidator = require('../../Utils/queryValidator.js');

module.exports =
{
	all: (user, params, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			let { limit, offset, sort, distance, age, popularity} = params,
				{ lat, lng } = user,
				sex,
				sql = '';
			age = userDataValidator.convertAgeToDate(age || 18);

			if (!dataValidator.is_valid_db_id(limit) ||
				!dataValidator.is_valid_db_id(offset) ||
				!dataValidator.is_major(age))
					return (reject('Invalid limit or offset'));

			limit	 = parseInt(limit);
			offset = parseInt(offset);
			sort = queryValidator.match_order(sort || '');
			sex = queryValidator.match_sex(user)
			distance = distance || 50000;
			popularity = popularity || 0;

			console.log(user.login, age)
			sql += 'SELECT *, t.tag_name FROM (';
				sql += 'SELECT *, (';
					sql += '3959 * acos( cos( radians('+lat+') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('+lng+') ) + sin( radians('+lat+') ) * sin( radians( lat ) ) ) ';
					sql +=') AS distance ';
				sql += `FROM User WHERE age <= '${age}' AND popularity >= ${popularity} AND ${sex} `;
				sql += `AND login != '${user.login}' `;
				sql += 'HAVING distance <= '+ distance +' ';
				sql += 'ORDER BY '+ sort +' ';
			sql += ')';

			sql += 'as tmpUser LEFT JOIN Tag as t ON t.user_id = tmpUser.id';

			console.log(sql)

			// con.query('SELECT * FROM User WHERE gender IN (?) AND orientation IN (?) AND login != ? LIMIT ? OFFSET ?', [tmp[0], tmp[1], user.login, limit, offset], (err, user)=>
			con.query(sql, (err, user)=>
			{
					if (err)
					{
						console.log(err)
						return (reject(err));
					}

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

	findByLogin: (login, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			con.query('select * from User where login = ?', [login], (err, user)=>
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
		delete new_user.id;

		return new Promise((resolve, reject)=>
		{
			con.query('UPDATE User SET ? WHERE login = ?', [new_user, new_user.login], (err, user)=> (err ? reject(err) : resolve()));
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
