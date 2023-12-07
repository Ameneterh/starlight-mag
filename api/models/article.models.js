import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: image,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    edition: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
