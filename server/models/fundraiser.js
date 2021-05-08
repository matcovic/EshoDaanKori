import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Creates simple schema for a Fundraiser.
const fundraiserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    fundraisingGoal: {
      type: String,
      required: true,
    },
    fundraisingFor: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    coverPhoto: {
      type: String,
    },
    paymentOptions: [],
    optionalPhotos: [],
  },
  { timestamps: true }
);

const Fundraiser = mongoose.model("Fundraiser", fundraiserSchema);

export default Fundraiser;
