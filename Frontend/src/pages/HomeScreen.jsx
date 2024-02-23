// FileUpload.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../redux/fileUpload/uploadsActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file before uploading.');
      return;
    }

    // Dispatch the async action to handle file upload
    dispatch(uploadFile(selectedFile));
  };

  return (
    <div style={{marginTop:'50px'}}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default HomeScreen;
