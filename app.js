import express from "express";
import cors from "cors";
// import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import bodyParser from "body-parser";


const app = express();

// Middleware
app.use(bodyParser.json({limit: "30mb", exteded: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());;

app.use("/", userRoute);

export default app;