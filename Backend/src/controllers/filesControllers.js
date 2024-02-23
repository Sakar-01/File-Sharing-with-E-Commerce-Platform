
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
      filePassword: req.body.filePassword,
    });

    // Save the file information to the database
    const savedFile = await newFile.save();

    res.json(savedFile);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  };