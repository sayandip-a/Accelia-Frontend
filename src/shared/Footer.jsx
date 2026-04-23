// =====================================================
// Footer.jsx — Shared Footer Component
// =====================================================
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/pages.css';

const FOOTER_PAGES = ['/', '/solutions', '/expertise', '/about', '/news', '/careers', '/locations', '/contact'];
const FOOTER_LABELS = ['Home', 'Solutions', 'Expertise', 'About', 'News & Events', 'Careers', 'Locations', 'Contact'];

const SERVICES = [
  'Clinical Trial Management',
  'Regulatory Consulting',
  'Medical Writing',
  'GCP Training',
  'Audit Support',
  'Archival of Clinical Data',
];

export default function Footer() {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer>
      <div className="ft-grid">
        {/* Brand */}
        <div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
            Accelia Clinical Solutions
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 280 }}>
            Advancing Clinical Excellence with Integrity, Compliance, and Precision.
            Headquartered in Kolkata, West Bengal.
          </p>
        </div>

        {/* Navigation */}
        <div className="ft-col">
          <h4>Navigate</h4>
          {FOOTER_PAGES.map((path, i) => (
            <button key={path} onClick={() => handleNav(path)}>{FOOTER_LABELS[i]}</button>
          ))}
        </div>

        {/* Services */}
        <div className="ft-col">
          <h4>Services</h4>
          {SERVICES.map(s => <a key={s}>{s}</a>)}
        </div>

        {/* Contact */}
        <div className="ft-col">
          <h4>Contact</h4>
          <a href="mailto:acceliaclinicalsolution@gmail.com">acceliaclinicalsolution@gmail.com</a>
          <a href="tel:+918282986162">+91 8282986162</a>
          <button onClick={() => handleNav('/locations')}>📍 Kolkata (HQ), West Bengal</button>
        </div>
      </div>

      <div className="ft-bottom">
        <span style={{ color: 'rgba(255,255,255,0.45)' }}>
          © 2025 <span style={{ color: '#1B8FA6' }}>Accelia Clinical Solutions</span>. All rights reserved.
        </span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>
          Advancing Clinical Excellence with Integrity, Compliance, and Precision.
        </span>
      </div>
    </footer>
  );
}
