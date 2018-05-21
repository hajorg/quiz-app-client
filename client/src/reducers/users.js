
/**
 * @description users reducer
 *
 * @param {*} state
 * @param {*} action
 *
 * @returns {Object} state
 */
export default function (state = {}, action) {
  switch (action.type) {
    case 'SIGNUP_ERROR':
      return {
        ...state,
        error: action.error
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        error: '',
        data: action.data
      };
    default:
      return state;
  }
}
