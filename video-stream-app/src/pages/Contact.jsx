import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    submissionDate: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const sheetUrl =
      "https://script.google.com/macros/s/AKfycbzRzWR7aAekb_txpb2XZP4KN2mBZi19L8nqld0PkUPlSWvcXyw21gLOSS-2kTRWztuR/exec";

    const formToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formToSubmit.append(key, formData[key]);
    });

    try {
      // Send form data to Google Sheets
      const response = await fetch(sheetUrl, {
        method: "POST",
        body: formToSubmit,
      });

      if (response.ok) {
        alert("Form submitted successfully.");
        // window.location.href = "/thankyou.html"; // Redirect to thank you page
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Main Content */}
      <div className="container mx-auto p-6 flex items-stretch flex-col lg:flex-row gap-8">
        {/* Contact Details */}
        <div className="contact-details bg-white shadow-lg rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-bold text-[#2c698d] mb-4">
            Get in Touch
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <MapPin className="mr-3 text-[#2c698d]" size={20} />
              <span>Tripolia Bazaar, Rawaton Ka Bass, Jodhpur, Rajasthan 342001, India.</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-3 text-[#2c698d]" size={20} />
              <span>+91 9680799017</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-3 text-[#2c698d]" size={20} />
              <span>safeboxhub@gmail.com</span>
            </li>
            <li className="flex items-center">
              <Clock className="mr-3 text-[#2c698d]" size={20} />
              <span>Monday-Friday: 10 AM - 6 PM</span>
            </li>
          </ul>
        </div>

        <div className="contact-form bg-white shadow-lg rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-bold text-[#2c698d] mb-4">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-dark"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-dark"
                required
              />
            </div>
            {/* Phone */}
            <div>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-dark"
                required
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-dark"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2c698d] text-white uppercase bold py-3 px-4 rounded-lg mt-4 hover:bg-[#272643] disabled:opacity-50 border-none"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Send Message"}
            </button>
          </form>

          {/* Error message */}
          {error && (
            <div className="mt-4 text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
