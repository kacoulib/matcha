import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'
import Login from '../scenes/sign/index.js';
import ResetPass from '../scenes/sign/components/reset_pass.js';
import Home from '../scenes/home/index.js';
import MyProfile from '../scenes/profile/my_profile.js';
import Edit from '../scenes/profile/edit.js';
import OtherProfile from '../scenes/profile/other_profile.js';



function requireAuth(props, replace)
{
	if (true)
		window.location = '/register';
	console.log('ok')
	// else
	// 	window.location = '/register';
}

class main extends Component
{

	render()
	{
		const appProps = this.props;

	    return (
	        <div className="main">
				<Switch>
					<Route exact path='/' render={(props) => (<Home {...props} appProps={appProps}/>)} />
					<Route path='/me' component={MyProfile} onEnter={requireAuth} />
					<Route path='/user/:id' render={(props) => (<OtherProfile {...props} appProps={appProps}/>)} />
					<Route path='/edit' render={(props) => (<Edit {...props} appProps={appProps}/>)} />
					<Route path='/pass_reset/:id' component={ResetPass}/>
					<Route exact path='/register' component={Login}/>
					<Route  path='*' component={NotFound}/>
				</Switch>
	        </div>
	    );
	}
}

const NotFound = () =>
{
	return (
		<div>
			<h3>404 page not found</h3>
			<p>We are sorry but the page you are looking for does not exist.</p>
		</div>
	)
}

export default main;
