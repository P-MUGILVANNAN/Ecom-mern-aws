const express = require("express");
const Contact = require("../model/ContactSchema"); // Import Contact model

const router = express.Router();

// Contact form submission route
router.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new contact entry
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
