import { UPLOAD_FILE_SUCCESS,FETCH_PUBLIC_FILES_SUCCESS,FETCH_PUBLIC_FILE_URL_SUCCESS } from './uploadsActionTypes';

const initialState = {
  uploadedFiles: [],
  publicFiles: [],
  error: null,
};

const uploadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
      };
      case FETCH_PUBLIC_FILES_SUCCESS:
        return {
          ...state,
          publicFiles: action.payload,
          error: null,
        };
     
    default:
      return state;
  }
};

export default uploadsReducer;
