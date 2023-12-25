import Users from "../models/users-model.js";

export const getAllUsers = async () => {
    try {
      //get all users
      const users = await Users.find();
      return res.status(200).json({ message: "OK", users });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };