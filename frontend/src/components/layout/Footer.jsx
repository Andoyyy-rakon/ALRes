import React, { useState } from 'react';
import { Globe } from 'lucide-react';
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
    <footer className="relative bg-ink pt-16 pb-8 overflow-hidden border-t border-rule">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <img src={logo} alt="ALRes Logo" className="h-10 w-10" />
              <span className="ml-2 font-serif text-xl font-semibold text-paper">
                AL<span className="text-blue-400">Res</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#8A94A0' }}>
              A resume builder built like a document tool — for people who'd rather write their story than fill in a template.
            </p>
          </div>

          {}
          <div>
            <h4 className="text-paper font-serif font-semibold mb-6 text-sm">{t('footer.product')}</h4>
            <ul className="space-y-4">
              <li><Link to="/#features" className="text-sm transition-colors duration-200 hover:text-paper" style={{ color: '#8A94A0' }}>{t('footer.features')}</Link></li>
              <li><Link to="/#templates" className="text-sm transition-colors duration-200 hover:text-paper" style={{ color: '#8A94A0' }}>{t('footer.templates')}</Link></li>
            </ul>
          </div>

          {}
          <div>
            <h4 className="text-paper font-serif font-semibold mb-6 text-sm">{t('footer.company')}</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm transition-colors duration-200 hover:text-paper" style={{ color: '#8A94A0' }}>{t('footer.about')}</Link></li>
              <li>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="text-sm transition-colors duration-200 hover:text-paper"
                  style={{ color: '#8A94A0' }}
                >
                  {t('footer.contact')}
                </button>
              </li>
              <li><Link to="/privacy" className="text-sm transition-colors duration-200 hover:text-paper" style={{ color: '#8A94A0' }}>{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-8" style={{ borderColor: 'rgba(250,247,241,0.15)' }}>
          <p className="text-sm text-center" style={{ color: '#5A6370' }}>
            © {currentYear} ALRes. {t('footer.allRights')}
          </p>
          
          {}
          <div className="flex items-center gap-3 p-1.5 rounded-sm border" style={{ background: 'rgba(250,247,241,0.06)', borderColor: 'rgba(250,247,241,0.12)' }}>
            <div className="p-1.5 rounded-sm" style={{ background: 'rgba(250,247,241,0.08)' }}>
              <Globe className="w-4 h-4 text-blue-400" />
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none pr-4 cursor-pointer text-paper"
              aria-label={t('footer.selectLanguage')}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-ink text-paper">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs" style={{ color: '#5A6370' }}>
            <span>{t('footer.madeWith')}</span>
            <span className="text-pen">❤️</span>
            <span>{t('footer.forSeekers')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
