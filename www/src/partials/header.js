import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import Avatar from '../components/avatar.js';



class Header extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			is_login: false
		};
	}

	render()
	{
		let is_login = this.state.is_login,
			register_button = '';

      if (!is_login)
      	register_button =  <Link to='/'>login</Link>;
      else
      	register_button =  <Link to='ok'>Login</Link>;

		return (
			<header>
				<div>
	           		<Link to='/'><img src={logo} className="app-logo" alt="logo" /> </Link>
	           	</div>

				<div id='top_search'>
					<input type="text" placeholder="Search" />
				</div>

				<div id='top_notify' className='header_hover'>
					<span></span>
					<span></span>
	           	</div>

				<div id='top_profile' className='right header_hover'>
					<span>kacoulib</span>
					<Avatar />
					<span className='top_profile_arrow'></span>
				</div>
	        </header>
		);
	}
}
				// <div>
				// 	<ul>
				// 		<li><Link to='/'>home</Link></li>
				// 		<li><Link to='/register'>register</Link></li>
				// 	</ul>
				// </div>
export default Header;
