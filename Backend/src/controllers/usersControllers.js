import Users from "../models/users-model.js";
import { hash,compare } from "bcrypt";

export const getAllUsers = async (req,res) => {
  
    try {
      //get all users
      const users = await Users.find();
      return res.status(200).json({ message: "OK", users });
    } catch (error) {
      console.log("err");
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
export const UserSignup = async (req,res) => {
    try {
      const {name,email,password} = req.body;
      const existingUser= await Users.findOne({email})
      if(existingUser) return res.status(401).send("User already registered")
      const hashedPassword =await hash(password,10)
      const user = new Users({name,email,password:hashedPassword})
      await user.save();
      
      return res.status(200).json({ message: "OK", user });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };