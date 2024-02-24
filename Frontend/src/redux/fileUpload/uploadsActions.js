// uploadsActions.js
import { UPLOAD_FILE_SUCCESS,FETCH_PUBLIC_FILES_SUCCESS } from './uploadsActionTypes';
import axios from 'axios';

export const uploadFileSuccess = (file) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: file,
});
export const uploadFile = (file) => async (dispatch, getState) => {
  try {
    const currentState = getState();
    const formData = new FormData();
    formData.append('file', file);

    const user = currentState.auth.user;

    // Append other fields directly to the formData
    formData.append('name', 'test');
    formData.append('uploadedBy', user.id);
    formData.append('filePassword', 'sssss');

    const response = await axios.post('/api/v1/file/upload', formData);

    if (response.status !== 200) {
      throw new Error('File upload failed');
    }

    const data = response.data; // Assuming the response data is already parsed by axios

    dispatch(uploadFileSuccess(data));

    alert('File uploaded successfully!');
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file. Please try again.');
  }
};

export const fetchPublicFiles = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/v1/file/public-files');
    
    dispatch({ type: FETCH_PUBLIC_FILES_SUCCESS, payload: response.data });
  } catch (error) {
    // dispatch({ type: FETCH_PUBLIC_FILES_FAILURE, payload: error.message });
  }
};

export const fetchPublicFileUrl = (fileId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v1/file/public-url/${fileId}`);
   
    return { success: true, resp: response.data };
  } catch (error) {
    return { success: false, resp: error.response.data };
  }
};
