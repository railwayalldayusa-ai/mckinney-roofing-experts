import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { sendLeadEmail } from "./utils/resend.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// API: Send lead
app.post("/api/lead", async (req, res) => {
  try {
    const response = await sendLeadEmail(req.body);
    res.json({ success: true, message: "Email sent", response });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// SPA fallback (root)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("SERVER RUNNING: http://localhost:" + PORT);
});
