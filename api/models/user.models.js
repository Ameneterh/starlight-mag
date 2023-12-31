import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    socialMedia: {
      type: Array,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/preview-1x/17/61/male-avatar-profile-picture-vector-10211761.jpg",
    },
    role: {
      type: String,
      default: "general",
    },
    aboutAuthor: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
