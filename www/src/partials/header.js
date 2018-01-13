import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';


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
			<div>
				<header className="App-header">
		           <Link to='/'><img src={logo} className="App-logo" alt="logo" /> </Link>
		          {register_button}
		        </header>
				<div>
					<ul>
						<li><Link to='/'>home</Link></li>
						<li><Link to='/register'>register</Link></li>
					</ul>
				</div>
				
			</div>
		);
	}
}
export default Header;
