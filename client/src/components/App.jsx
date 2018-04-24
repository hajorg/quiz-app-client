import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/style.css';

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/home' render={() => <div>Welcome Home!</div>} />
          <Route exact path='/' render={() => <div>Welcome!</div>} />
          <Route path='*' render={() => <div>Not Found!</div>} />
        </Switch>
      </div>
    );
  }
}
