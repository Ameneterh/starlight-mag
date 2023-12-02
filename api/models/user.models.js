import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    avatar: {
      type: image,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    aboutAuthor: {
      type: String,
      required: true,
    },
    socialMedia: {
      type: Array,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;