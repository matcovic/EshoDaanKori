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
    fullName: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    nid: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    token: {
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
 * the following operation creates an index on the user collection's 
 * createdAt field and specifies the expireAfterSeconds value of 3600 
 * to set the expiration time to be one hour after the time specified by createdAt.
 */
/* userSchema.index(
  { "createdAt": 1 },
  { expireAfterSeconds: 7200, partialFilterExpression: { verified: false } }
);
 */
/**
 * @param name the singular/plural name of the Model
 * @param the schema associated with the model
 */
const User = mongoose.model("User", userSchema);

export default User;
