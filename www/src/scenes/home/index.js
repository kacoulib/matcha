import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ucfirst from '../../helpers/ucfirst.js';
import AppRequest from '../../helpers/appRequest.js';
import Avatar from '../../components/avatar.js';
import Pics from '../../components/pics.js';


class Home extends Component
{
	constructor(props)
	{
	  super(props);
		this.get_all_users = this.get_all_users.bind(this);
		this.appRequest = new AppRequest();

		this.state = {
			recommendation: [],
			limit : 20,
			offset : 0
		}
	}

	componentDidMount()
	{
		this.get_all_users();
	}

	get_all_users()
	{
		let params = {limit: this.state.limit, offset: this.state.offset};

		this.appRequest.all_users(params)
		.then((res)=>
		{
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
		info 	= {first_name: user.first_name, last_name: user.last_name, address: user.city},
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
	 			<Link to={'/user/' + user.id}>
	 				<Avatar data={{avatar: user.pic0, styles: styles.avatar}} />
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
			<h3>{ucfirst(props.data.first_name)} {ucfirst(props.data.last_name)}</h3>
			<h4>{ucfirst(props.data.address)}</h4>
		</div>
	);
}


export default Home;
