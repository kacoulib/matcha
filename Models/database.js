'use strict'

const dotenv	= require('dotenv').config();

module.exports	= 
{
	url : 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds135156.mlab.com:35156/42matcha'
}