import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { LanguageProvider } from './context/LanguageContext';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';

const AppRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/builder/:id?"
            element={<Builder />}
          /> 
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/templates" element={<Navigate to="/#templates" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

import { ToastProvider } from './context/ToastContext';
 
 function App() {
   return (
    <Router>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </Router>
   );
 }

export default App;
