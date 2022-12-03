import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 5001;
const mongo = process.env.MONGO;

mongoose
  .connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on https://mernbackauth.onrender.com`);
    });
  })
  .catch((error) => console.log(error));