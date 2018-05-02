import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { Button, Card, Form, Header, Icon, Input } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isAscii from 'validator/lib/isAscii';
import matches from 'validator/lib/matches';

import './styles/form.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      usernameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      usernameErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      confirmPasswordErrorMsg: '',
      serverError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
      [`${e.target.id}Error`]: false
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const error = this.validateInput();
    if (error) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    fetch(`${API_URL}/api/v1/user`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          this.props.history.push('/');
          return;
        }
        this.setState({
          serverError: data.error
        });
      })
      .catch((err) => {
        this.setState({
          serverError: 'Sorry, an error occurred! :('
        });
      });
  }

  validateInput() {
    let error = false;

    if (!isAlphanumeric(this.state.username)) {
      error = true;
      this.setState({
        usernameError: true,
        usernameErrorMsg: 'Username is invalid'
      });
    } else {
      this.setState({
        usernameError: false,
        usernameErrorMsg: ''
      });
    }

    if (!isEmail(this.state.email)) {
      error = true;
      this.setState({
        emailError: true,
        emailErrorMsg: 'Email is invalid'
      });
    } else {
      this.setState({
        emailError: false,
        emailErrorMsg: ''
      });
    }

    if (!isAscii(this.state.password) || this.state.password.length < 8) {
      error = true;
      this.setState({
        passwordError: true,
        passwordErrorMsg: 'Password is invalid or must be at least 8 characters long'
      });
    } else {
      this.setState({
        passwordError: false,
        passwordErrorMsg: ''
      });
    }

    if (((this.state.password.length > 0 && this.state.confirmPassword.length < 1) || !matches(this.state.password, this.state.confirmPassword))) {
      error = true;
      this.setState({
        confirmPasswordError: true,
        confirmPasswordErrorMsg: 'Password and confirm password does not match'
      });
    } else {
      this.setState({
        confirmPasswordError: false,
        confirmPasswordErrorMsg: ''
      });
    }

    return error;
  }

  render() {
    return (
      <Card>
        <Card.Header as='h1'>
          Quizzy
        </Card.Header>
        <Card.Content>
          <Form>
            <div className='fieldError' style={{ marginBottom: '20px' }}>{ this.state.serverError }</div>

            <Form.Field control={Input} icon='user' iconPosition='left' type='text' placeholder='Username' onChange={this.onChange} id='username' error={this.state.usernameError} />
            <div className='fieldError'>{this.state.usernameErrorMsg}</div>

            <Form.Field control={Input} icon='mail' iconPosition='left' type='email' placeholder='Email' onChange={this.onChange} id='email' error={this.state.emailError} />
            <div className='fieldError'>{this.state.emailErrorMsg}</div>

            <Form.Field control={Input} icon='lock' iconPosition='left' type='password' placeholder='Password' onChange={this.onChange} id='password' error={this.state.passwordError} />
            <div className='fieldError'>{this.state.passwordErrorMsg}</div>

            <Form.Field control={Input} icon='lock' iconPosition='left' type='password' placeholder='Confirm Password' onChange={this.onChange} id='confirmPassword' error={this.state.confirmPasswordError} />
            <div className='fieldError'>{this.state.confirmPasswordErrorMsg}</div>

            <Button type='submit' onClick={this.onSubmit}>Sign up</Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

export default SignUpForm;
