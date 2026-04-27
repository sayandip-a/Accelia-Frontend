import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/variables.css";
import "../assets/css/Nav.css";
import logo from "../assets/images/logo.png";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Solutions", path: "/solutions" },
  { label: "Expertise", path: "/expertise" },
  { label: "About", path: "/about" },
  { label: "News & Events", path: "/news" },
  { label: "Careers", path: "/careers" },
  { label: "Locations", path: "/locations" },
];

const ADMIN_URL = "https://accelia-admin.vercel.app/login";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  };

  const handleAdminLogin = () => {
    window.open(ADMIN_URL, "_blank", "noopener,noreferrer");
    setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        .admin-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 8px;
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%);
          border: 1px solid rgba(38,181,207,0.35);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.02em;
          transition: all 0.22s ease;
          position: relative;
          overflow: hidden;
        }
        .admin-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(38,181,207,0.15), transparent);
          opacity: 0;
          transition: opacity 0.22s;
        }
        .admin-btn:hover::before { opacity: 1; }
        .admin-btn:hover {
          border-color: rgba(38,181,207,0.7);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(38,181,207,0.25);
        }
        .admin-btn:active { transform: translateY(0); }
        .admin-btn__icon {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: linear-gradient(135deg, #26B5CF, #0B8FAA);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .admin-btn__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #26B5CF;
          flex-shrink: 0;
          animation: adminPulse 2s ease-in-out infinite;
        }
        @keyframes adminPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(38,181,207,0.5); }
          50% { opacity: 0.6; box-shadow: 0 0 0 5px rgba(38,181,207,0); }
        }
        .admin-btn-mobile {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0B1F3A, #1a3a5c);
          border: 1px solid rgba(38,181,207,0.3);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          margin-top: 10px;
          transition: all 0.2s;
          text-align: left;
        }
        .admin-btn-mobile:hover {
          border-color: rgba(38,181,207,0.6);
          box-shadow: 0 4px 16px rgba(38,181,207,0.2);
        }
        .admin-btn-mobile__icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: linear-gradient(135deg, #26B5CF, #0B8FAA);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(38,181,207,0.3);
        }
      `}</style>

      <nav className="nav">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Accelia logo" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="nav__links">
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              className={`nav__link${location.pathname === path ? " active" : ""}`}
              onClick={() => handleNav(path)}
            >
              {label}
            </button>
          ))}

          <button
            className="nav__link nav__cta"
            onClick={() => handleNav("/contact")}
          >
            Contact Us
          </button>

          {/* ── Admin Portal Button ── */}
          <button className="admin-btn" onClick={handleAdminLogin}>
            {/* Icon */}
            <span className="admin-btn__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                style={{ width: 12, height: 12 }}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            Admin Portal
            {/* Live dot */}
            <span className="admin-btn__dot" />
          </button>
        </div>

        {/* Hamburger */}
        <div
          className="nav__burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="nav__mobile-drawer">
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              className={`nav__mobile-item${location.pathname === path ? " active" : ""}`}
              onClick={() => handleNav(path)}
            >
              {label}
            </button>
          ))}

          <button
            className="nav__mobile-item"
            onClick={() => handleNav("/contact")}
            style={{ color: "#26B5CF", fontWeight: 600 }}
          >
            Contact Us
          </button>

          {/* ── Mobile Admin Portal Button ── */}
          <button className="admin-btn-mobile" onClick={handleAdminLogin}>
            <span className="admin-btn-mobile__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                style={{ width: 16, height: 16 }}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.3,
                }}
              >
                Admin Portal
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(38,181,207,0.85)",
                  marginTop: 2,
                }}
              >
                Secure management access
              </div>
            </div>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#26B5CF",
                flexShrink: 0,
                animation: "adminPulse 2s infinite",
              }}
            />
          </button>
        </div>
      )}
    </>
  );
}
