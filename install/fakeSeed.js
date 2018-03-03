const	mysql	= require('mysql'),
		faker	= require('faker'),
		bcrypt	= require('bcrypt-nodejs'),
		NodeGeocoder = require('node-geocoder'),
		geocoder = NodeGeocoder(),
		utilis = require('../Utils/dataValidator.js');


var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "42matcha"
});

con.connect(function(err)
{
	if (err)
		throw err;
})

// 	let sql, val;
// 	console.log("Connected!");

let post = {
	first_name : 'toto',
	last_name : 'tata',
	login : 'myLogin',
	password : 'test',
	email : 'toto@toto.com',
	age : 'Wed Mar 01 2000 00:00:00 GMT+0100',
	nb_image : 0,
	profile_image : null,
	gender : 'male',
	orientation : 'heterosexual',
	bio : 'klsdjfsd fjlfjdsjf sdfjmsdjfldksjfdslkmfjmj dfs',
	status : 'offline'
}

if (!utilis.isMajor(post.age))
	return ;

// Delete
con.query("DELETE FROM User WHERE login = ?", ['myLogin'], (err, res, fields)=>
{
	if (err)
		throw err;

		console.log(res)
		console.log(fields)
})


//con.query("INSERT INTO User SET ?", post, (err, res, fields)=>
//{
//	if (err)
//		throw err;

//		console.log(res)
//		console.log(fields)
//})



    // val = add_new_user(1);

// image
    // sql = "INSERT INTO Image (src) VALUES ?",
    // val = add_new_img(1);

// location
    // sql = "INSERT INTO Location (address, lat, long, user_id) VALUES ?",
    // val = add_new_img(1);


//     console.log(val)
// return ;
// 	con.query(sql, [val], function (err, res)
// 	{
// 		if (err)
// 			throw err;
// 		console.log("Database created");
// 		console.log(res);
// 	});
// });


let get_random = (max) => Math.floor(Math.random() * Math.floor(max));

function add_new_user()
{

	con.connect(function(err)
	{
		if (err)
			throw err;

		console.log('Connected');
		let val = [],
			sql,
			user,
			orientation = ['heterosexual', 'bisexual', 'homosexual'],
			gender = ['male', 'female', 'other'];
			status = ['online', 'offline'];
			tags = ['bio', 'geek', 'piercing', 'sport'],
			j = 0;


			user = [];
			user[0] 	= faker.name.firstName()
			user[1]		= faker.name.lastName();
			user[2]		= bcrypt.hashSync('test', bcrypt.genSaltSync(8), null);
			user[3] 	= faker.internet.email();
			user[4] 	= faker.date.past();
			user[5] 	= 0;
			user[6] 	= faker.image.avatar();
			user[7] 	= gender[get_random(3)];
			user[8] 	= orientation[get_random(3)];
			user[9] 	= faker.lorem.paragraphs();
			user[10] 	= status[get_random(2)];
			user[11] 	= false;
			user[12] 	= null;
			val.push(user)

    		sql = "INSERT INTO User (first_name, last_name, password, email, age, nb_image, profile_image, gender, orientation, bio, status, is_lock, reset_pass) VALUES ?",

			con.query(sql, [val], function (err, res)
			{
				if (err)
					throw err;
				console.log("user created");
				console.log(res);
			});
	})
}

function add_new_tag(name)
{

	con.connect(function(err)
	{
		if (err)
			throw err;

		console.log('Connected');

    	sql = "INSERT INTO Tag (tag_name) VALUES ?",

		con.query(sql, [[[name]]], function (err, res)
		{
			if (err)
				throw err;

			console.log("tag created");
			console.log(res);
		});
	})
}

function add_new_img(nb = 1)
{
	let data = [];

	for (var i = 0; i < nb; i++)
		data.push([faker.image.avatar()])
	return (data);
}

function add_new_location( user_id)
{
	con.connect(function(err)
	{
		if (err)
			throw err;

		console.log('Connected');

		geocoder.geocode(faker.address.streetAddress()).then(function(res)
		{
			let len = res.length - 1,
			address = res[get_random(len)],
			full_address = '',
			loc_val = [];

			if (!address)
				return (add_new_location(user_id));
		console.log('Addres');

			if (address.streetNumber)
				full_address += address.streetNumber + ', ';

			if (address.streetName)
				full_address += address.streetName + ', ';

			if (address.city)
				full_address += address.city + ', ';

			if (address.country)
				full_address += address.country;

			loc_val.push([full_address, address.latitude, address.longitude, user_id]);

			let sql = "INSERT INTO Location (address, lat, long, user_id) VALUES ?";
			console.log(loc_val)

				con.query(sql, [loc_val], function (err, res)
				{
					if (err)
						throw err;
					console.log("Database created");
					console.log(res);
				})
		});
	});
}


// add_new_user()
// add_new_tag('hangout')

// console.log(add_new_location(1))
