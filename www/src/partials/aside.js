import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Filter from '../modules/filter';


class AsideLeft extends Component
{

	render()
	{
		const styles =
		{
			display: 'block'
		};

		return (
			<div>
				<aside className='aside-nav'>
					<ul>
						<li className='aside_sprite'>
							<Link to='/me' style={styles}>
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

				<Filter {...this.props}/>
			</div>
		);
	}
}
export default AsideLeft;
