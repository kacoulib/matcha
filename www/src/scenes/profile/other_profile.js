import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ucfirst from '../../tools/ucfirst.js';
import Avatar from '../../components/avatar.js';



class OtherProfile extends Component
{
	constructor(props)
  	{
	    super(props);
		this.get_current_user = this.get_current_user.bind(this);

		this.state = {
			data: []
		}
	}

	componentDidMount()
	{
		this.get_current_user();
		console.log(this.props.match.params.id)
	}

	get_current_user()
	{
		let user_id = this.props.match.params.id;

		if (!user_id)
			return ;

		axios.get('http://localhost:3000/user/'+user_id)
		.then((res)=>
		{
			this.setState({data: res.data})
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
			        		<div className='relative'>
			          			<Avatar data={{avatar: user_profil_picture}} />
			          			<Link to='' className='flat_button'>
			          				Edit
			          			</Link>
			          		</div>
			        	</div>
		        	</div>
		        	<div className='white_tab'>
		          		my profile
		        	</div>
		        </div>
	        </div>
	    );
	}
}

export default OtherProfile;
