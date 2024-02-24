import {  fetchPublicFiles,fetchPublicFileUrl } from '../redux/fileUpload/uploadsActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const ManageFile = ({  publicFiles, error, fetchPublicFiles,fetchPublicFileUrl }) => {
  
  useEffect(() => {
    fetchPublicFiles();
  }, [fetchPublicFiles]); 
  
const downloadFile=async(id)=>{
  await fetchPublicFileUrl(id).then((result) => {
    if(result.success){
      const a = document.createElement('a');
      a.href = result.resp.publicUrl;
      a.download = result.resp.name; 
      a.target = '_blank'; 
      a.click();
    }else{
      console.error('Error fetching file URL:', result.resp);
    }
  })


}

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <div>
        <h2>Public Files:</h2>
        <ul>
          {publicFiles.map((file) => (
            <li key={file._id} onClick={()=>{downloadFile(file._id)}}>{file.name}</li>
          ))}
          {/* <img src='http://localhost:5000/api/v1/file/download/65d7159a3292cbe09f9a37f0'/> */}
          {/* {publicFileUrl?<p>{publicFileUrl}</p>:''} */}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  publicFiles: state.uploads.publicFiles,
  error: state.uploads.error,
});

const mapDispatchToProps = {
  fetchPublicFiles,fetchPublicFileUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageFile);
