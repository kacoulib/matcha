import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
      	register_button =  <Link to='/home'>login</Link>;
      else
      	register_button =  <Link to='ok'>Login</Link>;

		return (
			<Router>
			<div>
				<header className="App-header">
		          <img src={logo} className="App-logo" alt="logo" />
		          {register_button}
		        </header>
				<div>
					<ul>
						<li><Link to='/topic'>1</Link></li>
						<li><Link to='/2'>2</Link></li>
						<li><Link to='/3'>3</Link></li>
					</ul>
				</div>
			</div>
			</Router>
		);
	}
}
export default Header;
