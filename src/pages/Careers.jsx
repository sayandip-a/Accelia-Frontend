import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";
import "../assets/css/variables.css";
import "../assets/css/global.css";
import "../assets/css/pages.css";

const API_URL = "https://accelia-backend.onrender.com/api/jobs";

const DEPARTMENTS = [
  {
    icon: "🔬",
    title: "Clinical Operations",
    desc: "Manage trials with precision and impact, improving patient outcomes.",
  },
  {
    icon: "📊",
    title: "Project Management",
    desc: "Lead complex projects across global sites with strategic oversight.",
  },
  {
    icon: "📈",
    title: "Biometrics",
    desc: "Deliver data-driven insights with accuracy and regulatory alignment.",
  },
  {
    icon: "⚕️",
    title: "Medical Affairs",
    desc: "Bridge science and strategy through clinical expertise and evidence.",
  },
  {
    icon: "📋",
    title: "Regulatory Affairs",
    desc: "Navigate complex global regulations to support trial success.",
  },
  {
    icon: "🏢",
    title: "Corporate Services",
    desc: "Support teams in HR, Finance, and Legal driving our mission forward.",
  },
];

const WHY = [
  {
    icon: "🚀",
    title: "Fast-Growing",
    desc: "Be part of one of India's fastest-growing SMOs — 30+ trials in just 18 months.",
  },
  {
    icon: "🌍",
    title: "Pan-India Impact",
    desc: "Work across multiple states and therapeutic areas with diverse sponsor portfolios.",
  },
  {
    icon: "🎓",
    title: "Continuous Learning",
    desc: "Access GCP workshops, training programs, and professional development opportunities.",
  },
  {
    icon: "🤝",
    title: "Collaborative Culture",
    desc: "A team-first environment where innovation, integrity, and excellence are celebrated.",
  },
];

// ================= APPLY MODAL =================
function ApplyModal({ job, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  if (!job) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <span className="m-tag">Apply Now</span>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 22,
            color: "#0B1F3A",
            margin: "10px 0 6px",
          }}
        >
          {job.title}
        </h2>

        <p style={{ color: "#5E6E82", marginBottom: 22, fontSize: 13.5 }}>
          📍 {job.location} &nbsp;|&nbsp; ⏱ {job.type} &nbsp;|&nbsp; 🏢{" "}
          {job.dept}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              label: "Full Name *",
              key: "name",
              type: "text",
              placeholder: "Your full name",
            },
            {
              label: "Email *",
              key: "email",
              type: "email",
              placeholder: "your@email.com",
            },
            {
              label: "Phone",
              key: "phone",
              type: "tel",
              placeholder: "+91 XXXXXXXXXX",
            },
          ].map((f) => (
            <div key={f.key}>
              <label
                style={{
                  display: "block",
                  color: "#5E6E82",
                  fontSize: 12.5,
                  marginBottom: 5,
                  fontWeight: 500,
                }}
              >
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                style={{
                  width: "100%",
                  background: "#F2F7FA",
                  border: "1px solid #D8E4ED",
                  borderRadius: 9,
                  padding: "11px 14px",
                  fontSize: 13.5,
                }}
              />
            </div>
          ))}

          <textarea
            placeholder="Tell us about your experience..."
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            style={{ width: "100%", minHeight: 100, padding: "10px" }}
          />

          <button
            className="sub-btn"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Submit Application →
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= MAIN COMPONENT =================
export default function Careers() {
  const navigate = useNavigate();

  const [applyJob, setApplyJob] = useState(null);
  const [toast, setToast] = useState("");

  // 🔥 NEW STATE
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH JOBS FROM BACKEND
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSubmit = () => {
    setToast("Application submitted! We'll contact you soon.");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <>
      <Nav />

      <div className="page-wrapper">
        {/* HERO */}
        <div className="page-hero">
          <div className="sec-tag sec-tag--gold">Careers</div>
          <h1 className="sec-title sec-title--white">
            Join Accelia Clinical Solutions
          </h1>
        </div>

        {/* OPEN JOBS */}
        <section>
          <div className="sec-tag">Open Positions</div>
          <h2 className="sec-title">Current Openings</h2>

          <div className="job-list">
            {loading ? (
              <p className="sec-sub" style={{ textAlign: "center" }}>
                Loading jobs...
              </p>
            ) : jobs.length === 0 ? (
              <p className="sec-sub" style={{ textAlign: "center" }}>
                No jobs available
              </p>
            ) : (
              jobs.map((j, i) => (
                <div key={i} className="job-card">
                  <div className="job-info">
                    <h3>{j.title}</h3>

                    <div className="job-meta">
                      <span className="j-tag">{j.dept}</span>
                      <span>📍 {j.location}</span>
                      <span>⏱ {j.type}</span>
                    </div>
                  </div>

                  <button className="btn-apply" onClick={() => setApplyJob(j)}>
                    Apply Now
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* WHY SECTION */}
        <section style={{ background: "#F2F7FA" }}>
          <div className="sec-tag">Why Accelia</div>
          <h2 className="sec-title">Why Work With Us</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(235px,1fr))",
              gap: 18,
            }}
          >
            {WHY.map((item, i) => (
              <div key={i} className="why-card">
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>

      {/* APPLY MODAL */}
      <ApplyModal
        job={applyJob}
        onClose={() => setApplyJob(null)}
        onSubmit={handleSubmit}
      />

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
