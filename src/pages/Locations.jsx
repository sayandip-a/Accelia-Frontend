import React, { useState, useEffect } from "react";
import Nav from "../shared/Nav";
import Footer from "../shared/Footer";
import "../assets/css/variables.css";
import "../assets/css/global.css";
import "../assets/css/pages.css";
const BASE_URL =
  process.env.REACT_APP_API_URL || "https://accelia-backend.onrender.com";
const REGIONS = [
  {
    id: "asia",
    label: "Asia-Pacific",
    heading: "Asia-Pacific Offices",
    desc: "Our regional hub in Singapore coordinates with offices in India, South Korea, and Australia to deliver cost-effective, regulatory-compliant clinical operations.",
    offices: [
      { country: "Singapore", detail: "100 Cross Street, Singapore 048421" },
      { country: "India", detail: "Bangalore, Hyderabad" },
      { country: "South Korea", detail: "Seoul" },
      { country: "Australia", detail: "Sydney, Melbourne" },
    ],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235145.72648967118!2d88.18362857616464!3d22.535564861360903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1689940126574!5m2!1sen!2sin",
  },
  {
    id: "europe",
    label: "Europe",
    heading: "European Offices",
    desc: "Strategically located in Western and Eastern Europe, our offices provide agile solutions for multicenter clinical trials.",
    offices: [
      { country: "Germany", detail: "Frankfurt" },
      { country: "United Kingdom", detail: "London" },
      { country: "Poland", detail: "Warsaw" },
    ],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100408.04921141723!2d8.5511379!3d50.1109221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bda9c0f0a1e481%3A0x6e5e4571967b2d71!2sFrankfurt%2C%20Germany!5e0!3m2!1sen!2sde!4v1689940074170!5m2!1sen!2sde",
  },
  {
    id: "north",
    label: "North America",
    heading: "North American Offices",
    desc: "Accelia's presence in North America ensures alignment with FDA regulations and deep access to patient populations.",
    offices: [
      { country: "USA", detail: "Boston, San Francisco" },
      { country: "Canada", detail: "Toronto" },
    ],
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.708906231059!2d-71.05888098454292!3d42.3600829791866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370aaf30425e3%3A0x62f2aa26de0d13b7!2sBoston%2C%20MA!5e0!3m2!1sen!2sus!4v1689940126574!5m2!1sen!2sus",
  },
];

const ICON_MAP = {
  building: "🏢",
  pin: "📍",
  office: "🏬",
  lab: "🔬",
};

// ── Fallback static locations (shown if API fails) ────
const FALLBACK_LOCATIONS = [
  {
    _id: "f1",
    city: "Kolkata",
    state: "West Bengal",
    tagline: "Headquarters – Strategic Hub",
    isHQ: true,
    status: "Active",
    icon: "building",
  },
  {
    _id: "f2",
    city: "West Bengal",
    state: "West Bengal",
    tagline: "All Regions Covered",
    isHQ: false,
    status: "Active",
    icon: "pin",
  },
  {
    _id: "f3",
    city: "Assam",
    state: "Assam",
    tagline: "North-East Presence",
    isHQ: false,
    status: "Active",
    icon: "pin",
  },
  {
    _id: "f4",
    city: "Bhubaneswar",
    state: "Odisha",
    tagline: "Odisha Operations",
    isHQ: false,
    status: "Active",
    icon: "pin",
  },
  {
    _id: "f5",
    city: "Bihar",
    state: "Bihar",
    tagline: "Eastern Zone Coverage",
    isHQ: false,
    status: "Active",
    icon: "pin",
  },
  {
    _id: "f6",
    city: "Uttar Pradesh",
    state: "Uttar Pradesh",
    tagline: "Northern Operations",
    isHQ: false,
    status: "Active",
    icon: "pin",
  },
  {
    _id: "f7",
    city: "Delhi NCR",
    state: "Delhi",
    tagline: "Capital Region Hub",
    isHQ: false,
    status: "Active",
    icon: "office",
  },
];

