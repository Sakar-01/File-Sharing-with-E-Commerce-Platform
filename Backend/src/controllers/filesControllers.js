import Files from "../models/files-model.js";

export const fileUpload = async (req, res) => {
  try {
    const uploadedFile = req.file;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newFile = new Files({
      name: uploadedFile.originalname, 
      src: uploadedFile.path, 
      uploadedBy: req.body.uploadedBy,
      isPrivate:true
    });

    // Save the file information to the database
    const savedFile = await newFile.save();

    res.json(savedFile);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  };
export const fetchFiles = async (req, res) => {
  try {
    const userID = res.locals.jwtData.id
    const publicFiles = await Files.find({uploadedBy: userID});
    res.json(publicFiles);
  } catch (error) {
    res.status(500).send(error.message);
  }
  };
export const fetchPublicUrl = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const userID = res.locals.jwtData.id
    // Retrieve the file based on the fileId
    const file = await Files.findById(fileId);
    if (!file) {
      return res.status(404).send('File not found');
    }
    // Return the public URL to the user
    const publicUrl = `${process.env.BACKEND_URL}/file/download/${fileId}`;

    if(file.isPrivate){
      if(userID === file.uploadedBy){
        return res.json({ publicUrl,name:file.name });
      }
      //Authorized Users
      return res.status(401).json({ status: "ERROR", message: "Access UnAuthorized" });
    }
    return res.json({ publicUrl,name:file.name });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  };
export const downloadPublicFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const userID = res.locals.jwtData.id
    const file = await Files.findById(fileId);
    if (!file) {
      return res.status(404).send('File not found');
    }
    if(file.isPrivate){
      if(userID === file.uploadedBy){
        return res.download(file.src, file.name);
      }
      return res.status(401).json({ status: "ERROR", message: "Access UnAuthorized" });
    }
    return res.download(file.src, file.name);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  };

  export const changePrivacy = async (req, res) => {
    try {
      const { fileId } = req.params;
      const { privacy } = req.body;

      // const userID = res.locals.jwtData.id
      const updatedFile = await Files.findByIdAndUpdate(fileId, { 'isPrivate':privacy }, { new: true });

      res.json(updatedFile);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    };