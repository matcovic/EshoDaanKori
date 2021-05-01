import app from "./express.js";
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const PORT = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@fundraisercluster.waftd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("connected to db");
    // after connecting to database, start the server
    startServer();
  })
  .catch((err) => console.log(err));

function startServer() {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    }
  });
}
