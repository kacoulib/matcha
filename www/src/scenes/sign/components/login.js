import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import AppRequest from '../../../helpers/appRequest';



class Login extends Component
{
	constructor(props)
	{
		super(props);

  	this.updateCheck = this.updateCheck.bind(this);
  	this.dataChange = this.dataChange.bind(this);
  	this.handleValid = this.handleValid.bind(this);

		this.state =
		{
			loginOrEmail: '',
			password: '',

			reset_pass: false,
			finished: true,
			user_address: ''
		}

		this.appRequest = new AppRequest();
	}

	dataChange(data, e)
	{
		let r = {};

		r[data] =  e.target.value;
		this.setState(r)
	}

	handleValid()
	{
		let loginOrEmail = this.state.loginOrEmail,
			password = this.state.password;

		if (this.state.reset_pass && loginOrEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
		{
			this.appRequest.reset_password_from_mail(loginOrEmail)
			.then((res)=>
			{
				console.log(res)
			}).catch((err)=> {throw err})
		}
		else if (loginOrEmail && password)
		{
			this.appRequest.sign_in(loginOrEmail, password)
			.catch((err)=> {console.log('no');throw err})
		}
	}

	updateCheck()
	{
		this.setState((oldState) =>(
		{
			reset_pass: !oldState.reset_pass
		}));
	}


  componentWillMount()
  {
    if (window.location.search.indexOf('reset_pass') >= 0)
      this.setState({reset_pass: true})
  }

	render()
	{
    	const style = { marginLeft: 20 },
    		reset_pass = this.state.reset_pass;

		return (
			<div>
				<Paper zDepth={2}>
					<TextField hintText="Login or Email" style={style} underlineShow={false} type="text"
					onChange={this.dataChange.bind(this, "loginOrEmail")}
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
				<Divider />
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
