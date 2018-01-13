import React, { Component } from 'react';
import Aside from '../../partials/aside.js';
import Grid from 'material-ui/Grid';

class Home extends Component
{
	render()
	{

		return (
				<Grid container spacing={24}>
					<Grid item xs={12} sm={2}>
						<Aside />
					</Grid>
					<Grid item xs={12} sm={10}>
						<h1>test</h1>
					</Grid>
				</Grid>
			);
	}
}
export default Home;
