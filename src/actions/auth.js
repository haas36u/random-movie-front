import axios from 'axios';
import decode from 'jwt-decode';

export const register = ({username, email, password}) => {
  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/register`, {username, email, password})
      .then((response) => {
        window.location = '/login';
      })
      .catch(error => {
        dispatch(registrationFailed(error));
      });
  };
};
const registrationFailed = (error) => {
  return {
    type: "REGISTRATION_ERROR",
    error
  }
};

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
export const isLogin = () => {
  let token = localStorage.getItem('token');
  return !!token;
};
const loginSuccess = (token) => {
  localStorage.setItem('token', `Bearer ${token}`);
  localStorage.setItem('currentUser', JSON.stringify(decode(token)));
  window.location = '/movies';
  
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
  localStorage.removeItem('currentUser');
  window.location.reload();
}