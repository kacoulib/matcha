import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AsideLeft extends Component
{
	render()
	{
		const styles =
		{
			display: 'block'
		}
		return (
			<aside className='aside-nav'>
				<ul>
					<li className='aside_sprite'>
						<Link to='/' style={styles}>
							<span className='home'></span><span>My Profile</span>
						</Link>
					</li>

					<li className='aside_sprite'>
						<Link to='/notifications' style={styles}>
							<span className='notifications'></span><span>Notifications</span>
						</Link>
					</li>

					<li className='aside_sprite'>
						<Link to='/friends' style={styles} >
							<span className='friends'></span><span>friends</span>
						</Link>
					</li>
				</ul>
			</aside>
		);
	}
}
export default AsideLeft;
