import express from "express";
import {
  getAllUsers,
  userLogin,
  UserSignup,
  verifyUser,
  userLogout
} from "../controllers/usersControllers.js";
import {userSignupValidator,validate,loginValidator} from "../utils/validators.js"
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = express.Router();

userRoutes.get("/getallUsers", getAllUsers);
userRoutes.post("/signup",  validate(userSignupValidator), UserSignup);
userRoutes.get("/login", validate(loginValidator), userLogin);
userRoutes.get("/profile", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);


export default userRoutes;