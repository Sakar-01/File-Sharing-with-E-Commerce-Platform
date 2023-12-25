import express from "express";
import {
  getAllUsers,
} from "../controllers/usersControllers.js";
const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
export default userRoutes;