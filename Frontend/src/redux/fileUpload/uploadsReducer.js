import { UPLOAD_FILE_SUCCESS } from './uploadsActionTypes';

const initialState = {
  uploadedFiles: [],
};

const uploadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
      };
    default:
      return state;
  }
};

export default uploadsReducer;
