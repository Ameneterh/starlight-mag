import bcryptjs from "bcryptjs";
import User from "../models/user.models.js";

export const test = (req, res) => {
  res.json({ message: "Hello from Controller!" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          authorName: req.body.authorName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          socialMedia: req.body.socialMedia,
          avatar: req.body.avatar,
          role: req.body.role,
          aboutAuthor: req.body.aboutAuthor,
          username: req.body.username,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
