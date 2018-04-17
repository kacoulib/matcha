import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditBasic from './editPartials/basic.js';
import EditPublic from './editPartials/basic.js';
import AppRequest from '../../helpers/appRequest';




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
			post_pictures : [],
			pictures : [],
			tags : [],
			viewers : [],

			form_has_been_modified: 0,
			stepIndex : 0
		}

		this.appRequest = new AppRequest();

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
			console.log(res)
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
				post_pictures = this.state.post_pictures,
				pictures = this.state.pictures,
				that = this;


		reader.onload = function(e)
		{
			pictures[index] = e.target.result;
			post_pictures[index] = file;
			that.setState({post_pictures, pictures}, ()=>console.log(that.state))
		}
		reader.readAsDataURL(file);

		return;
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

		let tmp = new FormData(),
			tmpData = this.state,
			filter = ['pictures', 'form_has_been_modified', 'nb_image', 'stepIndex'];

			for (var key2 in tmpData)
			{
				if (tmpData.hasOwnProperty(key2))
				{
					if (filter.indexOf(key) < 0)
					{
						tmp.append(key2, tmpData[key2]);
						console.log(key2,' = ',tmpData[key2])
					}
				}
			}

		data.post_pictures.forEach((el, i)=>
		{
			if (el)
				tmp.append(i, el)
		})

		//tmp.append('img', this.state.pictures[0])
//		tmp.append('pictures', this.state.pictures)
		console.log('tmp = ', tmp)

		delete this.state.password;
		delete this.state.status;
		this.appRequest.update_user(this.state._id, this.state)
		.then(res=>
		{
			console.log('res = ', res)
			// console.log(tmpData)
		})
		.catch(error =>
		{
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
