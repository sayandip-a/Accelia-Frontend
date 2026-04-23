// =====================================================
// Loader.jsx — Page Load Spinner
// =====================================================
import React from 'react';
import '../assets/css/pages.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {/* Brand name as loader */}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 36,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.5px',
          marginBottom: 6,
        }}>
          Accelia
        </div>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#26B5CF',
          marginBottom: 28,
        }}>
          Clinical Solutions
        </div>

        {/* Dot row */}
        <div className="loader-dot-row">
          <div className="loader-dot" />
          <div className="loader-dot" />
          <div className="loader-dot" />
        </div>
      </div>
    </div>
  );
}
