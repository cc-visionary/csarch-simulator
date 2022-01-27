import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Dashboard, PageDoesNotExist } from './pages';
import { Navbar } from './components';

import './assets/styles/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="app">
        <Navbar />
        <Router>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route component={PageDoesNotExist} />
          </Switch>
        </Router>
      </div>
    );
  }
}
