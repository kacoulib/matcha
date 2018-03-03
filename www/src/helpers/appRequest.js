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
		axios.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('token');
		return axios.get(this.url + '/user/all');
	}

	sign_in (loginOrEmail, password)
	{
		axios.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('token');
		return axios.post(this.url + '/sign_in', {loginOrEmail: loginOrEmail, password: password})
		.then((res)=>
		{
			let data = res.data;

			if (!data || !data.token)
				return ;

			window.sessionStorage.setItem('token', res.data.token)
			window.location = '/';

			return res;
		})
	}

	add_user (newUserData)
	{
		return axios.post(this.url + '/user/add', newUserData)
		.then((res)=>
		{
			let data = res.data;

			if (!data || !data.token)
				return ;

			window.sessionStorage.setItem('token', res.data.token)
			window.location = '/';

			return res;
		})
	}

	async verify_token ()
	{
		axios.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('token');
		let res =  await axios.post(this.url + '/verify_token', {token: sessionStorage.getItem('token')})
		return res
	}

	reset_password_from_mail (email)
	{
		return axios.post(this.url + '/send_password_reset_mail', {email: email});
	}
}

export default Requests;
