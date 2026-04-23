// =====================================================
// Locations.jsx — Locations Page
// =====================================================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../shared/Nav';
import Footer from '../shared/Footer';
import { LOCATIONS } from '../shared/constants';
import '../assets/css/variables.css';
import '../assets/css/global.css';
import '../assets/css/pages.css';

const REGIONS = [
  {
    id: 'asia',
    label: 'Asia-Pacific',
    heading: 'Asia-Pacific Offices',
    desc: 'Our regional hub in Singapore coordinates with offices in India, South Korea, and Australia to deliver cost-effective, regulatory-compliant clinical operations.',
    offices: [
      { country: 'Singapore', detail: '100 Cross Street, Singapore 048421' },
      { country: 'India',     detail: 'Bangalore, Hyderabad' },
      { country: 'South Korea', detail: 'Seoul' },
      { country: 'Australia', detail: 'Sydney, Melbourne' },
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26584.524730884927!2d103.8500437!3d1.2904759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a308e65a2d%3A0xdee37b32b0dd8b55!2sSingapore!5e0!3m2!1sen!2ssg!4v1689939846945!5m2!1sen!2ssg',
  },
  {
    id: 'europe',
    label: 'Europe',
    heading: 'European Offices',
    desc: 'Strategically located in Western and Eastern Europe, our offices provide agile solutions for multicenter clinical trials.',
    offices: [
      { country: 'Germany',        detail: 'Frankfurt' },
      { country: 'United Kingdom', detail: 'London' },
      { country: 'Poland',         detail: 'Warsaw' },
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100408.04921141723!2d8.5511379!3d50.1109221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bda9c0f0a1e481%3A0x6e5e4571967b2d71!2sFrankfurt%2C%20Germany!5e0!3m2!1sen!2sde!4v1689940074170!5m2!1sen!2sde',
  },
  {
    id: 'north',
    label: 'North America',
    heading: 'North American Offices',
    desc: "Accelia's presence in North America ensures alignment with FDA regulations and deep access to patient populations.",
    offices: [
      { country: 'USA',    detail: 'Boston, San Francisco' },
      { country: 'Canada', detail: 'Toronto' },
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.708906231059!2d-71.05888098454292!3d42.3600829791866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370aaf30425e3%3A0x62f2aa26de0d13b7!2sBoston%2C%20MA!5e0!3m2!1sen!2sus!4v1689940126574!5m2!1sen!2sus',
  },
];

export default function Locations() {
  const [activeTab, setActiveTab] = useState('asia');
  const activeRegion = REGIONS.find(r => r.id === activeTab);

  return (
    <>
      <Nav />

      <div className="page-wrapper locations-page">

        {/* Intro */}
        <div className="locations-intro">
          <div className="sec-tag sec-tag--gold">Our Locations</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4vw,56px)', fontWeight:700, color:'#fff', marginBottom:16 }}>
            Pan-India Clinical Presence
          </h2>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:17, lineHeight:1.75, maxWidth:680, margin:'0 auto' }}>
            With Kolkata as our strategic hub, Accelia's presence spans across all regions of West Bengal
            and key locations including Assam, Bhubaneswar, Bihar, and Uttar Pradesh — driving clinical
            excellence at every site.
          </p>
        </div>

        {/* India Offices Grid */}
        <section>
          <div className="sec-tag">India Operations</div>
          <h2 className="sec-title">Where We Operate in India</h2>
          <p className="sec-sub">Our primary operations are headquartered in Kolkata with a growing multi-state clinical network.</p>

          <div className="loc-grid" style={{ marginBottom:52 }}>
            {LOCATIONS.map((l, i) => (
              <div key={i} className={`loc-card${l.hq ? ' loc-card--hq' : ''}`}>
                <div className="loc-card__icon">{l.icon}</div>
                <h3>{l.name}</h3>
                <p>{l.note}</p>
                {l.hq && <div className="hq-badge">HQ</div>}
              </div>
            ))}
          </div>

          {/* HQ Detail Card */}
          <div className="hq-info">
            <h3>Headquarters — Kolkata, West Bengal</h3>
            <p>
              Accelia Clinical Solutions is headquartered in Kolkata, West Bengal — the clinical research
              hub of Eastern India. From here, our leadership team coordinates all operational, regulatory,
              and business functions across our expanding multi-state network.
            </p>
            <div className="hq-contacts">
              <div className="hq-contact">
                <span>📧</span>
                <span>acceliaclinicalsolution@gmail.com</span>
              </div>
              <div className="hq-contact">
                <span>📞</span>
                <span>+91 8282986162</span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Offices with Tabs */}
        <section style={{ background:'#F2F7FA' }}>
          <div className="sec-tag">Global Presence</div>
          <h2 className="sec-title">Our Global Presence</h2>
          <p className="sec-sub">
            With a strong international footprint, Accelia operates clinical research offices throughout
            Asia-Pacific, North America, and Europe, providing expert support wherever you are.
          </p>

          {/* Tabs */}
          <div className="region-tabs" style={{ padding:0, background:'transparent', border:'none', marginBottom:36 }}>
            {REGIONS.map(r => (
              <button
                key={r.id}
                className={`tab-button${activeTab === r.id ? ' active' : ''}`}
                onClick={() => setActiveTab(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Active Panel */}
          {activeRegion && (
            <div style={{ animation:'fadeUp 0.35s ease' }}>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:'#0B1F3A', marginBottom:14 }}>
                {activeRegion.heading}
              </h3>
              <p style={{ color:'#5E6E82', fontSize:15.5, lineHeight:1.78, maxWidth:680, marginBottom:20 }}>
                {activeRegion.desc}
              </p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
                {activeRegion.offices.map((o, i) => (
                  <li key={i} style={{ fontSize:14.5, color:'#0B1F3A', paddingLeft:16, position:'relative' }}>
                    <span style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', width:6, height:6, background:'#1B8FA6', borderRadius:'50%', display:'inline-block' }} />
                    <strong>{o.country}:</strong> {o.detail}
                  </li>
                ))}
              </ul>
              <div className="map-embed">
                <iframe
                  src={activeRegion.mapSrc}
                  width="100%"
                  height="300"
                  style={{ border:0, borderRadius:14, display:'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={activeRegion.heading}
                />
              </div>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
