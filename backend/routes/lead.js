import express from "express";
import { sendLeadEmail } from "../utils/resend.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, phone, email, service, message } = req.body;

  if (!name || !phone || !email || !service) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await sendLeadEmail(req.body);
    res.json({ success: true, message: "Lead sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send lead" });
  }
});

export default router;
