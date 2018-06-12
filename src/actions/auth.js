import axios from 'axios';

export const login = ({username, password}) => {
  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/login_check`, {username, password})
      .then((response) => {
        dispatch(loginSuccess(response.data.token))
      })
      .catch(error => {
        dispatch(loginFailed(error));
      });
  };
};
const loginSuccess = (token) => {
  localStorage.setItem('token', `Bearer ${token}`);
  
  return {
    type: "LOGIN_SUCCESS",
    token: token
  }
};
const loginFailed = (error) => {
  return {
    type: "LOGIN_ERROR",
    error
  }
};

export const logout = () => {
  localStorage.removeItem('token');
}