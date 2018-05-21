import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Card, Form, Input } from 'semantic-ui-react';

import validateUserInput from '../utils/validations/signup';
import auth from '../actions/auth';
import { SIGNUP_SUCCESS } from '../actions/constants';
import '../styles/form.css';

/**
 * @class SignUpForm
 * @extends {React.Component}
 */
class SignUpForm extends Component {
  /**
   * @description constructor function
   * @param {any} props
   * @memberof SignUpForm
   * @return {void}
   */
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

  /**
   *
   * @param {any} e
   * @memberof SignUpForm
   * @returns {void}
   */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
      [`${e.target.id}Error`]: false
    });
  }

  /**
   *
   * @param {any} e
   * @memberof SignUpForm
   * @returns {void}
  */
  onSubmit(e) {
    e.preventDefault();

    const { error, errors } = validateUserInput(this.state);

    if (error) {
      this.setState({ errors });
      return;
    }

    this.props.signUpRequest(JSON.stringify({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }))
      .then((data) => {
        if (data.type === SIGNUP_SUCCESS) {
          this.props.history.push('/');
        }
      });
  }

  /**
   * @description render function
   * @param {any} props
   * @memberof SignUp
   * @return {object} signup
   */
  render() {
    return (
      <Card>
        <Card.Header as="h1">
          Quizzy
        </Card.Header>
        <Card.Content>
          <Form>
            <div className="fieldError" style={{ marginBottom: '20px' }}>{ this.props.serverError }</div>

            <Form.Field control={Input} icon="user" iconPosition="left" type="text" placeholder="Username" onChange={this.onChange} id="username" error={this.state.usernameError} />
            {
              this.state.usernameError &&
              <div className="fieldError">{this.state.usernameErrorMsg}</div>
            }

            <Form.Field control={Input} icon="mail" iconPosition="left" type="email" placeholder="Email" onChange={this.onChange} id="email" error={this.state.emailError} />
            {
              this.state.emailError &&
              <div className="fieldError">{this.state.emailErrorMsg}</div>
            }

            <Form.Field control={Input} icon="lock" iconPosition="left" type="password" placeholder="Password" onChange={this.onChange} id="password" error={this.state.passwordError} />
            {
              this.state.passwordError &&
              <div className="fieldError">{this.state.passwordErrorMsg}</div>
            }

            <Form.Field control={Input} icon="lock" iconPosition="left" type="password" placeholder="Confirm Password" onChange={this.onChange} id="confirmPassword" error={this.state.confirmPasswordError} />
            {
              this.state.confirmPasswordError &&
              <div className="fieldError">{this.state.confirmPasswordErrorMsg}</div>
            }

            <Button type="submit" onClick={this.onSubmit}>Sign up</Button>
          </Form>
        </Card.Content>
      </Card>
    );
  }
}

SignUpForm.propTypes = {
  serverError: PropTypes.string,
  history: PropTypes.object.isRequired,
  signUpRequest: PropTypes.func
};

SignUpForm.defaultProps = {
  serverError: '',
  signUpRequest: () => {}
};

const mapStateToProps = state => ({
  serverError: state.users.error,
  data: state.users.data
});

const mapDispatchToProps = dispatch => ({
  errorOccurred: error => dispatch(auth.signup(error)),
  signUpRequest: data => auth(dispatch, data)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
