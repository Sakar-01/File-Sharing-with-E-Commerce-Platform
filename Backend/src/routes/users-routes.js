import express from "express";
import {
  getAllUsers,
  UserSignup
} from "../controllers/usersControllers.js";
import {userSignupValidator,validate} from "../utils/validators.js"
const userRoutes = express.Router();

userRoutes.get("/get-user", getAllUsers);
userRoutes.post("/signup-user",  validate(userSignupValidator), UserSignup);
export default userRoutes;