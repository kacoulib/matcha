import React, { Component } from 'react';
import ChatBox from './../modules/chatbox.js';

class Footer extends Component
{
	render()
	{
		return (<ChatBox {...this.props} />)
	}
}

export default Footer;
