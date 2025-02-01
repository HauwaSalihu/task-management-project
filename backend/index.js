import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/mongodbConnection.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: [
      "https://task-management-project-0bpq.onrender.com",
      "https://task-management-project-0bpq.onrender.com/",
      "http://localhost:5173/",
      "http://localhost:5173",
    ],
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Connected");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${PORT}`);
});
