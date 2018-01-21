import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';


class Login extends Component
{
	constructor(props)
	{
		super(props);
    
    	this.updateCheck = this.updateCheck.bind(this);
    	this.dataChange = this.dataChange.bind(this);
    	this.dataChange = this.dataChange.bind(this);
    	this.handleValid = this.handleValid.bind(this);


		this.state =
		{
			email: '',
			password: '',

			reset_pass: false,
			finished: true,
		}
	}

	dataChange(data, e)
	{
		let r = {};

		r[data] =  e.target.value;
		this.setState(r)
	}

	handleValid()
	{
		let email = this.state.email,
			password = this.state.password;

		if (this.state.reset_pass && email)
		{
			axios.post('http://localhost:3000/send_password_reset_mail', {email: email})
			.then((res)=>
			{
				console.log(res)
			}).catch((err)=> {throw err})

			console.log('reset')
		}
		else if (email && password)
		{
			axios.post('http://localhost:3000/sign_in', {email: email, password: password})
			.then((res)=>
			{
				console.log(res)
			}).catch((err)=> {throw err})
		}
	}

	updateCheck()
	{
		this.setState((oldState) =>(
		{
			reset_pass: !oldState.reset_pass
		}));
	}

	render()
	{
    	const style = { marginLeft: 20 },
    		reset_pass = this.state.reset_pass;

		return (
			<div>
				<Paper zDepth={2}>
					<TextField hintText="Email address" style={style} underlineShow={false} type="email"
					onChange={this.dataChange.bind(this, "email")}
					/>
				<Divider />

				{reset_pass ? 
					''
				:
					<TextField hintText="Password" style={style} underlineShow={false}  type="password"
					onChange={this.dataChange.bind(this, "password")}
					/>
				}
				<Divider />
				</Paper>
					<RaisedButton
						label="finished"
						primary={true}
						style={{marginTop: 12, marginBottom: 12, width: '100%'}}
						onClick={this.handleValid}
					/>

				<Checkbox
					label="Reset password"
					style={{textAlign: 'left'}}
					onClick={this.updateCheck}
				/>
			</div>
		);
	}
}

export default Login;
