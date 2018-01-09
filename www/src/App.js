import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './scenes/sign/index.js';

import './App.css';
import Header from './partials/header.js';
import Footer from './partials/footer.js';

class App extends Component
{
  render() {
    return (
       <MuiThemeProvider>
        <div className="App">

          <Header />

          <Router>
            <div>
              <Route path='/topic' component={Topic}/>
              <Route path='/' component={Login}/>
            </div>
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
