import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from './config/db.js';
import userRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
dotenv.config();
const app = express();
const PORT = 8000;
 // For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use CORS with environment variable support

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();
app.use(express.json())
app.use("/api/auth", userRoutes)
app.use("/api/resume", resumeRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", "https://localhost:5173");
    },
  })
);

app.get('/', (req, res) => {
  res.send('API WORKING')
});

// Connect to DB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`)
  });
}).catch((err) => {
  console.error("Failed to connect to DB", err);
});