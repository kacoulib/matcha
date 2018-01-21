import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ucfirst from '../../tools/ucfirst.js';
import Avatar from '../../components/avatar.js';


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
		axios.get('http://localhost:3000/user/all')
		.then((res)=>
		{
			this.setState({recommendation: res.data})
		})
	}

	render()
	{
		let data = this.state.recommendation;
		return (		
			<div className='white_tab_container'>
				<div className='white_tab'>
					<div className='tab_content'>
						<ul className='recommendation_ul'>
							{	data.map((data)=>
								{
									return (
										<ListItem key={data.email} user={data} />
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
		info 	= {first: user.name.first, last: user.name.last, address: 'paris'},
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
 				<button className='right'><span className='add_icon'></span><span>Subscribe</span></button>
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

function Pics(props)
{
	const data = props.data.data,
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

	const lst = data.map((pic) =>
	{
		styles.backgroundImage = pic;
		return (<li key={data.key + pic} style={styles} ><Link to=''><img src={pic} alt={data.first + ' picture'} /></Link></li>);
	});

	return (lst)
}

// function AppendUserRecommendation(props, data)
// {
// 	const users = props.users;
// 	console.log('1')
// 	if (!users.length)
// 		return (null);
// 	console.log(users)
// 	const lst = users.map((user)=>
// 	{
// 		return <ListItem key={user.email} value={user} />
// 	})

// 	return (lst);
// }



export default Home;
