import React, { Component } from 'react';
import axios from 'axios';


class Home extends Component
{
	constructor(props)
  	{
	    super(props);
		this.get_all = this.get_all.bind(this);
	}

	get_all()
	{
		axios.get('http://localhost:3000/all')
		.then((res)=>
		{
			console.log(res)
		})
	}

	render()
	{
		{this.get_all()}
		return (
			<div>
					<h1>test</h1>
			</div>
		);
	}
}



export default Home;
