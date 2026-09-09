import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-paper min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-ink mb-8" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500 }}>Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-ink-soft mb-6">Last updated: May 2026</p>
          
          <h2 className="font-serif text-ink mt-10 mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>1. Your Privacy, Our Commitment</h2>
          <p className="text-ink-soft mb-6 leading-relaxed">
            To help you create a professional resume, we work with the information you choose to share—like your experience, education, and skills. This data is used only to build your resume and is never shared or sold to third parties.
          </p>

          <h2 className="font-serif text-ink mt-10 mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>2. How We Use Your Information</h2>
          <p className="text-ink-soft mb-6 leading-relaxed">
            Your information is used solely to provide and improve our resume-building services. We do not sell your personal data to third parties.
          </p>

          <h2 className="font-serif text-ink mt-10 mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>3. Data Security</h2>
          <p className="text-ink-soft mb-6 leading-relaxed">
            We implement industry-standard security measures to protect your data. Cloud-saved resumes are encrypted and accessible only via your authenticated account.
          </p>

          <h2 className="font-serif text-ink mt-10 mb-4" style={{ fontSize: '24px', fontWeight: 500 }}>4. Third-Party Services</h2>
          <p className="text-ink-soft mb-6 leading-relaxed">
            We use Google OAuth for authentication. By using ALRes, you agree to Google's Privacy Policy regarding your authentication data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
