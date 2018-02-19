// import React, { Component } from 'react';
import axios from 'axios';


let Requests = 
{
	getCurrentUser: (user_id) =>
	{
		return axios.get('http://localhost:3000/me');
	},
	getAll: (offset, limit) =>
	{
		return axios.get('http://localhost:3000/user/all');
	}
}

export default Requests;
