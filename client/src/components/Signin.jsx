import React, { Component } from 'react';
import { Button, Card, Form, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import '../styles/form.css';

/**
 * @class SignInForm
 * @extends {React.Component}
 */
class SignInForm extends Component {
  /**
   * @description constructor function
   * @param {any} props
   * @memberof SignInForm
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * @param {any} e
   * @memberof SignInForm
   * @returns {void}
   */
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  /**
   * @description render function
   * @param {any} props
   * @memberof SignInForm
   * @return {object} signin
   */
  render() {
    return (
      <Card>
        <Card.Header as="h1">
          Quizzy
        </Card.Header>
        <Card.Content>
          <Form>
            <Form.Field control={Input} icon="user" iconPosition="left" type="text" placeholder="Username" onChange={this.onChange} id="username" />
            <Form.Field control={Input} icon="lock" iconPosition="left" type="password" placeholder="Password" onChange={this.onChange} id="password" />
            <p style={{ textAlign: 'right' }}>
              <Link to="/" href="/" style={{ color: '#B27A87' }}>
                Forgot your password?
              </Link>
            </p>
            <Button type="submit">Sign In</Button>
          </Form>
        </Card.Content>
        <Card.Content extra style={{ color: 'white', textAlign: 'center' }}>
          <p style={{ color: 'white' }}>
            Forgot your password?
          </p>
          <Link style={{ color: '#B27A87' }} to="/signup" href="/">
            Register
          </Link>
        </Card.Content>
      </Card>
    );
  }
}

export default SignInForm;
