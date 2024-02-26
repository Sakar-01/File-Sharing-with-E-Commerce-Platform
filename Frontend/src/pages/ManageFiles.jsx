import {
  fetchPublicFiles,
  fetchPublicFileUrl,changeFilePrivacy
} from "../redux/fileUpload/uploadsActions";
import { Grid } from '@mui/material';
import './input-styles.css';
import { connect } from "react-redux";
import { useEffect,useState } from "react";
import FileManageDialog from './FileManageDialog';
const ManageFile = ({
  publicFiles,
  error,
  fetchPublicFiles,
  fetchPublicFileUrl,changeFilePrivacy
}) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [openfile, setOpenfile] = useState([]);
  const [filePrivacy, setPrivacy] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const handleToggleDialog = async(file) => {
    try {
    if(!openDialog){
      setPrivacy(file.isPrivate)
      setOpenfile(file)
      await fetchPublicFileUrl(file._id).then((result) => {
        if (result.success) {
          setFileUrl(result.resp.publicUrl)
        } else {
          console.error("Error fetching file URL:", result.resp);
        }
      });
    }else{
      setOpenfile([])
      setFileUrl(null)
    }
    setOpenDialog(!openDialog);

    } catch (error) {
      
    }
    
  };

  useEffect(() => {
    fetchPublicFiles();
  }, [changeFilePrivacy]);

  const downloadFile = async (id) => {
    await fetchPublicFileUrl(id).then((result) => {
      if (result.success) {
        const a = document.createElement("a");
        a.href = result.resp.publicUrl;
        a.download = result.resp.name;
        a.target = "_blank";
        a.click();
      } else {
        console.error("Error fetching file URL:", result.resp);
      }
    });
  };
  const setFilePrivacy = async (file,privacy) => {
    let res = await changeFilePrivacy(file._id,privacy)
    setPrivacy(res)
    fetchPublicFiles();
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {publicFiles.length > 0 ? (
        <>
          <h2>Files:</h2>
          <div
          >
          <Grid container spacing={2} columns={16} style={{marginTop:'30px'}}>
            {publicFiles.map((file) => (
              <Grid item xs={4} md={6}
              key={file.name}
              className="card-item"
               onClick={() => {
                    handleToggleDialog(file);
                  }}>
                {file.name}
              </Grid>

              ))}
          </Grid>
          </div>
            <FileManageDialog
              open={openDialog}
              onClose={handleToggleDialog}
              file={openfile}
              filePrivacy={filePrivacy}
              setFilePrivacy={setFilePrivacy}
              fileUrl={fileUrl}
              downloadFile={downloadFile}
            />
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>

        <h2>Files not Uploaded!</h2>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  publicFiles: state.uploads.publicFiles,
  error: state.uploads.error,
});

const mapDispatchToProps = {
  fetchPublicFiles,
  fetchPublicFileUrl,changeFilePrivacy
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageFile);
