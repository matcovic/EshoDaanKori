import mongoose from "mongoose";
const Schema = mongoose.Schema;

var imageSchema = new Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});
export default imageSchema;
