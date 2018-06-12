export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return true;
      
    case 'LOGIN_ERROR':
      return action.error;
      
    case 'LOGOUT':
      return {};
      
    default:
      return state;
  }
};