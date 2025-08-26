// File: components/GetInTouchForm.jsx
import React, { useState } from "react";

const GetInTouchForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email || !form.message) {
      setError("Please fill out all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Clear error and mark submitted
    setError("");
    setSubmitted(true);

    // TODO: Send data to API endpoint
    console.log("Form submitted:", form);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      {!submitted ? (
        <>
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            ></textarea>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </>
      ) : (
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Thank you!
          </h2>
          <p className="text-gray-600 mt-2">
            Your message has been sent. We’ll get back to you shortly.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={() => setSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      )}
    </div>
  );
};

export default GetInTouchForm;
