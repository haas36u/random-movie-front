import axios from 'axios';
import decode from 'jwt-decode';

export const register = ({username, email, password}) => {
  return (dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/register`, {username, email, password})
      .then((response) => {
        dispatch(loginSuccess(response.data.token))
        window.location.href = '/registration/select-movies';
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

const loginSuccess = (token) => {
  localStorage.setItem('token', `Bearer ${token}`);
  localStorage.setItem('currentUser', JSON.stringify(decode(token)));
  window.location.href = '/movies';
  
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

export const isAuthenticated = () => {
  let token = localStorage.getItem('token');
  return !!token && !isTokenExpired(token);
};

const getTokenExpirationDate = (encodedToken) => {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);
  console.log(expirationDate)
  console.log(new Date())
  return expirationDate < new Date();
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  window.location.href = '/login';
}