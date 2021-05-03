import mongoose from "mongoose";

//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

const Schema = mongoose.Schema;

var imageSchema = new Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

// Creates simple schema for a User.  The hash
// and salt are derived from the user's given password when they register
const userSchema = new Schema(
  {
    username: String,
    hash: String,
    salt: String,
    fullname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    nid: {
      type: String,
      required: false,
    },
    dob: {
      type: String,
      required: false,
    },
    photo: {
      type: imageSchema,
      default: {},
      required: false,
    },
  },
  { timestamps: true }
);

/**
 * @param name the singular/plural name of the Model
 * @param the schema associated with the model
 */
const User = mongoose.model("User", userSchema);

export default User;
