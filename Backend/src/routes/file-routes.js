import express from "express";
const fileRoutes = express.Router();
import {
  fileUpload,fetchFiles,fetchPublicUrl,downloadPublicFile
} from "../controllers/filesControllers.js";
import { verifyToken } from "../utils/token-manager.js";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'private/uploads/', 
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


fileRoutes.post("/upload",verifyToken,upload.single('file'), fileUpload);
//Fetch All Public Files
fileRoutes.get("/public-files",verifyToken, fetchFiles);
//Fetch Single File Public Url
fileRoutes.get("/public-url/:fileId",verifyToken, fetchPublicUrl);
//Get Public File
fileRoutes.get("/download/:fileId",verifyToken, downloadPublicFile);


export default fileRoutes;