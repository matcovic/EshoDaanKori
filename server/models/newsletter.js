import mongoose from "mongoose";

const Schema = mongoose.Schema;
const newsletterSchema = new Schema(
  {
    emails: [],
  },
  { collection: "news_letter" }
);

/**
 * @param name the singular/plural name of the Model
 * @param the schema associated with the model
 */
const NewsLetter = mongoose.model("news_letter", newsletterSchema);

export default NewsLetter;
