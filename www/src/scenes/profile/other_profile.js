import React, { Component } from 'react';
import axios from 'axios';
import Avatar from '../../components/avatar.js';
import Ucfirst from '../../helpers/ucfirst.js';
import Pics from '../../components/pics.js';
import AppRequest from '../../helpers/appRequest';
import { Link } from 'react-router-dom';




class OtherProfile extends Component
{
	constructor(props)
	{
    super(props);

		this.get_current_user = this.get_current_user.bind(this);
		this.open_direct_message = this.open_direct_message.bind(this);
		this.appRequest = new AppRequest();

		this.state =
		{
			first_name : '',
			last_name : '',
			age : '',
			email : '',
			gender : '',
			likers : '',
			location : '',
			orientation : '',
			password : '',
			pictures : '',
			profile_image : '',
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
			return (window.location = '/');

		this.appRequest.getUser(user_id)
		.then((res)=>
		{
			let data = res.data;

			if (!data.user || !data.user || !data.user[0])
				return (window.location = '/');

			this.setState(data.user[0]);
		})
		.catch((err)=>window.location = '/')
	}

	render()
	{
		const {pic0, first_name, last_name, pic1, pic2, pic3, pic4, email, age, city} = this.state,
			full_name = Ucfirst(first_name) + ' '+ Ucfirst(last_name),
			date_format = new Date(age),
			pictures = [pic1, pic2, pic3, pic4],
			age_val = date_format.toLocaleDateString('en-EN', {day: 'numeric', month: 'long' }),
			styles =
			{
				position: 'relative',
				display: 'inline-block',
				borderRadius: 100,
				height: 123,
				width: 123,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '50% 50%'
			};

			return (
				<div className="Profile">
					<div className='white_tab_container'>
						<div className='litle_row'>
							<div className='white_tab with_padding'>
								<div className='relative'>
									<Avatar data={{avatar: pic0}} />
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
											<span>{city}</span>
									</li>
								</ul>
							</div>
							<footer>
								<Link to='#'>LIKE</Link>
							</footer>
						</div>

						<div className='tab_content'>
				  			<span>{Ucfirst(first_name)} pictures <span className='gray_color'>{this.state.pictures.length}</span></span>
							<ul className='pic_list'>
								<li style={styles} ><Link to='#'><img src={pic0} alt={first_name + ' picture 0'} /></Link></li>
								<li style={styles} ><Link to='#'><img src={pic1} alt={first_name + ' picture 1'} /></Link></li>
								<li style={styles} ><Link to='#'><img src={pic2} alt={first_name + ' picture 2'} /></Link></li>
								<li style={styles} ><Link to='#'><img src={pic3} alt={first_name + ' picture 3'} /></Link></li>

							</ul>
						</div>
					</div>
				</div>
			</div>
	    );
	}
}

export default OtherProfile;
