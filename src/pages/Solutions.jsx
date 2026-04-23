// =====================================================
// Solutions.jsx — Solutions Page
// =====================================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../shared/Nav';
import Footer from '../shared/Footer';
import { SOLUTIONS } from '../shared/constants';
import '../assets/css/variables.css';
import '../assets/css/global.css';
import '../assets/css/Solutions.css';
import '../assets/css/pages.css';

// Images Import
import clinicalImg from '../assets/images/clinical.jpg';
import regulatoryImg from '../assets/images/regulatory.jpg';
import dataimage from '../assets/images/data.jpg';
import medicalImg from '../assets/images/medical.jpg';
import biostatisticsImg from '../assets/images/statistics.jpg';
import monitoringImg from '../assets/images/monitoring.jpg';
import pharmacovigilance from '../assets/images/Pharmacovigilance.jpg';
import logisticsImg from '../assets/images/logistics.jpg';
import projectImg from '../assets/images/project.jpg';

const SOLUTION_IMAGES = [
  clinicalImg, regulatoryImg, dataimage, medicalImg,
  biostatisticsImg, monitoringImg, pharmacovigilance,
  logisticsImg, projectImg, projectImg, projectImg,
];

function SolutionModal({ data, onClose, onContact }) {
  if (!data) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ fontSize: 38, marginBottom: 10 }}>{data.icon}</div>
        <span className="m-tag">Solution</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: '#0B1F3A', margin: '10px 0 8px' }}>
          {data.title}
        </h2>
        <p style={{ color: '#5E6E82', lineHeight: 1.78, marginTop: 12 }}>{data.desc}</p>
        <div style={{ marginTop: 22 }}>
          <button className="btn-primary" onClick={() => { onClose(); onContact(); }}>Get Started →</button>
        </div>
      </div>
    </div>
  );
}

export default function Solutions() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  return (
    <>
      <Nav />
      <div className="page-wrapper">
        
        {/* Hero Section */}
        <div className="page-hero">
          <div className="sec-tag sec-tag--gold">Our Solutions</div>
          <h1 className="sec-title sec-title--white">Integrated SMO Solutions</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, fontSize: 17, lineHeight: 1.72 }}>
            Comprehensive services from site-level execution to regulatory excellence,
            covering every critical need of clinical trial management in India.
          </p>
        </div>

        {/* Solutions Grid Section */}
        <section className="solutions-section">
          <div className="solutions-page-grid">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="solution-card" onClick={() => setModal(s)}>
                
                {/* 1. Image Area with Hover Overlay */}
                <div 
                  className="solution-card__img" 
                  style={{ backgroundImage: `url(${SOLUTION_IMAGES[i]})` }}
                >
                  <div className="solution-card__overlay">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <span className="btn-know-more">Know More →</span>
                  </div>
                </div>

                {/* 2. Content Below Image (Visible by default) */}
                <div className="solution-card__icon">{s.icon}</div>
                <div className="solution-card__title">{s.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-dark" style={{ background: '#0B1F3A', padding: '100px 20px', textAlign: 'center' }}>
          <div className="sec-tag sec-tag--gold">Work With Us</div>
          <h2 className="sec-title sec-title--white">Ready to Start Your Clinical Trial?</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto 40px' }}>
            Our expert team is ready to support your next clinical trial with precision, speed, and compliance.
          </p>
          <button className="btn-primary" onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}>
            Talk to an Expert →
          </button>
        </section>

        <Footer />
      </div>

      <SolutionModal
        data={modal}
        onClose={() => setModal(null)}
        onContact={() => { navigate('/contact'); window.scrollTo(0, 0); }}
      />
    </>
  );
}