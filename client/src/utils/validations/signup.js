import isEmail from 'validator/lib/isEmail';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isAscii from 'validator/lib/isAscii';
import matches from 'validator/lib/matches';
import isEmpty from 'validator/lib/isEmpty';

/**
 * @description validation function
 *
 * @export
 *
 * @param {object} data
 *
 * @returns {void}
 */
export default function validateInput(data) {
  let error = false;
  let {
    username, password, email, confirmPassword
  } = data;

  username = username.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();
  email = email.trim();

  if (isEmpty(username)) {
    error = true;
    data.usernameError = true;
    data.usernameErrorMsg = 'Username is required';
  } else if (username.length < 3) {
    error = true;
    data.usernameError = true;
    data.usernameErrorMsg = 'Username must be at least 3 characters long';
  } else if (!isAlphanumeric(username)) {
    error = true;
    data.usernameError = true;
    data.usernameErrorMsg = 'Username is invalid';
  }

  if (isEmpty(email)) {
    error = true;
    data.emailError = true;
    data.emailErrorMsg = 'Email is required';
  } else if (!isEmail(email)) {
    error = true;
    data.emailError = true;
    data.emailErrorMsg = 'Email is invalid';
  }

  if (isEmpty(password)) {
    error = true;
    data.passwordError = true;
    data.passwordErrorMsg = 'Password is required';
  } else if (!isAscii(password) || password.length < 8) {
    error = true;
    data.passwordError = true;
    data.passwordErrorMsg = 'Password must be at least 8 characters long';
  }

  if (((password.length > 0 && confirmPassword.length < 1) || !matches(password, confirmPassword))) {
    error = true;
    data.confirmPasswordError = true;
    data.confirmPasswordErrorMsg = 'Password and confirm password does not match';
  }

  return { error, errors: data };
}
