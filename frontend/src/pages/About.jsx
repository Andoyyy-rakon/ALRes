import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">About ALRes</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          ALRes is committed to empowering students and job seekers by providing a seamless, professional, and accessible resume-building experience. Our mission is to bridge the gap between talent and opportunity through technology.
        </p>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          Founded with the belief that a great resume shouldn't be a privilege, we've designed ALRes to be 100% free and easy to use, supporting multiple languages to serve a global community.
        </p>
        <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Our Vision</h2>
          <p className="text-slate-600 italic">
            "To be the most efficient and user-friendly career preparation tool in the world, helping everyone showcase their unique journey with confidence."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
