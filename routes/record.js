import express from "express";
import { db } from "../config/firebase.js"; // Import Firestore instance

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, age } = req.body;
    const docRef = await db.collection("users").add({ name, age });
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
