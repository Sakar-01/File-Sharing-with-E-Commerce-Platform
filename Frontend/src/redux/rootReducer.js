import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import uploadsReducer from './fileUpload/uploadsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  uploads: uploadsReducer,

});

export default rootReducer;