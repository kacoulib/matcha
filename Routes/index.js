'use strict'

const 	app 	= require('express')();

app.use('/user', require('./users.js'));

module.exports = app;
