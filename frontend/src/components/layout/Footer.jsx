import React, { useState } from 'react';
import { Linkedin, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useLanguage } from '../../context/LanguageContext';
import ContactModal from '../ui/ContactModal';

const Footer = () => {
    const { t, language, setLanguage } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: '한국어' },
    { code: 'jp', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' }
  ];

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <img src={logo} alt="ALRes Logo" className="h-10 w-10" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600">
                ALRes
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering students and job seekers with beautiful, professional resumes. Built for efficiency, designed for success.
            </p>
          </div>

          {}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6">{t('footer.product')}</h4>
            <ul className="space-y-4">
              <li><Link to="/#features" className="text-slate-500 hover:text-primary-600 text-sm transition-colors">{t('footer.features')}</Link></li>
              <li><Link to="/#templates" className="text-slate-500 hover:text-primary-600 text-sm transition-colors">{t('footer.templates')}</Link></li>
            </ul>
          </div>

          {}
          <div>
            <h4 className="text-slate-900 font-semibold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-500 hover:text-primary-600 text-sm transition-colors">{t('footer.about')}</Link></li>
              <li>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-slate-500 hover:text-primary-600 text-sm transition-colors"
                >
                  {t('footer.contact')}
                </button>
              </li>
              <li><Link to="/privacy" className="text-slate-500 hover:text-primary-600 text-sm transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-sm text-center">
            © {currentYear} ALRes. {t('footer.allRights')}
          </p>
          
          {}
          <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <Globe className="w-4 h-4 text-primary-600" />
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 outline-none pr-4 cursor-pointer"
              aria-label={t('footer.selectLanguage')}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{t('footer.madeWith')}</span>
            <span className="text-red-400">❤️</span>
            <span>{t('footer.forSeekers')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
