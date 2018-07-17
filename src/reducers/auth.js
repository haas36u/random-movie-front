export default (state = {errorLogin: null}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        errorLogin:  null
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        errorLogin: true
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        error:  null
      };

    case 'REGISTRATION_ERROR':
      return {
        ...state,
        error: action.error.response.data.violations
      };

    case 'LOGOUT':
      return {};

    default:
      return state;
  }
};
