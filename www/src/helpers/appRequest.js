import React, { Component } from 'react';
import axios from 'axios';



class Requests
{
	constructor()
	{
		this.url = 'http://localhost:3000';
	}

	getCurrentUser (user_id)
	{
		return axios.get(this.url + '/me');
	}

	all_users (offset, limit)
	{
		axios.defaults.headers.common.Authorization = 'Bearer test';
		return axios.get(this.url + '/user/all');
	}

	sign_in (email, password)
	{
		return axios.post(this.url + '/sign_in', {email: email, password: password})
	}

	reset_password_from_mail (email)
	{
		return axios.post(this.url + '/send_password_reset_mail', {email: email});
	}
}

export default Requests;
