import Users from "../models/users-model.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req, res) => {
  try {
    //get all users
    const users = await Users.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log("err");
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
export const UserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new Users({ name, email, password: hashedPassword });
    await user.save();

    // create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "OK", user });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
