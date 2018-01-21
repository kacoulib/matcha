import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ucfirst from '../../../tools/ucfirst';
import InputField from '../components/input_field.js';




class PublicBasic extends Component
{
	render()
	{
		const user = this.props.data || {},
			parentProp = { set_input_data: this.props.set_input_data };
	    return (
			<div className='white_tab'>
				<header>
					<h3>Basic info</h3>
				</header>
				<div className='tab_content' id='edit'>
					<form onSubmit={this.props.handleSubmit} >
						<InputField  value={this.props.data.first} name='first' label_text='First name' {...parentProp}/>
						<InputField  value={this.props.data.last} name='last' label_text='Last name' {...parentProp}/>
						<InputField  value={this.props.data.new_password} type='password' name='new_password' label_text='password' {...parentProp}/>
						<div className='submit_container'>
							<button className='flat_button'>Save</button>
						</div>
					</form>
				</div>
			</div>
	    );
	}
}


export default PublicBasic;
