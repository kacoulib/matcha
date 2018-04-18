import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'
import Login from '../scenes/sign/index.js';
import ResetPass from '../scenes/sign/components/reset_pass.js';
import Home from '../scenes/home/index.js';
import MyProfile from '../scenes/profile/my_profile.js';
import Edit from '../scenes/profile/edit.js';
import OtherProfile from '../scenes/profile/other_profile.js';
import Requests from '../helpers/appRequest.js'



const AuthRoute = ({ component: Component, ...rest }) =>
{
	var isAuth = sessionStorage.getItem('token');

		return (<Route {...rest} render={props => (
			isAuth
			? <Component {...rest} />
			: <Redirect to={{ pathname: '/register', state: { from: props.location } }} />
		)} />)
}


const NotAuthRoute = ({ component: Component, ...rest }) =>
{
	var notIsAuth = sessionStorage.getItem('token');

		return (<Route {...rest} render={props => (
			!notIsAuth
			? <Component {...rest} />
			: <Redirect to={{ pathname: '/', state: { from: props.location } }} />
		)} />)
}


class main extends Component
{
	render()
	{
		const appProps = this.props;
		// console.log(appProps)
	    return (
	        <div className="main">
				<Switch>
					<AuthRoute exact path='/' component={Home} appProps={appProps}/>
					<AuthRoute path='/me' component={MyProfile} />
					<AuthRoute path='/user/:id' component={OtherProfile} appProps={appProps} />
					<AuthRoute path='/edit' component={Edit} appProps={appProps} />
					<AuthRoute path='/pass_reset/:id' component={ResetPass}/>
					<NotAuthRoute exact path='/register' component={Login}/>
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
