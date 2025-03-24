import express from "express";
import cors from "cors";
import userRoutes from './routes/users.js';
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});