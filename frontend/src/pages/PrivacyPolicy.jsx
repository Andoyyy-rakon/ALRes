import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">Last updated: May 2026</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Your Privacy, Our Commitment</h2>
          <p className="text-slate-600 mb-6">
            To help you create a professional resume, we work with the information you choose to share—like your experience, education, and skills. This data is used only to build your resume and is never shared or sold to third parties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-6">
            Your information is used solely to provide and improve our resume-building services. We do not sell your personal data to third parties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Data Security</h2>
          <p className="text-slate-600 mb-6">
            We implement industry-standard security measures to protect your data. Cloud-saved resumes are encrypted and accessible only via your authenticated account.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Third-Party Services</h2>
          <p className="text-slate-600 mb-6">
            We use Google OAuth for authentication. By using ALRes, you agree to Google's Privacy Policy regarding your authentication data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
