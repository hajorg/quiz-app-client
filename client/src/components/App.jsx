import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

import SignUp from './Signup';
import SignIn from './Signin';
import './styles/style.css';

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route exact path='/' render={() => <div>Welcome!</div>} />
          <Route path='*' render={() => <div>Not Found!</div>} />
        </Switch>
      </div>
    );
  }
}
