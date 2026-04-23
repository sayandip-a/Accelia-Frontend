// =====================================================
// App.jsx — Main Router
// =====================================================
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Index        from './pages/Index';
import Solutions    from './pages/Solutions';
import Expertise    from './pages/Expertise';
import About        from './pages/About';
import NewsAndEvents from './pages/NewsAndEvents';
import Careers      from './pages/Careers';
import Locations    from './pages/Locations';
import Contact      from './pages/Contact';
import Loader       from './pages/Loader';

import './assets/css/variables.css';
import './assets/css/global.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"          element={<Index />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/about"     element={<About />} />
          <Route path="/news"      element={<NewsAndEvents />} />
          <Route path="/careers"   element={<Careers />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact"   element={<Contact />} />
          {/* Catch-all */}
          <Route path="*"          element={<Index />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
