import express from "express";
import { nodeMailer } from "../controllers/nodeMailer.js";
import { getUsers, loginUser, submitOTP, userRegister } from "../controllers/userController.js";

const router = express.Router();

// router.get("/posts", showProducts);
router.post("/register", userRegister);
router.post("/signin", loginUser);
router.post("/mail", nodeMailer);
// router.post("/send-otp", sendOTP);
router.post("/submit-otp", submitOTP);
router.get("/getusers", getUsers);
// router.delete("/delete/:id", productDelete);
// router.put("/update/:id", productUpdate);

export default router;