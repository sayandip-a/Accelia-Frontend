// =====================================================
// Expertise.jsx — Expertise Page
// =====================================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../shared/Nav';
import Footer from '../shared/Footer';
import { EXPERTISE } from '../shared/constants';
import '../assets/css/variables.css';
import '../assets/css/global.css';
import '../assets/css/Expertise.css';
import '../assets/css/pages.css';

function ExpertiseModal({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <span className="m-tag">Expertise</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: '#0B1F3A', margin: '12px 0 8px' }}>
          {data.title}
        </h2>
        <p style={{ color: '#5E6E82', lineHeight: 1.78, marginTop: 12, fontSize: 15 }}>{data.desc}</p>
      </div>
    </div>
  );
}

export default function Expertise() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <Nav />

      <div className="page-wrapper">
        {/* Hero */}
        <div className="page-hero">
          <div className="sec-tag sec-tag--gold">Therapeutic Expertise</div>
          <h1 className="sec-title sec-title--white">Our Areas of Expertise</h1>
          <p style={{ color: 'rgba(255,255,255,0.62)', maxWidth: 620, fontSize: 17, lineHeight: 1.72 }}>
            Precision-driven execution across all critical specialty and therapeutic areas —
            backed by deep clinical knowledge and GCP-trained teams.
          </p>
        </div>

        {/* Expertise Grid */}
        <section>
          <div className="expertise-grid">
            {EXPERTISE.map((e, i) => (
              <div key={i} className="expertise-card" onClick={() => setModal(e)}>
                <h3>{e.title}</h3>
                <p>{e.desc.substring(0, 130)}...</p>
                <div className="expertise-card__more">Read More →</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-section">
          <h2>Talk to an Expert Team Member</h2>
          <p>
            Receive a timely response to an enquiry about a service, process or technical questions.<br />
            Enter your details and the right person at Accelia will get in touch with you soon.
          </p>

          {submitted ? (
            <div style={{ color: '#4ade80', padding: '20px 0' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>Message sent! We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="expert-contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formState.phone}
                  onChange={e => setFormState({ ...formState, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <textarea
                  rows="5"
                  required
                  placeholder="Your Message"
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          )}
        </section>

        <Footer />
      </div>

      <ExpertiseModal data={modal} onClose={() => setModal(null)} />
    </>
  );
}