// ── Skeleton loader ───────────────────────────────────
function LocSkeleton() {
  return (
    <>
      <style>{`
        @keyframes locShimmer { to { background-position: -200% 0; } }
        .loc-skeleton {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.06) 25%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.06) 75%);
          background-size: 200% 100%;
          animation: locShimmer 1.4s infinite;
          border-radius: 16px;
          height: 140px;
        }
      `}</style>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="loc-skeleton" />
      ))}
    </>
  );
}

export default function Locations() {
  const [activeTab, setActiveTab] = useState("asia");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const activeRegion = REGIONS.find((r) => r.id === activeTab);
  const hqLocation = locations.find((l) => l.isHQ);

  // ── Fetch locations from API ──────────────────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setFetchError(false);
      setUsingFallback(false);

      try {
        const res = await fetch(`${BASE_URL}/api/locations`, {
          headers: { Accept: "application/json" },
        });

        // ✅ Check content-type BEFORE calling .json()
        const contentType = res.headers.get("content-type") || "";
        if (!res.ok || !contentType.includes("application/json")) {
          const text = await res.text();
          console.error(`API error ${res.status}:`, text.slice(0, 300));
          throw new Error(`Server returned ${res.status}`);
        }

        const raw = await res.json();
        if (cancelled) return;

        // ✅ Handle BOTH response shapes:
        // Shape A: { locations: [...] }   ← your current code assumed this
        // Shape B: [...]                  ← direct array (most likely)
        const arr = Array.isArray(raw)
          ? raw
          : Array.isArray(raw.locations)
            ? raw.locations
            : Array.isArray(raw.data)
              ? raw.data
              : [];

        // Only show Active + HQ, sorted by order field
        const active = arr
          .filter((l) => l.status === "Active" || l.isHQ)
          .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

        if (active.length === 0) {
          // API worked but returned nothing — use fallback silently
          console.warn("API returned 0 locations, using fallback");
          setLocations(FALLBACK_LOCATIONS);
          setUsingFallback(true);
        } else {
          setLocations(active);
        }
      } catch (err) {
        if (cancelled) return;
        console.error("Locations fetch error:", err.message);
        // ✅ Use fallback instead of showing blank page
        setLocations(FALLBACK_LOCATIONS);
        setUsingFallback(true);
        setFetchError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    }; // cleanup on unmount
  }, []);

  return (
    <>
      <Nav />

      <div className="page-wrapper locations-page">
        {/* ── Intro ── */}
        <div className="locations-intro">
          <div className="sec-tag sec-tag--gold">Our Locations</div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(32px,4vw,56px)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Pan-India Clinical Presence
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 17,
              lineHeight: 1.75,
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            With Kolkata as our strategic hub, Accelia's presence spans across
            all regions of West Bengal and key locations including Assam,
            Bhubaneswar, Bihar, and Uttar Pradesh — driving clinical excellence
            at every site.
          </p>
        </div>

        {/* ── India Offices Grid (API-powered) ── */}
        <section>
          <div className="sec-tag">India Operations</div>
          <h2 className="sec-title">Where We Operate in India</h2>
          <p className="sec-sub">
            Our primary operations are headquartered in Kolkata with a growing
            multi-state clinical network.
          </p>

          {/* Optional: warn if using fallback data */}
          {usingFallback && !loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 10,
                marginBottom: 20,
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.25)",
                color: "#fbbf24",
                fontSize: 12,
                fontWeight: 600,
                maxWidth: 400,
              }}
            >
              ⚠️ Showing default locations — live data unavailable
            </div>
          )}

          <div className="loc-grid" style={{ marginBottom: 52 }}>
            {loading ? (
              <LocSkeleton />
            ) : (
              locations.map((l, i) => (
                <div
                  key={l._id || i}
                  className={`loc-card${l.isHQ ? " loc-card--hq" : ""}`}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {/* Image uploaded from admin */}
                  {l.image && (
                    <div
                      style={{
                        height: 80,
                        overflow: "hidden",
                        borderRadius: 10,
                        marginBottom: 12,
                      }}
                    >
                      <img
                        src={l.image}
                        alt={l.city}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="loc-card__icon">
                    {ICON_MAP[l.icon] || "📍"}
                  </div>

                  {/* Name */}
                  <h3>{l.city}</h3>

                  {/* Tagline */}
                  <p>{l.tagline || l.state}</p>

                  {/* Coming Soon badge */}
                  {l.status === "Coming Soon" && (
                    <div
                      style={{
                        display: "inline-block",
                        marginTop: 6,
                        padding: "2px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 700,
                        background: "rgba(245,158,11,0.15)",
                        border: "1px solid rgba(245,158,11,0.35)",
                        color: "#fbbf24",
                      }}
                    >
                      Coming Soon
                    </div>
                  )}

                  {/* HQ badge */}
                  {l.isHQ && <div className="hq-badge">HQ</div>}
                </div>
              ))
            )}
          </div>

          {/* ── HQ Detail Card ── */}
          <div className="hq-info">
            <h3>
              Headquarters —{" "}
              {hqLocation
                ? `${hqLocation.city}, ${hqLocation.state}`
                : "Kolkata, West Bengal"}
            </h3>
            <p>
              Accelia Clinical Solutions is headquartered in{" "}
              {hqLocation?.city || "Kolkata"},{" "}
              {hqLocation?.state || "West Bengal"} — the clinical research hub
              of Eastern India. From here, our leadership team coordinates all
              operational, regulatory, and business functions across our
              expanding multi-state network.
            </p>
            <div className="hq-contacts">
              <div className="hq-contact">
                <span>📧</span>
                <span>
                  {hqLocation?.email || "acceliaclinicalsolution@gmail.com"}
                </span>
              </div>
              <div className="hq-contact">
                <span>📞</span>
                <span>{hqLocation?.phone || "+91 8282986162"}</span>
              </div>
              {hqLocation?.address && (
                <div className="hq-contact">
                  <span>📍</span>
                  <span>{hqLocation.address}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Global Offices with Tabs (static) ── */}
        <section style={{ background: "#F2F7FA" }}>
          <div className="sec-tag">Global Presence</div>
          <h2 className="sec-title">Our Global Presence</h2>
          <p className="sec-sub">
            With a strong international footprint, Accelia operates clinical
            research offices throughout Asia-Pacific, North America, and Europe,
            providing expert support wherever you are.
          </p>

          {/* Tabs */}
          <div
            className="region-tabs"
            style={{
              padding: 0,
              background: "transparent",
              border: "none",
              marginBottom: 36,
            }}
          >
            {REGIONS.map((r) => (
              <button
                key={r.id}
                className={`tab-button${activeTab === r.id ? " active" : ""}`}
                onClick={() => setActiveTab(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Active Panel */}
          {activeRegion && (
            <div style={{ animation: "fadeUp 0.35s ease" }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 28,
                  color: "#0B1F3A",
                  marginBottom: 14,
                }}
              >
                {activeRegion.heading}
              </h3>
              <p
                style={{
                  color: "#5E6E82",
                  fontSize: 15.5,
                  lineHeight: 1.78,
                  maxWidth: 680,
                  marginBottom: 20,
                }}
              >
                {activeRegion.desc}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 28,
                }}
              >
                {activeRegion.offices.map((o, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: 14.5,
                      color: "#0B1F3A",
                      paddingLeft: 16,
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 6,
                        height: 6,
                        background: "#1B8FA6",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    />
                    <strong>{o.country}:</strong> {o.detail}
                  </li>
                ))}
              </ul>
              <div className="map-embed">
                <iframe
                  src={activeRegion.mapSrc}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: 14, display: "block" }}
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
