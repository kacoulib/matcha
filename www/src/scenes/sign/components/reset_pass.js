import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { Redirect } from 'react-router-dom'




class ResetPass extends Component
{

	constructor(props)
	{
		super(props);

		this.dataChange = this.dataChange.bind(this);
		this.handleValid = this.handleValid.bind(this);

		this.state =
		{
			reset_pass: '',
			password: '',
			confirm_password: '',
			is_valid: true,
			redirect: false
		}
	}


	dataChange(data, e)
	{
		let r = {},
		password = this.state.password,
		confirm_password = this.state.confirm_password;

		r[data] =  e.target.value;
		console.log(this)
		this.setState(r, ()=>
		{
			if (this.state.password.length > 2  && this.state.confirm_password.length > 2 )
				if (this.state.password === this.state.confirm_password)
					return this.setState({is_valid: false});
			return this.setState({is_valid: true});
		});

	}
	componentDidMount()
	{
		this.setState({reset_pass: this.props.match.params.id}, ()=>console.log(this.state))
	}

	handleValid()
	{
		if (this.state.password !== this.state.confirm_password)
			return ;

		const data = {reset_pass: this.state.reset_pass, password: this.state.password};

		axios.post('http://localhost:3000/reset_pass', data)
		.then((res)=>
		{
			console.log(res)
			this.setState({redirect: true})
		}).catch((err)=> {throw err})
		console.log()
	}

	render()
	{
		const style = { marginLeft: 20 },
			{is_valid, redirect} = this.state,
			propRedirect = {path: '/', redirect: redirect, flash: 'success'};

		return (
			<div style={{width: '100%', maxWidth: 700, margin: '20px auto auto'}}>
				<Paper zDepth={2}>
					<TextField hintText="New password" style={style} underlineShow={false} type="password"
						onChange={this.dataChange.bind(this, 'password')}
						/>
					<Divider />

					<TextField hintText="Confirm password" style={style} underlineShow={false} type="password"
						onChange={this.dataChange.bind(this, 'confirm_password')}
						/>
				</Paper>

				<RaisedButton
					label="Validate"
					primary={true}
					style={{marginTop: 12, marginBottom: 12, width: '100%'}}
					onClick={this.handleValid}
					disabled={is_valid}
				/>
				<MyRedirect {...propRedirect} />
			</div>
		);
	}
}

const MyRedirect = (props)=>
{
	if (props.redirect)
		return <Redirect to={props.path} />
	return '';
}

export default ResetPass;
