import React, { Component } from 'react';
import axios from 'axios';
import EditBasic from './editPartials/basic.js';
import EditPublic from './editPartials/basic.js';



class Edit extends Component
{
	constructor(props)
  	{
	    super(props);
		this.get_current_user = this.get_current_user.bind(this);
		this.set_input_data = this.set_input_data.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getComponent = this.getComponent.bind(this);

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
			form_has_been_modified: 0,
			stepIndex : 0
		}
	}

	componentDidMount()
	{
		this.get_current_user();
	}

	get_current_user()
	{
		axios.get('http://localhost:3000/me')
		.then((res)=>
		{
			let data = res.data;

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
	    	this.setState({form_has_been_modified : 1});
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
			console.log(this.context.history)
		})
		.catch(error => {
			console.log(error.response)
		});
	}

	getComponent()
	{
		const parentProp =
		{
			set_input_data: this.set_input_data,
			handleSubmit: this.handleSubmit,
			data: this.state
		}
		console.log(this.state.stepIndex)
	    switch (this.state.stepIndex){
	      case 0:
	        	return <EditBasic {...parentProp} />;
	      case 1:
	        return <EditPublic {...parentProp} />;
	      default:
	        	return <EditBasic {...parentProp} />;
		}
	}

	render()
	{
		const parentProp =
		{
			set_input_data: this.set_input_data,
			handleSubmit: this.handleSubmit,
			data: this.state
		},
		stepIndex = this.state.stepIndex || 0;

	    return (
	        <div className="Profile">
	        {this.state.data}
	        	<div className='white_tab_container'>
	        		
	        		{
	        			stepIndex ? 
	        				<EditBasic {...parentProp} />
	        			:
	        				<EditPublic {...parentProp} />
        			}

		        	<div className='litle_row'>
			        	<div className='white_tab'>
			        		<div className='tab_content no_padding'>
				        		<div className='relative'>
									<div className='flat_button' onClick={()=>this.setState({stepIndex: 0})}>
				          				Basic info
									</div>
				          		</div>
			          		</div>
			        	</div>
		        	</div>
		        </div>
	        </div>
	    );
	}
}

export default Edit;
