import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../shared/Nav';
import Footer from '../shared/Footer';
import { NEWS } from '../shared/constants';
import '../assets/css/variables.css';
import '../assets/css/global.css';
import '../assets/css/pages.css';

const REPORTS = [
  { title:"Annual SMO Performance Report 2024', summary:'Comprehensive review of Accelia's trial performance, recruitment metrics, and site quality across all therapeutic areas." },
  { title:"GCP Compliance Audit Summary Q4 2024', summary:'Internal audit findings and corrective action plans ensuring data integrity and regulatory alignment." },
  { title:"Oncology Trial Recruitment Benchmark Report', summary:'An analysis of recruitment performance across Accelia's oncology portfolio, comparing actual vs planned enrollment." },
  { title:'Ethics Committee Registration Guide 2025', summary:'A practical guide for research institutions navigating the EC registration and re-registration process in India.' },
];

const EVENTS = [
  { title:'GCP Workshop – Kolkata', date:'May 15, 2025',    location:'Kolkata, West Bengal' },
  { title:'Clinical Research Summit 2025', date:'June 8, 2025', location:'Hyderabad' },
  { title:'Site Investigator Training – West Bengal', date:'July 3, 2025', location:'Multiple Sites, WB' },
  { title:'Annual SMO Leadership Conclave', date:'August 20, 2025', location:'Kolkata, West Bengal' },
];

const FAQS = [
  { q:'What services does Accelia offer?', a:'Accelia provides end-to-end site management including clinical trial management, regulatory consulting, medical writing, GCP training, audit support, and more.' },
  { q:'Where is Accelia headquartered?', a:'Accelia Clinical Solutions is headquartered in Kolkata, West Bengal, with operations across multiple Indian states.' },
  { q:'How many clinical trials has Accelia completed?', a:'Accelia has successfully completed 30+ clinical trials in just 1.5 years of operations, consistently surpassing sponsor timelines.' },
  { q:'Can Accelia support multi-center trials?', a:'Yes. With a 250+ clinician network spanning West Bengal, Assam, Bhubaneswar, Bihar, and Uttar Pradesh, we are well-equipped for multi-center, multi-state trials.' },
];

function NewsModal({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ fontSize:44, marginBottom:14 }}>{data.icon}</div>
        <span className="m-tag">{data.tag}</span>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, color:'#0B1F3A', margin:'10px 0 8px' }}>
          {data.title}
        </h2>
        <p style={{ color:'#5E6E82', fontSize:14.5, lineHeight:1.75 }}>{data.body}</p>
        <p style={{ color:'#1B8FA6', fontSize:12.5, marginTop:14, fontWeight:600 }}>{data.date}</p>
      </div>
    </div>
  );
}

