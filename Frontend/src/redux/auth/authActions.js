  
import axios from 'axios';
import { 
  SET_AUTHENTICATION,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
 } from './types';

const setAuthentication = (isAuthenticated, user) => ({
  type: SET_AUTHENTICATION,
  payload: { isAuthenticated, user },
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});
export const checkAuthentication = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/v1/user/verify');
    const { isAuthenticated, user } = response.data;
    dispatch(setAuthentication(isAuthenticated, user));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized here
      dispatch(setAuthentication(false, null));
    } else {
      // Handle other errors
      console.error('Error:', error);
    }

  }
};

export const signup = (userData,navigateTo) => async (dispatch) => {

  dispatch(signupRequest());

  try {
    const response = await axios.post('/api/v1/user/signup', userData);

    dispatch(signupSuccess(response.data.user));
    
    navigateTo('/')
  } catch (error) {
    dispatch(signupFailure(error.response.data));
  }
};
export const login = (userData,navigateTo) => async (dispatch) => {

  dispatch(loginRequest());

  try {
    
    const response = await axios.post('/api/v1/user/login', userData);
    console.log(response.data)
    dispatch(loginSuccess(response.data.user));
    navigateTo('/')
  } catch (error) {
    // dispatch(signupFailure(error.response.data));
  }
};

export const logout = () => async(dispatch) => {
  const response = await axios.get('/api/v1/user/logout');

  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
