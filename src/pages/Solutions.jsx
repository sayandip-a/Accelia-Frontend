import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";
import "../assets/css/variables.css";
import "../assets/css/global.css";
import "../assets/css/Solutions.css";
import "../assets/css/pages.css";

const API =
  import.meta.env.REACT_APP_API_URL || "https://accelia-backend.onrender.com";

function SolutionModal({ data, onClose, onContact }) {
  if (!data) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {data.icon && (
          <div style={{ fontSize: 38, marginBottom: 10 }}>{data.icon}</div>
        )}
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={data.title}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderRadius: 10,
              marginBottom: 12,
            }}
          />
        )}
        <span className="m-tag">Solution</span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 26,
            color: "#0B1F3A",
            margin: "10px 0 8px",
          }}
        >
          {data.title}
        </h2>
        <p style={{ color: "#5E6E82", lineHeight: 1.78, marginTop: 12 }}>
          {data.description || data.desc}
        </p>
        <div style={{ marginTop: 22 }}>
          <button
            className="btn-primary"
            onClick={() => {
              onClose();
              onContact();
            }}
          >
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
}

// Skeleton loader card
function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 14,
        overflow: "hidden",
        background: "#f0f0f0",
        height: 260,
        animation: "pulse 1.5s ease infinite",
      }}
    />
  );
}

export default function Solutions() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/solutions`)
      .then((r) => r.json())
      .then((d) => {
        // handle both { solutions: [...] } and plain array
        const data = Array.isArray(d) ? d : d.solutions || [];
        setSolutions(data.filter((s) => s.isActive !== false));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <Nav />
      <div className="page-wrapper">
        {/* Hero */}
        <div className="page-hero">
          <div className="sec-tag sec-tag--gold">Our Solutions</div>
          <h1 className="sec-title sec-title--white">
            Integrated SMO Solutions
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: 600,
              fontSize: 17,
              lineHeight: 1.72,
            }}
          >
            Comprehensive services from site-level execution to regulatory
            excellence, covering every critical need of clinical trial
            management in India.
          </p>
        </div>

        {/* Grid */}
        <section className="solutions-section">
          {error && (
            <p style={{ textAlign: "center", color: "#f43f5e", padding: 40 }}>
              Failed to load solutions. Please try again later.
            </p>
          )}

          <div className="solutions-page-grid">
            {loading ? (
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            ) : solutions.length === 0 && !error ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#5E6E82",
                  gridColumn: "1/-1",
                  padding: 40,
                }}
              >
                No solutions found.
              </p>
            ) : (
              solutions.map((s, i) => (
                <div
                  key={s._id || i}
                  className="solution-card"
                  onClick={() => setModal(s)}
                >
                  <div
                    className="solution-card__img"
                    style={{ backgroundImage: `url(${s.imageUrl || ""})` }}
                  >
                    <div className="solution-card__overlay">
                      <h3>{s.title}</h3>
                      <p>{s.description || s.desc}</p>
                      <span className="btn-know-more">Know More →</span>
                    </div>
                  </div>
                  {s.icon && (
                    <div className="solution-card__icon">{s.icon}</div>
                  )}
                  <div className="solution-card__title">{s.title}</div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          className="cta-dark"
          style={{
            background: "#0B1F3A",
            padding: "100px 20px",
            textAlign: "center",
          }}
        >
          <div className="sec-tag sec-tag--gold">Work With Us</div>
          <h2 className="sec-title sec-title--white">
            Ready to Start Your Clinical Trial?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            Our expert team is ready to support your next clinical trial with
            precision, speed, and compliance.
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              navigate("/contact");
              window.scrollTo(0, 0);
            }}
          >
            Talk to an Expert →
          </button>
        </section>

        <Footer />
      </div>

      <SolutionModal
        data={modal}
        onClose={() => setModal(null)}
        onContact={() => {
          navigate("/contact");
          window.scrollTo(0, 0);
        }}
      />
    </>
  );
}
