const	mysql	= require('mysql'),
		faker	= require('faker'),
		bcrypt	= require('bcrypt-nodejs'),
		NodeGeocoder = require('node-geocoder'),
		geocoder = NodeGeocoder(),
		utilis = require('../Utils/dataValidator.js');


var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: '42matcha'
});

con.connect(function(err)
{
	if (err)
		throw err;
})

let user_id = 1;
let create_x_len = 100;

	add_new_user();

	// add_new_location();

function get_random(max){ return Math.floor(Math.random() * Math.floor(max))};


function add_new_user()
{
	let val = [],
		sql,
		user,
		first,
		last,
		tag_list = ['sport', 'love', 'kiss'],
		tags = [],
		j = 0,
		orientation = ['heterosexual', 'bisexual', 'homosexual'],
		gender = ['male', 'female'];
		status = ['online', 'offline'];


		for (var i = 0; i < create_x_len; i++)
		{
			first = faker.name.firstName(),
			last = faker.name.lastName();
			user = [];
			user[0] 	= first
			user[1]		= last;
			user[2] 	= first+''+last;																					// login
			user[3]		= bcrypt.hashSync('test', bcrypt.genSaltSync(8), null);   // password
			user[4] 	= faker.internet.email();																	// email
			user[5] 	= faker.date.between(85, '2000-01-01');					// age
			user[6] 	= 5;																											// nb_image
			user[7] 	= gender[get_random(3)];																	// gender
			user[8] 	= orientation[get_random(3)];															// orientation
			user[9] 	= faker.lorem.paragraphs();																// bio
			user[10] 	= faker.image.avatar();																		// pic0
			user[11] 	= faker.image.avatar();																		// pic1
			user[12] 	= faker.image.avatar();																		// pic2
			user[13] 	= faker.image.avatar();																		// pic3
			user[14] 	= faker.image.avatar();																		// pic4
			user[15] 	= faker.address.city();																		// city
			user[16] 	= faker.address.longitude();															// long
			user[17] 	= faker.address.latitude();																// lat
			user[18] 	= status[get_random(2)];																	// status
			user[19] 	= 'false';																								// is_lock
			user[20] 	= 'null';																									// reset_pass
			val.push(user)

			// tag_list
			tags.push([i, tag_list[get_random(3)]]);

		}
		// lat FLOAT,
		// long FLOAT,


		sql = "INSERT INTO User (first_name, last_name, login, password, email, age, nb_image, gender, orientation, bio, pic0, pic1, pic2, pic3, pic4, city, lng, lat, status, is_lock, reset_pass) VALUES ?";
		con.query(sql, [val], function (err, res)
		{
			if (err)
				throw err;
			console.log(res.affectedRows, ' User created');


			sql = "INSERT INTO Tag (user_id, tag_name) VALUES ?";
			con.query(sql, [tags], function (err, res)
			{
				if (err)
					throw err;
					console.log(res.affectedRows, ' Tags created');

			});
		});
}

function add_new_tag(name)
{
	let tag_list = ['sport', 'love', 'kiss'],
		tags = [];

	for (var i = 0; i < create_x_len; i++)
		tags.push([i, tag_list[get_random(3)]]);


		sql = "INSERT INTO Tag (user_id, tag_name) VALUES ?";

		con.query(sql, [tags], function (err, res)
		{
			if (err)
				throw err;

			console.log("tag created");
			console.log(res);
		});
}

function add_new_img(nb = 1)
{

	sql = 'INSERT INTO Image (src) VALUES ?';

	con.query(sql, [[[faker.image.avatar()]]], function (err, res)
	{
		if (err)
			throw err;
		console.log("image created");
		console.log(res);
	});
}

function add_new_location()
{
		let sql = "INSERT INTO Location (address, lat, long, user_id) VALUES ?",
			add = [
				[faker.address.city(), faker.address.latitude(), faker.address.longitude(), user_id]
			];
			console.log(add)

			con.query(sql, [add], function (err, res)
			{
				if (err)
					throw err;
				user_id++;
			})
}


// console.log(add_new_location(1))
