// components/ContactForm.js
"use client";
import { useState } from "react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, subject, message }),
    });

    const result = await response.json();

    if (response.ok) {
      setStatus("Email sent successfully!");
    } else {
      setStatus("Failed to send email.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit" className="bg-red-400 p-4">
        Send
      </button>
      {status && <p>{status}</p>}
    </form>
  );
};

// pages/contact.js
const ContactPage = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
