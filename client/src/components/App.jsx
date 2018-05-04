import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignUp from './Signup';
import SignIn from './Signin';
import '../styles/style.css';

const App = () => (
  <div>
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/" render={() => <div>Welcome!</div>} />
      <Route path="*" render={() => <div>Not Found!</div>} />
    </Switch>
  </div>
);

export default App;
