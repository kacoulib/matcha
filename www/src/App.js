import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import io from 'socket.io-client';

import './App.css';
import Header from './partials/header.js';
import Main from './partials/main.js';
import Aside from './partials/aside.js';
import Footer from './partials/footer.js';


class App extends Component
{
  constructor(props)
  {
    super();

    this.open_new_direct_message = this.open_new_direct_message.bind(this);
    this.close_direct_message = this.close_direct_message.bind(this);
    this.get_current_user = this.get_current_user.bind(this);

    this.state =
    {
      is_login: false,
      current_user: {},
      direct_message_friend: {},
      direct_message_is_open: false
    }
  }


  get_current_user()
  {
    let token = sessionStorage.getItem('token');

    if (!token)
      return;

    let base64Url = token.split('.')[1],
        base64 = base64Url.replace('-', '+').replace('_', '/');

    this.setState({data: JSON.parse(window.atob(base64))})
  }

  close_direct_message(friend)
  {
    this.setState({direct_message_is_open: false})
  }

  open_new_direct_message(friend)
  {
    if (!friend._id)
      return;
    this.setState({direct_message_friend: friend, direct_message_is_open: true});
  }

  componentWillMount()
  {
    var socket = io('http://localhost:3000/');
    socket.emit('newMessage', function(){
      console.log('socket connected')
    });
  }

  render()
  {
    const appProps={
      open_new_direct_message: this.open_new_direct_message,
      current_user: this.current_user
    },

    directMessageProps={
      direct_message_friend: this.state.direct_message_friend,
      close_direct_message: this.close_direct_message,
      direct_message_is_open: this.state.direct_message_is_open
    },

    curUser={
      current_user: this.current_user
    };

    return (
       <MuiThemeProvider>
        <div>
          <Header {...curUser}/>

          <div id="page_layout">
            <div id="aside">
              <Aside />
            </div>

            <div id="main">
              <Main {...appProps} />
            </div>
          </div>

          <Footer {...directMessageProps}/>


          <a href='https://vk.com/feed' target='_blank' rel="noopener noreferrer">Maquette VK</a>
        </div>
       </MuiThemeProvider>
    );
  }
}

export default App;
