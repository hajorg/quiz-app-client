import { SIGNUP_SUCCESS, SIGNUP_ERROR } from './constants';

const signUpError = error => ({
  type: SIGNUP_ERROR,
  error
});

const signUpSuccess = data => ({
  type: SIGNUP_SUCCESS,
  data
});

/**
 *
 * @param {func} dispatch
 * @param {object} body
 *
 * @returns {Promise} dispatch
 */
export default function signUpRequest(dispatch, body) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  return fetch(`${API_URL}/api/v1/user`, {
    headers,
    method: 'POST',
    body
  })
    .then(
      result => result.json(),
      () => dispatch(signUpError('Sorry, an error occurred! :('))
    )
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return dispatch(signUpSuccess(data));
      }

      return dispatch(signUpError(data.error));
    });
}
