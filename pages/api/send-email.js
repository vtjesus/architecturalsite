// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, description } = req.body;

    // Set up your email credentials from environment variables
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // Send email to the site owner
      await transporter.sendMail({
        from: process.env.EMAIL_USER, // Your email (sender)
        to:  process.env.EMAIL_REC, // Your email 
        subject: "New Client Inquiry",
        text: `Client Inquiry Details:
        Name: ${name}
        Email: ${email}
        Description: ${description}`,
        html: `<h3>Client Inquiry Details:</h3>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Description:</strong> ${description}</p>`,
      });

      // Response to the frontend that the email was sent
      res
        .status(200)
        .json({ message: "Notification email sent successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
