import express from "express";
import {
  getAllUsers,
  UserLogin,
  UserSignup,
  verifyUser,
  userLogout
} from "../controllers/usersControllers.js";
import {userSignupValidator,validate,loginValidator} from "../utils/validators.js"
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = express.Router();

userRoutes.get("/getallUsers", getAllUsers);
userRoutes.post("/signup",  validate(userSignupValidator), UserSignup);
userRoutes.post("/login", validate(loginValidator), UserLogin);
userRoutes.get("/verify", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);


export default userRoutes;