import { LOGIN_SUCCESS, SET_AUTHENTICATION,SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,LOGOUT_SUCCESS } from './types';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
        error: null,
      };
      case SIGNUP_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
      case SIGNUP_FAILURE:
        return {
          ...state,
          user: null,
          loading: false,
          error: action.payload,
        };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    // Handle other authentication-related actions if needed
    default:
      return state;
  }
};

export default authReducer;
