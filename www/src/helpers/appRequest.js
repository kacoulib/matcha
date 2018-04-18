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

	getUser (user_id)
	{
		return axios.get(this.url + '/user/'+ user_id);
	}

	all_users (params)
	{
		let path = '?', 
			key;

		for (key in params)
			path += key + '=' + params[key];

		path = path.slice(0, -1);

		axios.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('token');
		return axios.get(`${this.url}/user/all/${path}`);
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

	sign_up (newUserData)
	{
		return axios.post(this.url + '/user', newUserData)
		.then((res)=>
		{
			let data = res.data;

			if (!data || !data.token)
				return ;

			window.sessionStorage.setItem('token', data.token)
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

	update_user(user_id, data)
	{
		console.log('data = ', data)
		axios.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.getItem('token');

		// return axios.put(this.url + '/user/', data, { headers: { 'Content-Type': 'multipart/form-data' }});
		return axios.put(this.url + '/user/', data)
		.then((res)=>
		{
			let data = res.data;

			if (!data || !data.token)
				return ;

			window.sessionStorage.setItem('token', data.token)
			return res;
		})
	}

}

export default Requests;
