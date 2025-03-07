// backend/index.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Allow CORS (for development)

app.get("/", (req, res) => {
  res.send("Hello from Node.js backend!");
});

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
