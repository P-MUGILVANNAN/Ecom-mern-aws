import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmailJS = () => {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: "Mugilvannan P", // Or whoever should receive it
      message: formData.message,
    };

    emailjs
      .send(
        "service_clts9rs",    // 🔁 Replace with your EmailJS Service ID
        "template_rs0dqel",   // 🔁 Replace with your Template ID
        templateParams,
        "xbR15LwPRtNlxyzKP"     // 🔁 Replace with your Public Key (NOT private key)
      )
      .then((response) => {
        console.log("✅ Email sent:", response.text);
      })
      .catch((err) => {
        console.error("❌ EmailJS error:", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend (MongoDB)
      const response = await axios.post("http://localhost:5000/api/contact/submit", formData);
      setMessage(response.data.message);

      // Send email via EmailJS
      sendEmailJS();

      // Clear the form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setMessage("Error submitting the form. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="mb-4">Contact Us</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>

        <div className="col-md-6 text-center">
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg"
            alt="Contact Us"
            className="img-fluid rounded shadow"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
