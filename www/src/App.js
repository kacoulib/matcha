import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './scenes/sign/index.js';

import logo from './logo.svg';
import './App.css';
import Header from './partials/header.js';
import Footer from './partials/footer.js';

class App extends Component
{
  render() {
    return (
       <MuiThemeProvider>
       <RaisedButton label="test" />
        <div className="App">

          <Login />
          <Header />

            <Router>
             <Route path='/topic' component={Topic}/>
            </Router>
        </div>
       </MuiThemeProvider>
    );
  }
}

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default App;
