const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route (to avoid "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ Create transporter ONLY ONCE
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Verify transporter (VERY IMPORTANT for debugging)
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter Error:", error);
  } else {
    console.log("Server is ready to send emails ✅");
  }
});

// ✅ Route to send email
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // ✅ Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // your Gmail
      to: process.env.EMAIL_USER, // you receive here
      replyTo: email, // user email for reply
      subject: "New Contact Form Message",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Message: ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
