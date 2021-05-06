import app from "./express.js";
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to db");
    // after connecting to database, start the server
    startServer();
  })
  .catch((err) => console.log(err));

// we need to set it to false to remove the deprecated warning
mongoose.set("useFindAndModify", false);

function startServer() {
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `server running in ${process.env.NODE_ENV} mode on port ${PORT}: http://localhost:${PORT}`
      );
    }
  });
}
