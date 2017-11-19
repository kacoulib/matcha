const express		= require('express'),
		app			= express(),
		mongoClient	= require('mongodb').MongoClient,
		bodyParser	= require('body-parser'),
		dotenv		= require('dotenv').config();


app.use(bodyParser.urlencoded({extended: true}))

mongoClient.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds157833.mlab.com:57833/matcha', (err, db) => 
{
	if (err)
		return (console.log(err));
	console.log('connected to db')
})

app.get('/test', (req, res) =>
{
	console.log(req.body)
	console.log(res.body)
})

app.listen(3000, () => console.log('listening 3000'))
console.log('ok...');
console.log(process.env.DB_USER);
