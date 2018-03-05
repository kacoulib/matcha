import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../../components/avatar.js';



class MyProfile extends Component
{
	constructor(props)
  	{
	    super(props);
		this.get_current_user = this.get_current_user.bind(this);

		this.state = {
			data: {}
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
			if (res.data.sucess)
				this.setState({data: res.data.user}, ()=>console.log(this.state.data))
		})
	}

	render()
	{
		const user_profil_picture = this.state.data.profil_picture;
	    return (
	        <div className="Profile">
	        	<div className='white_tab_container'>
		        	<div className='litle_row'>
			        	<div className='white_tab'>
			        		<div className='tab_content'>
				        		<div className='relative'>
				          			<Avatar data={{avatar: user_profil_picture}} />
				          			<Link to='/edit' className='flat_button'>
				          				Edit
				          			</Link>
				          		</div>
			          		</div>
			        	</div>
		        	</div>
		        	<div className='white_tab'>
		        		<div className='tab_content'>
		          			my profile
		        		</div>
		        	</div>
		        </div>
	        </div>
	    );
	}
}

export default MyProfile;
