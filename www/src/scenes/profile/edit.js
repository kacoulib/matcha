import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
		this.set_upload_picture = this.set_upload_picture.bind(this);
		this.toggle_tags = this.toggle_tags.bind(this);

		this.state =
		{
			first_name : '',
			last_name : '',
			age : '',
			login : '',
			email : '',
			password : '',
			gender : '',
			orientation : '',
			nb_image: 0,
			profile_image: '',
			bio: '',
			status : '',
			is_lock: false,

			likers : [],
			location : '',
			pictures : [],
			tags : [],
			viewers : [],

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
			if (!res.data.sucess)
				return ;

			let tmp = res.data.user,
				userState = this.state,
				user = {},
				key;

			for (key in tmp)
				if (userState.hasOwnProperty(key))
					user[key] = tmp[key]

			this.setState(user)
		})
	}

	toggle_tags(name)
	{
		let	tmp = this.state.tags,
			index = tmp.indexOf(name);

		if (!name)
			return ;

		if (index < 0)
			tmp.push(name)
		else
			tmp.splice(index, 1);

		this.setState({tags: tmp});
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

	set_upload_picture(index, files)
	{
		var reader = new FileReader(),
			file = files[0],
			data = this.state.pictures,
			that = this;

		reader.onload = function(e)
		{
			data[index] = e.target.result;
			that.setState({pictures: data}, ()=>console.log(that.state))
		}
		reader.readAsDataURL(file);

		return (console.log(index, file))
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
			set_upload_picture: this.set_upload_picture,
			data: this.state,
			toggle_tags: this.toggle_tags
		}
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
			set_upload_picture: this.set_upload_picture,
			data: this.state,
			toggle_tags: this.toggle_tags
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
									<div className='flat_button' onClick={()=>this.setState({stepIndex: 0})}>
				          				<Link to='/register?reset_pass'>Reset password</Link>
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
