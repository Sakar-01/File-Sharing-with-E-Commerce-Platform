import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../redux/fileUpload/uploadsActions';
import { CloudUpload } from '@mui/icons-material';
import { Button, Box } from '@mui/material';
import './input-styles.css';
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
    <div className='container'>
    <Box  sx={{ width: '300px' }}>
      <label for="images" className="drop-container dropcontainer" >
        <input  type="file"
        onChange={handleFileChange}
        id="fileInput" className="images" accept="*/*"  />
      </label>
      <div style={{display:'flex',justifyContent:'center'}}>

      <Button
          variant="contained"
          component="span"
          startIcon={<CloudUpload fontSize="large" />}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
    </Box>
</div>
  );
};

export default HomeScreen;