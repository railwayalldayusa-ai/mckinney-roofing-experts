import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendLeadEmail(data) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const emailBody =
    "New Roofing Lead\n\n" +
    "Name: " + data.name + "\n" +
    "Phone: " + data.phone + "\n" +
    "Email: " + data.email + "\n" +
    "Service: " + data.service + "\n\n" +
    "Message:\n" + data.message;

  const mailOptions = {
    from: "Roofing Leads <onboarding@resend.dev>",
    to: process.env.MY_EMAIL,
    subject: "New Roofing Lead",
    text: emailBody
  };

  return transporter.sendMail(mailOptions);
}
