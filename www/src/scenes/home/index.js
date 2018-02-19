import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ucfirst from '../../helpers/ucfirst.js';
import Requests from '../../helpers/requests.js';
import Avatar from '../../components/avatar.js';
import Pics from '../../components/pics.js';


class Home extends Component
{
	constructor(props)
  	{
	    super(props);
		this.get_all_users = this.get_all_users.bind(this);

		this.state = {
			recommendation: []
		}
	}

	componentDidMount()
	{
		this.get_all_users();
	}

	get_all_users()
	{
		
		Requests.getAll()
		.then((res)=>
		{
			console.log(res.data)
			this.setState({recommendation: res.data.users}, function()
			{
				console.log(this.state.recommendation)
			})
		}).catch((e)=>console.log(e))
	}

	render()
	{
		let data = this.state.recommendation,
			pictures_len = data.pictures && data.pictures.length ? true : false;


		return (		
			<div className='white_tab_container'>
				<div className='white_tab'>
					<div className='tab_content'>
						<ul className={pictures_len ? 'recommendation_ul': ''}>
							{	data.map((data)=>
								{
									return (
										<ListItem key={data.email} user={data} appProps={this.props.appProps}/>
									);
								})
							}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

function ListItem(props)
{
	const user 	= props.user,
		first = user.name ? user.name.first: 'test',
		last = user.name ? user.name.last: 'test',
		info 	= {first: first, last: last, address: 'paris'},
		styles	=
		{
			avatar:
			{
				width: 50,
				borderRadius: 100,
				margin: '0 12px 0 0'			
			}
		}
	return (
		<li>
	 		<div className='recommendation_header'>
	 			<Link to={'/user/' + user._id}>
	 				<Avatar data={{avatar: user.profil_picture, styles: styles.avatar}} />
	 			</Link>
 				<Info data={info} />
 				<button className='right' onClick={(e)=>{props.appProps.open_new_direct_message(user)}}><span className='add_icon'></span><span>Message</span></button>
	 		</div>
	 		<div className='feed_user_pics'>
	 			<ul>
	 				<Pics data={{data: user.pictures, key: user.email}}/>
	 			</ul>
	 		</div>
		</li>
	);
}

function Info(props)
{
	return (
		<div>
			<h3>{ucfirst(props.data.first)} {ucfirst(props.data.last)}</h3>
			<h4>{ucfirst(props.data.address)}</h4>
		</div>
	);
}


export default Home;
