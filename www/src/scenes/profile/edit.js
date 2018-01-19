import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ucfirst from '../../tools/ucfirst';



class Edit extends Component
{
	constructor(props)
  	{
	    super(props);
		this.get_current_user = this.get_current_user.bind(this);
		this.set_input_data = this.set_input_data.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state =
		{
			first : '',
			last : '',
			age : '',
			email : '',
			gender : '',
			likers : '',
			location : '',
			orientation : '',
			password : '',
			pictures : '',
			profil_picture : '',
			status : '',
			tags : '',
			viewers : '',
			new_password : '',
			_id : '',
			form_has_been_modified: 0
		}
	}

	componentDidMount()
	{
		this.get_current_user();
	}

	get_current_user()
	{
		let data;
		axios.get('http://localhost:3000/me')
		.then((res)=>
		{
			data = res.data;
			data.first = res.data.name.first;
			data.last = res.data.name.last;
			this.setState(data)
		})
	}

	set_input_data(data, e)
	{
		let r = {};

		r[data] = e.target.value;
	    this.setState(r);
	    if (!this.state.form_has_been_modified)
	    	this.state.form_has_been_modified = 1;
	    console.log(r)

	}

	handleSubmit(e)
	{
		let data = this.state,
			key,
			is_not_ok = 1;

		e.preventDefault()

		if (!data.form_has_been_modified)
			return (console.log('data not modified'));



		for (key in data)
		{
			if (!data[key])
			{
				is_not_ok = 0;
				break;
			}
		}

		if (is_not_ok)
			return ;

		axios.put('http://localhost:3000/me/'+this.state._id, data)
		.then(res=>
		{
			console.log(res)
			// this.history.push('/me');
			console.log(this.context.history)
		})
		.catch(error => {
			console.log(error.response)
		});
	}

	render()
	{
		const user = this.state.data || {},
			parentProp = { set_input_data: this.set_input_data };

	    return (
	        <div className="Profile">
	        	<div className='white_tab_container'>
		        	<div className='white_tab'>
		        		<header>
		        			<h3>Basic info</h3>
		        		</header>
		        		<div className='tab_content' id='edit'>
		        			<form onSubmit={this.handleSubmit} >
		        				<InputField  value={this.state.first} name='first' label_text='First name' {...parentProp}/>
		        				<InputField  value={this.state.last} name='last' label_text='Last name' {...parentProp}/>
		        				<InputField  value={this.state.email} type='email' name='email' label_text='Email' {...parentProp}/>
		        				<InputField  value={this.state.new_password} type='password' name='new_password' label_text='password' {...parentProp}/>
		        				<div className='submit_container'>
		        					<button className='flat_button'>Save</button>
		        				</div>
		        			</form>
		        		</div>
		        	</div>
		        </div>
	        </div>
	    );
	}
}

const InputField = (props) =>
{
	const name = props.name,
		type = props.type || 'text',
		value = name == 'email' ? props.value : ucfirst(props.value);

	return (
		<div className='clear_fix'>
			<label htmlFor={name}>{props.label_text}:</label>
			<input name={name} id={name} type={type} value={value} onChange={props.set_input_data.bind(this, name)} />
		</div>
	)
}

export default Edit;
