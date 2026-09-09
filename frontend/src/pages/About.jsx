import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-paper min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-ink mb-8" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 500 }}>About ALRes</h1>
        <p className="text-lg text-ink-soft mb-6 leading-relaxed">
          ALRes is committed to empowering students and job seekers by providing a seamless, professional, and accessible resume-building experience. Our mission is to bridge the gap between talent and opportunity through technology.
        </p>
        <p className="text-lg text-ink-soft mb-6 leading-relaxed">
          Founded with the belief that a great resume shouldn't be a privilege, we've designed ALRes to be 100% free and easy to use, supporting multiple languages to serve a global community.
        </p>
        <div className="mt-12 p-8 bg-white border border-rule" style={{ borderRadius: '2px' }}>
          <h2 className="font-serif text-ink mb-4" style={{ fontSize: '22px', fontWeight: 500 }}>Our Vision</h2>
          <p className="text-ink-soft italic font-serif" style={{ fontSize: '17px', lineHeight: '1.6' }}>
            "To be the most efficient and user-friendly career preparation tool in the world, helping everyone showcase their unique journey with confidence."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