export default function NewsAndEvents() {
  const [modal, setModal] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formState, setFormState] = useState({ name:'', email:'', phone:'', message:'' });
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
          <div className="sec-tag sec-tag--gold">News & Resources</div>
          <h1 className="sec-title sec-title--white">News & Resources</h1>
          <p style={{ color:'rgba(255,255,255,0.62)', fontSize:17, lineHeight:1.72, maxWidth:600 }}>
            Stay informed with Accelia's latest milestones, events, clinical research insights,
            and resources for sponsors, investigators, and research teams.
          </p>
        </div>

        {/* Latest News */}
        <section>
          <div className="sec-tag">Latest News</div>
          <h2 className="sec-title">Latest News</h2>
          <div className="news-grid">
            {NEWS.map((n, i) => (
              <div key={i} className="news-card" onClick={() => setModal(n)}>
                <div className="news-card__img" style={{ background: n.bg }}>{n.icon}</div>
                <div className="news-card__body">
                  <span className="news-tag">{n.tag}</span>
                  <h3>{n.title}</h3>
                  <p>{n.body}</p>
                  <div className="news-card__date">{n.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:28 }}>
            <Link to="#" className="view-all-btn">View All News</Link>
          </div>
        </section>

        {/* Latest Reports */}
        <section style={{ background:'#F2F7FA' }}>
          <div className="sec-tag">Latest Reports</div>
          <h2 className="sec-title">Latest Reports</h2>
          <div className="resource-grid">
            {REPORTS.map((r, i) => (
              <div key={i} className="resource-box">
                <div style={{ fontSize:22, marginBottom:10 }}>📄</div>
                <h4 style={{ fontSize:14.5, fontWeight:600, color:'#0B1F3A', marginBottom:7, lineHeight:1.35 }}>{r.title}</h4>
                <p style={{ fontSize:13, color:'#5E6E82', lineHeight:1.6 }}>{r.summary}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:28 }}>
            <Link to="#" className="view-all-btn">View All Reports</Link>
          </div>
        </section>

        {/* Latest Events */}
        <section id="events-section">
          <div className="sec-tag">Latest Events</div>
          <h2 className="sec-title">Latest Events</h2>
          <div className="resource-grid">
            {EVENTS.map((ev, i) => (
              <div key={i} className="resource-box" style={{ cursor:'default' }}>
                <div style={{ fontSize:22, marginBottom:10 }}>📅</div>
                <h4 style={{ fontSize:14.5, fontWeight:600, color:'#0B1F3A', marginBottom:6, lineHeight:1.35 }}>{ev.title}</h4>
                <p style={{ fontSize:13, color:'#1B8FA6', fontWeight:500, marginBottom:4 }}>{ev.date}</p>
                <p style={{ fontSize:13, color:'#5E6E82' }}>📍 {ev.location}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:28 }}>
            <Link to="#" className="view-all-btn">View All Events</Link>
          </div>
        </section>

        {/* Latest FAQs */}
        <section style={{ background:'#F2F7FA' }}>
          <div className="sec-tag">Latest FAQs</div>
          <h2 className="sec-title">Frequently Asked Questions</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:12, maxWidth:780 }}>
            {FAQS.map((f, i) => (
              <div
                key={i}
                style={{
                  background:'#fff',
                  border:'1px solid #D8E4ED',
                  borderRadius:12,
                  overflow:'hidden',
                  transition:'all 0.2s',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width:'100%', textAlign:'left', padding:'18px 22px',
                    background:'none', border:'none', cursor:'pointer',
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    fontFamily:'inherit', fontSize:15, fontWeight:600, color:'#0B1F3A',
                  }}
                >
                  {f.q}
                  <span style={{ color:'#1B8FA6', fontSize:20, flexShrink:0, marginLeft:12 }}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ padding:'0 22px 18px', fontSize:14, color:'#5E6E82', lineHeight:1.72 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop:28 }}>
            <Link to="#" className="view-all-btn">View All FAQs</Link>
          </div>
        </section>

        {/* Expert Contact Form */}
        <section className="contact-form-section">
          <h2>Talk to an Expert Team Member</h2>
          <p>
            Receive a timely response to an enquiry about a service, process or technical questions.<br />
            Enter your details and the right person at Accelia will get in touch with you soon.
          </p>

          {submitted ? (
            <div style={{ color:'#4ade80', padding:'20px 0' }}>
              <div style={{ fontSize:36, marginBottom:10 }}>✅</div>
              <p style={{ color:'#fff', fontWeight:600, fontSize:16 }}>Message sent! We'll respond within 24 hours.</p>
            </div>
          ) : (
            <form className="expert-contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ne-name">Full Name</label>
                <input id="ne-name" type="text" required value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="ne-email">Email Address</label>
                <input id="ne-email" type="email" required value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="ne-phone">Phone Number</label>
                <input id="ne-phone" type="tel" value={formState.phone}
                  onChange={e => setFormState({ ...formState, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="ne-message">Your Message</label>
                <textarea id="ne-message" rows="5" required value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })} />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          )}
        </section>

        <Footer />
      </div>

      <NewsModal data={modal} onClose={() => setModal(null)} />
    </>
  );
}
