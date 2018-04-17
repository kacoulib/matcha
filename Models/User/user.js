'USE STRICT'

let dataValidator = require('../../Utils/dataValidator.js');

function match_sex(user)
{
	let sql = '(';
    if (user.gender === 'male')
    {
      if (user.orientation === 'heterosexual')
        return ([['female', 'heterosexual'], ['female', 'heterosexual']]);
      else if (user.orientation === 'homosexual')
        return ([['male', 'homosexual'], ['male', 'homosexual']]);
      else if (user.orientation === 'bisexual')
        return ([['male', 'bisexual'], ['female', 'bisexual']]);
    }
    else if (user.gender === 'female')
    {
			if (user.orientation === 'heterosexual')
				return ([['male', 'heterosexual'], ['male', 'heterosexual']]);
			else if (user.orientation === 'homosexual')
				return ([['female', 'homosexual'], ['female', 'homosexual']]);
			else if (user.orientation === 'bisexual')
			{
				return ([['male', 'bisexual'], ['female', 'bisexual']]);
			}
    }
		else
		return false

    return (false);
}

module.exports =
{
	all: (user, limit, offset, con)=>
	{
		return new Promise((resolve, reject)=>
		{
			let tmp;

			if (!dataValidator.is_valid_db_id(limit) || !dataValidator.is_valid_db_id(offset))
				return (reject('Invalid limit or offset'));

			limit	 = parseInt(limit);
			offset = parseInt(offset);
			let lat = user.lat,
					lng = user.lng,
					radius = 2000;

					console.log(user)
					console.log(user.lat, user.lng)
					let sql = 'SELECT *, ( 3959 * acos( cos( radians('+lat+') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('+lng+') ) + sin( radians('+lat+') ) * sin( radians( lat ) ) ) ) AS distance FROM User HAVING distance < '+radius+' ORDER BY distance LIMIT 0 , 20';

			// con.query('SELECT * FROM User WHERE gender IN (?) AND orientation IN (?) AND login != ? LIMIT ? OFFSET ?', [tmp[0], tmp[1], user.login, limit, offset], (err, user)=>
			con.query(sql, (err, user)=>
			{
				console.log('sdsd');
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
