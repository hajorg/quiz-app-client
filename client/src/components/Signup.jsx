import React, { Component } from 'react';
import { Button, Card, Form, Header, Icon, Input } from 'semantic-ui-react';

import './styles/form.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    fetch('http://localhost:8080/api/v1/user', {
      headers,
      method: 'POST',
      body: JSON.stringify(this.state),
      mode: 'no-cors'
    });
  }

  render() {
    return (
      <Card>
        <Card.Header as='h1'>
          Quizzy
        </Card.Header>
        <Card.Content>
          <Form>
            <Form.Field control={Input} icon='user' iconPosition='left' type='text' placeholder='Username' onChange={this.onChange} id='username' />
            <Form.Field control={Input} icon='mail' iconPosition='left' type='email' placeholder='Email' onChange={this.onChange} id='email' />
            <Form.Field control={Input} icon='lock' iconPosition='left' type='password' placeholder='Password' onChange={this.onChange} id='password' />
            <Form.Field control={Input} icon='lock' iconPosition='left' type='password' placeholder='Confirm Password' onChange={this.onChange} id='confirmPassword' />
            <Button type='submit' onClick={this.onSubmit}>Sign up</Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

export default SignUpForm;
