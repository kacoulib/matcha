import React, { Component } from 'react';
import Avatar from '../../components/avatar.js';
import Ucfirst from '../../helpers/ucfirst.js';
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
			gender : '',
			likers : '',
			location : '',
			orientation : '',
			password : '',
			nb_image : 0,
			pictures : [],
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
		let user_id = this.props.computedMatch.params.id;

		if (!user_id)
			return (window.location = '/');

		this.appRequest.getUser(user_id)
		.then((res)=>
		{
			let data = res.data,
				user = {},
				tmp,
				tmpState = this.state;

			if (!data.user || !data.user || !data.user[0])
				return (window.location = '/');
			tmp = data.user[0];

			for (var key in tmpState)
				if (tmp.hasOwnProperty(key))
					user[key] = tmp[key];

			user.profile_image = tmp.pic0;
			user.pictures = [tmp.pic1, tmp.pic2, tmp.pic3, tmp.pic4];


			this.setState(user);
		})
		.catch((err)=>window.location = '/')
	}

	render()
	{
		const {profile_image, first_name, last_name, age, city, pictures, nb_image} = this.state,
			full_name = Ucfirst(first_name) + ' '+ Ucfirst(last_name),
			date_format = new Date(age),
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
									<Avatar data={{avatar: profile_image}} />
									<div className='flat_button bg_blue' onClick={this.open_direct_message}>
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
				  			<span>{Ucfirst(first_name)} pictures <span className='gray_color'>{nb_image}</span></span>
							<ul className='pic_list'>
							{	pictures.map((picture, i)=>
										<li style={styles} key={picture+i}><Link to='#'><img src={picture} alt={`${first_name}  screenshot ${i}`} /></Link></li>
								)
							}
							</ul>
						</div>
					</div>
				</div>
			</div>
	    );
	}
}

export default OtherProfile;
