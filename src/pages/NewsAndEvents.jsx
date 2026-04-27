import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";
import "../assets/css/variables.css";
import "../assets/css/global.css";
import "../assets/css/pages.css";

export default function NewsAndEvents() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const API =
    import.meta.env.REACT_APP_API_URL || "https://accelia-backend.onrender.com";

  // ───── FETCH DATA ─────
  useEffect(() => {
    fetchNews();
    fetchEvents();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${API}/api/news`);
      const data = await res.json();
      setNews(data.news || []);
    } catch (err) {
      console.error("News fetch error:", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API}/api/events`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Events fetch error:", err);
    }
  };

  // ───── CONTACT FORM ─────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      setSubmitted(true);
      setFormState({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <>
      <Nav />

      <div className="page-wrapper">
        {/* HERO */}
        <div className="page-hero">
          <div className="sec-tag sec-tag--gold">News & Resources</div>
          <h1 className="sec-title sec-title--white">News & Resources</h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            Stay updated with latest news and events.
          </p>
        </div>

        {/* ───────── NEWS ───────── */}
        <section>
          <div className="sec-tag">Latest News</div>
          <h2 className="sec-title">Latest News</h2>

          <div className="news-grid">
            {news.map((n) => (
              <div
                key={n._id}
                className="news-card"
                onClick={() => setModal(n)}
              >
                <div className="news-card__img">📰</div>
                <div className="news-card__body">
                  <span className="news-tag">{n.category}</span>
                  <h3>{n.title}</h3>
                  <p>{n.description}</p>
                  <div className="news-card__date">
                    {new Date(n.date).toDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── EVENTS ───────── */}
        <section>
          <div className="sec-tag">Latest Events</div>
          <h2 className="sec-title">Latest Events</h2>

          <div className="resource-grid">
            {events.map((ev) => (
              <div key={ev._id} className="resource-box">
                <div style={{ fontSize: 22 }}>📅</div>
                <h4>{ev.title}</h4>
                <p>{new Date(ev.date).toDateString()}</p>
                <p>📍 {ev.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── CONTACT FORM ───────── */}
        <section className="contact-form-section">
          <h2>Talk to an Expert</h2>

          {submitted ? (
            <p style={{ color: "green" }}>Message sent successfully!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                value={formState.phone}
                onChange={(e) =>
                  setFormState({ ...formState, phone: e.target.value })
                }
              />

              <textarea
                placeholder="Message"
                required
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
              />

              <button type="submit">Submit</button>
            </form>
          )}
        </section>

        <Footer />
      </div>

      {/* ───────── MODAL ───────── */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModal(null)}>✕</button>
            <h2>{modal.title}</h2>
            <p>{modal.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
