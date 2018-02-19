import React, { Component } from 'react';
import Ucfirst from './../helpers/ucfirst.js';
import io from 'socket.io-client';

class ChatBox extends Component
{
	constructor(props)
	{
		super();

		this.send_message = this.send_message.bind(this);
		this.send_message_to_server = this.send_message_to_server.bind(this);
		this.toggle_close = this.toggle_close.bind(this);
		this.change_current_message_box = this.change_current_message_box.bind(this);

		this.state =
		{
			current_user: {},
			friend: false,
			is_open: false,
			reduce_dialog: true,
			messages:
			[
				{user_name: 'user 1', text: 'hey'},
				{user_name: 'user 2', text: 'ksdjfldsjfl kdsjflkdsjflds jflsdjf ldsjfldslfdslkfdsjflkds jf'},
				{user_name: 'user 1', text: '???'},
			]
		}
	}

	send_message_to_server(data)
	{
	    let socket = io('http://localhost:3000/');

		socket.on('message', (res) =>
		{
			let new_message = this.state.messages;

			new_message.push(res)
			console.log(new_message)
			this.setState({messages: new_message}, ()=> this.scroll_container.scrollTo(0, this.scroll_container.scrollHeight))
		})
		socket.emit('newMessage', function(){
			console.log('socket connected')
		});
	}

	change_current_message_box(index, e)
	{
		this.setState({current_tab: index})
	}

	send_message(e)
	{
		if (e.key !== 'Enter')
			return ;

 		e.persist();

		let {current_user, messages} = this.state,
		new_message = {user_name: current_user, text: e.target.value};

		messages.push(new_message);
		this.setState({messages: messages}, ()=>
		{
			this.send_message_to_server(new_message)
			e.target.value = '';
			this.scroll_container.scrollTo(0, this.scroll_container.scrollHeight);
		})
	}

	toggle_close(e)
	{

		this.setState({reduce_dialog: !this.state.reduce_dialog});
	}

	componentWillReceiveProps(props)
	{
		this.setState({friend: props.direct_message_friend, is_open: props.direct_message_is_open});
	}

	render()
	{
		const {current_user, reduce_dialog, messages} = this.state,
		full_name = this.state.friend.name ? Ucfirst(this.state.friend.name.first) + ' '+ Ucfirst(this.state.friend.name.last) : '';

		return (
			<div>
				{this.state.is_open ? (
					<div className={reduce_dialog ? 'direct_message' : 'direct_message closed'} onClick={this.change_current_message_box.bind(this)}>
						<header>
							<div className='user_full_name' onClick={this.toggle_close.bind(this)}>{Ucfirst(full_name)}</div>
							<span className='direct_message_close'>x</span>
						</header>
						<div className='direct_message_content' ref={(input) => { this.scroll_container = input; }}>
							<ul>
								{messages && messages.map((message, i) =>
								{
									return (
										<li key={i} className={message.user_name === current_user._id ? 'direct_message_from_me clear_fix' : 'direct_message_from_friends clear_fix'}>
											<div>{message.text}</div>
										</li>
									)
									
								})}
							</ul>
						</div>
						<footer>
							<input type='text' name='new_message' onKeyPress={this.send_message.bind(this)}/>
						</footer>
					</div>
				) : ('')}
			</div>
		);
	}
}


export default ChatBox;