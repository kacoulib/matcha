import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import Header from './partials/header.js';
import Main from './partials/main.js';
import Aside from './partials/aside.js';

class App extends Component
{
  render() {
    return (
       <MuiThemeProvider>
        <div>
          <Header />

          <div id="page_layout">
            <div id="aside">
              <Aside />
            </div>

            <div id="main">
              <Main />
            </div>
          </div>

          <a href='https://vk.com/feed' target='_blank'>Maquette VK</a>
        </div>
       </MuiThemeProvider>
    );
  }
}

export default App;
