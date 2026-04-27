import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";
import { SOLUTIONS } from "../shared/constants";
import "../assets/css/variables.css";
import "../assets/css/global.css";
import "../assets/css/pages.css";

const CONTACT_DETAILS = [
  { icon: "📧", label: "Email", val: "acceliaclinicalsolution@gmail.com" },
  { icon: "📞", label: "Phone", val: "+91 8282986162" },
  { icon: "📍", label: "Headquarters", val: "Kolkata, West Bengal, India" },
  { icon: "🕐", label: "Response Time", val: "Within 24 business hours" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://accelia-backend.onrender.com/api/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        service: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <>
      <Nav />

      <div className="page-wrapper contact-page">
        {/* Hero */}
        <div className="contact-hero page-hero">
          <div className="sec-tag sec-tag--gold">Contact Us</div>
          <h1 className="sec-title sec-title--white">Get in Touch</h1>
          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: 17,
              lineHeight: 1.72,
              maxWidth: 560,
            }}
          >
            Fill in the form and the right Accelia expert will get back to you
            shortly.
          </p>
        </div>

        {/* Contact Grid */}
        <section style={{ background: "#0B1F3A" }}>
          <div className="contact-grid">
            {/* Left — details */}
            <div>
              <div className="sec-tag">Reach Out</div>
              <h2 className="sec-title sec-title--white">
                Let's Partner Together
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.62)",
                  fontSize: 15.5,
                  lineHeight: 1.78,
                  marginBottom: 36,
                }}
              >
                Whether you're a sponsor, CRO, or institution looking to partner
                with a high-performing SMO, we'd love to hear from you.
              </p>

              {CONTACT_DETAILS.map(({ icon, label, val }, i) => (
                <div key={i} className="c-detail">
                  <div className="c-icon">{icon}</div>
                  <div className="c-text">
                    <p>{label}</p>
                    <p>{val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — form */}
            <div className="c-form">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success__icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>We'll get back to you within 24 business hours.</p>
                  <button
                    className="btn-primary"
                    style={{ margin: "22px auto 0", background: "#1B8FA6" }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="f-grp">
                      <label>Full Name *</label>
                      <input
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={update("name")}
                      />
                    </div>
                    <div className="f-grp">
                      <label>Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={update("email")}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="f-grp">
                      <label>Company / Institution</label>
                      <input
                        placeholder="Organization name"
                        value={form.company}
                        onChange={update("company")}
                      />
                    </div>
                    <div className="f-grp">
                      <label>Country</label>
                      <input
                        placeholder="Your country"
                        value={form.country}
                        onChange={update("country")}
                      />
                    </div>
                  </div>

                  <div className="f-grp" style={{ marginBottom: 14 }}>
                    <label>Service of Interest</label>
                    <select value={form.service} onChange={update("service")}>
                      <option value="">Select a service...</option>
                      {SOLUTIONS.map((s) => (
                        <option key={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="f-grp" style={{ marginBottom: 14 }}>
                    <label>How can we help? *</label>
                    <textarea
                      required
                      placeholder="Tell us about your project or inquiry..."
                      value={form.message}
                      onChange={update("message")}
                    />
                  </div>

                  <div className="form-submit">
                    {error && (
                      <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
                    )}
                    <button
                      type="submit"
                      className="sub-btn"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message →"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
