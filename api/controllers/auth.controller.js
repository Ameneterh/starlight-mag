import { response } from "express";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const {
    authorName,
    email,
    phoneNumber,
    socialMedia,
    avatar,
    role,
    aboutAuthor,
    username,
    password,
  } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    authorName,
    email,
    phoneNumber,
    socialMedia,
    avatar,
    role,
    aboutAuthor,
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
