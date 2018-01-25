import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '../../components/avatar.js';
import Ucfirst from '../../tools/ucfirst.js';
import Pics from '../../components/pics.js';



class OtherProfile extends Component
{
	constructor(props)
  	{
	    super(props);

		this.get_current_user = this.get_current_user.bind(this);
		this.open_direct_message = this.open_direct_message.bind(this);

		this.state =
		{
			name: {},
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
			_id : '',
		}
	}

	componentDidMount()
	{
		this.get_current_user();
	}

	open_direct_message()
	{
		if (this.state._id)
		this.props.appProps.open_new_direct_message(this.state)
	}

	get_current_user()
	{
		let user_id = this.props.match.params.id;

		if (!user_id)
			return ;

		axios.get('http://localhost:3000/user/'+user_id)
		.then((res)=>
		{
			this.setState(res.data)
		})
	}

	render()
	{
		const {profil_picture, pictures, email, age, location} = this.state,
			full_name = Ucfirst(this.state.name.first) + ' '+ Ucfirst(this.state.name.last),
			date_format = new Date(age),
			age_val = date_format.toLocaleDateString('en-EN', {day: 'numeric', month: 'long' });

			return (
				<div className="Profile">
					<div className='white_tab_container'>
						<div className='litle_row'>
							<div className='white_tab with_padding'>
								<div className='relative'>
									<Avatar data={{avatar: profil_picture}} />
									<div className='flat_button bg_blue'  onClick={this.open_direct_message}>
										Message
									</div>
								</div>
							</div>
						</div>
					<div className='middle_row'>
		 				<div className='tab_content other_info_basic'>
							<header>
								{full_name}
							</header>
							<div>
								<ul>
									<li className='clear_fix'>
											<span>Birthday:</span>
											<span>{age_val}</span>
									</li>
									<li className='clear_fix'>
											<span>Current city:</span>
											<span>{location.name}</span>
									</li>
								</ul>
							</div>
							<footer>
								my profile
							</footer>
						</div>
						
						<div className='tab_content'>
				  			<span>{Ucfirst(this.state.name.first)} pictures <span className='gray_color'>{this.state.pictures.length}</span></span>
							<ul className='pic_list'>
								<Pics data={{data: pictures, key: email}} />
							</ul>
						</div>
					</div>
				</div>
			</div>
	    );
	}
}

export default OtherProfile;
