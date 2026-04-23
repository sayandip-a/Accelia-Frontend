import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../shared/Nav';
import Footer from '../shared/Footer';
import { VALUES } from '../shared/constants';
import '../assets/css/About.css';

// Images Import
import team1 from '../assets/images/team1.jpg';
import team2 from '../assets/images/team2.jpg';
import team3 from '../assets/images/team3.jpg';

const STATS = [
  ['30+',    'Clinical Trials Completed'],
  ['1.5 Yrs','Company Age'],
  ['250+',   'Clinician Network'],
  ['6+',     'States Covered'],
  ['15+',    'Therapy Areas'],
  ['100%',   'GCP Compliant'],
];

const TEAM_MEMBERS = [
  { name: 'Dr. S. K. Mitra', role: 'Chief Medical Director', img: team1 },
  { name: 'Arjun Das', role: 'Clinical Operations Head', img: team2 },
  { name: 'Priya Sharma', role: 'Regulatory Affairs Manager', img: team3 },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <div className="page-wrapper">

        {/* ── Hero ── */}
        <section className="about-hero">
          <div className="sec-tag sec-tag--gold">About Accelia</div>
          <h2>Who We Are</h2>
          <p>
            Accelia is a full-service Site Management Organization (SMO) offering tailored support for
            biotechnology and pharmaceutical companies across all phases of clinical trials.
          </p>
        </section>

        {/* ── Story + Stats ── */}
        <section className="about-content-section">
          <div className="about-grid">
            <div className="about-text-col">
              <div className="sec-tag">Our Story</div>
              <h2 className="sec-title">Benchmark in Speed, Precision & Site Excellence</h2>
              <p>
                Accelia Clinical Solutions was founded with a singular mission: to transform clinical trial
                execution across India through operational excellence, regulatory precision, and unwavering
                commitment to patient safety.
              </p>
              <p>
                Headquartered in Kolkata, we operate across all regions of West Bengal and have established
                a strong footprint in Assam, Bhubaneswar, Bihar, and Uttar Pradesh.
              </p>
            </div>

            <div className="about-nums">
              {STATS.map(([n, l], i) => (
                <div key={i} className="about-num">
                  <div className="about-num__n">{n}</div>
                  <div className="about-num__l">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team Section ── */}
        <section className="team-section">
          <div className="sec-tag">Our Team</div>
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="team-member">
                <div className="member-img-wrap">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="member-details">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Values ── */}
        <section className="values-section">
          <div className="sec-tag">Our Values</div>
          <h2 className="sec-title">What Drives Us</h2>
          <p className="sec-sub">
            Six core principles guide every decision, every protocol, and every patient interaction at Accelia.
          </p>
          <div className="values-grid">
            {VALUES.map(({ icon, title, desc }, i) => (
              <div key={i} className="value-card">
                <div className="value-card__icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section-dark">
          <div className="sec-tag sec-tag--gold">Work With Us</div>
          <h2 className="sec-title--white">Ready to Partner With Accelia?</h2>
          <p>
            Join our growing network of sponsors, CROs, and investigator sites driving clinical excellence across India.
          </p>
          <div className="cta-btns">
            <button className="btn-primary" onClick={() => { navigate('/contact'); window.scrollTo(0, 0); }}>
              Contact Us →
            </button>
            <button className="btn-outline-white" onClick={() => { navigate('/careers'); window.scrollTo(0, 0); }}>
              Join Our Team
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}