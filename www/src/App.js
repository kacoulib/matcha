import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import Header from './partials/header.js';
import Main from './partials/main.js';

class App extends Component
{
  render() {
    return (
       <MuiThemeProvider>
        <div className="App">

          <Header />
          <Main />
          <a href='https://www.facebook.com/beyonce/' target='_blank'>Maquette facebook</a>
        </div>
       </MuiThemeProvider>
    );
  }
}

export default App;
