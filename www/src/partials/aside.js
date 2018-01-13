import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User1 from '../public/img/profiles/user1/default.jpg';


class Aside extends Component
{
	render()
	{
		// const styles = 
		// {

		// }

		return (
			<aside className='aside-nav'>
				<div className='avatar'>
					<img src={User1} alt="username profile photo" />
				</div>
				<div className='info'>
					<h2 className='name'>user1</h2>
				</div>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/notifications'>Notifications</Link></li>
				</ul>
			</aside>
		);
	}
}
export default Aside;
