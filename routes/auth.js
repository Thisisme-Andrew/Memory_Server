import express from "express";
import { auth } from "../config/firebase.js";

const router = express.Router();

router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await auth.verifyIdToken(token);
    res.json({ success: true, userId: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ success: false, error: "Invalid token" });
  }
});

export default router;
