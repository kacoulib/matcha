import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../scenes/sign/index.js';
import Home from '../scenes/home/index.js';



class main extends Component
{
	// componentDidMount()
	// {
	// 	// if (!is_login)
	// 	// {
	// 		console.log('non');
	// 		<Redirect to='/topic' />
	// 	// }
	// }

	render() {
		// let is_login = true

		// if (is_login)
		// {
		// 	return (
		// 		<Redirect to='/topic' />
		// 		)
		// }

	    return (
	        <div className="main">
	          <Switch>
	              <Route exact path='/' component={Home}/>
	              <Route path='/topic' component={Topic}/>
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

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default main;
