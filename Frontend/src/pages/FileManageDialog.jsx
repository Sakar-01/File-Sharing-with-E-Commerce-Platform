import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
  FormControlLabel,
  Button,
  dividerClasses,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const FileManageDialog = ({
  open,
  onClose,
  file,
  filePrivacy,
  setFilePrivacy,
  fileUrl,
}) => {
  const [filePrivacyText, setPrivacyText] = useState("");

  useEffect(() => {
    let text = filePrivacy ? "Private" : "Public";
    setPrivacyText(text);
  }, [file, filePrivacy]);

  const copyToClipboardObsolete = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Text successfully copied to clipboard");
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>File Details</DialogTitle>
      <DialogContent>
        <div style={{display:'inline'}}>
          <h3>File Name:{" "}
          {file.name}</h3>
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={filePrivacyText === "Public"}
              onChange={(e) => setFilePrivacy(file, !filePrivacy)}
            />
          }
          label={filePrivacyText}
        />
        <br/>[Note: Private files cannot be shared]
        <div style={{ display: "flex", justifyContent: "center",marginTop:'20px' }}>
          <Button
            onClick={() => {
              copyToClipboardObsolete(fileUrl);
            }}
          >
            Copy File Url
          </Button>
          <Button
            onClick={() => {
              downloadFile(file._id);
            }}
            startIcon={<CloudUpload fontSize="large" />}
            variant="contained"
          >
            Download File
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileManageDialog;
