import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Home extends Component
{
	constructor(props)
  	{
	    super(props);
		this.get_all = this.get_all.bind(this);

		this.state = {
			recommendation: []
		}
	}
	
	componentDidMount()
	{
		this.get_all();
	}

	get_all()
	{
		axios.get('http://localhost:3000/all')
		.then((res)=>
		{
			this.setState({recommendation: res.data})
		})
	}

	render()
	{
		let data = this.state.recommendation;
		return (
			<ul>
				{	data.map((data)=>
					{
						return (
							<ListItem key={data.email} user={data} />
						);
							
					})
				}
			</ul>
		)
	}
}

function ListItem(props)
{
	const user 	= props.user,
		info 	= {first: user.name.first, last: user.name.last, address: 'paris'},
		styles 	=
		{
			clear: 'both'
		} ;

	return (
		<li style={styles}>
	 		<div className='recommendation_header'>
	 			<Link to='http://localhost:3001/' className='left'>
	 				<Avatar avatar={user.profil_picture} />
	 			</Link>
 				<Info data={info} />
 				<button className='right'>submit</button>
	 		</div>
	 		<div className='pics'>
	 			<ul>
	 				<Pics data={{data: user.pictures, key: user.email}}/>
	 			</ul>
	 		</div>
		</li>
	);
}

function Avatar(props)
{
	const styles =
	{
		width: 50,
		borderRadius: 100,
		margin: '0 12px 0 0'
	};

	return (<div><img style={styles} src={props.avatar}/></div>);
}

function Info(props)
{
	const styles =
	{
		width: 50,
		borderRadius: 100
	};

	return (
		<div>
			<h3>{props.data.first} {props.data.last}</h3>
			<h4>{props.data.address}</h4>
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
		marginLeft: 6,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '50% 50%'
	};

	const lst = data.map((pic) =>
	{
		styles.backgroundImage = pic;
		return (<Link to='' key={data.key + pic} style={styles} ><img src={pic} /></Link>);
	});

	return (lst)
}

function AppendUserRecommendation(props, data)
{
	const users = props.users;
	console.log('1')
	if (!users.length)
		return (null);
	console.log(users)
	const lst = users.map((user)=>
	{
		return <ListItem key={user.email} value={user} />
	})

	return (lst)
}



export default Home;
