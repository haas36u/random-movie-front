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
export const isLogin = () => {
  let token = localStorage.getItem('token');
  return !!token;
};
const loginSuccess = (token) => {
  localStorage.setItem('token', `Bearer ${token}`);
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
}