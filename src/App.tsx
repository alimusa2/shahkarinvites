import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { InvitationDemoPage } from './pages/InvitationDemoPage';
import { BrownWeddingPage } from './pages/BrownWeddingPage';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invitation/demo" element={<InvitationDemoPage />} />
        <Route path="/cards/brown-wedding" element={<BrownWeddingPage />} />
        <Route path="/brown-wedding" element={<Navigate to="/cards/brown-wedding" replace />} />
        {/* Support hash or fallback routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
