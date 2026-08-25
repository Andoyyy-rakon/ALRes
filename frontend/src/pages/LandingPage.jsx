import React, { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Layout, 
  Download, 
  CheckCircle, 
  Clock, 
  MousePointerClick, 
  ShieldCheck,
  Star
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../api/axiosInstance';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { assets } from '../data/visualTemplates';
const LandingPage = () => {
  const { user, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('features.easyTitle'),
      description: t('features.easyDesc'),
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: t('features.profTitle'),
      description: t('features.profDesc'),
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: t('features.downTitle'),
      description: t('features.downDesc'),
    },
    {
      icon: <MousePointerClick className="w-6 h-6" />,
      title: t('features.fastTitle'),
      description: t('features.fastDesc'),
    }
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('values.freeTitle'),
      description: t('values.freeDesc')
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: t('values.noSkillsTitle'),
      description: t('values.noSkillsDesc')
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('values.savesTimeTitle'),
      description: t('values.savesTimeDesc')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('values.smoothTitle'),
      description: t('values.smoothDesc')
    }
  ];

  const googleLoginRef = useRef(null);

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    try {
      const { data } = await axios.post('/auth/google', {
        credential: credentialResponse.credential,
      });
      login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, [login, navigate]);

  const triggerGoogleLogin = () => {
    // Click the hidden GoogleLogin button in the hero section
    const btn = googleLoginRef.current?.querySelector('div[role="button"]');
    if (btn) btn.click();
  };

  const smoothFadeUp = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 }, 
    transition: { 
      duration: 0.6, 
      ease: [0.215, 0.610, 0.355, 1.000] 
    }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      } 
    },
    viewport: { once: true, amount: 0.1 }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
      
      {}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-primary-50 rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px] opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span>{t('hero.sparkle')}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8"
          >
            {t('hero.title1')} <br className="hidden md:block" />
            <span className="text-primary-600">
              {t('hero.titleAccent')} 
            </span> 
            <br className="hidden md:block" /> {t('hero.title2')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto mb-12 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            {!user ? (
              <div className="flex flex-col items-center gap-4 w-full max-w-[320px] mx-auto">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3.5 border border-transparent text-base font-bold rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 hover:shadow-ambient transition-all duration-300"
                >
                  {t('hero.buildBtn')}
                </button>
                <div className="relative w-full flex items-center justify-center my-2">
                  <div className="absolute border-t border-slate-200 w-full"></div>
                  <span className="relative bg-white px-3 text-sm text-secondary font-medium">OR</span>
                </div>
                <div className="w-full flex justify-center mt-2" ref={googleLoginRef}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.error('Login Failed')}
                    text="continue_with"
                    size="large"
                    theme="outline"
                    shape="rectangular"
                  />
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-surface-dim text-surface-on rounded-full text-xs font-semibold mt-2">
                  <CheckCircle className="w-4 h-4 text-primary-600" />
                  <span>{t('hero.freeLabel')}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 hover:shadow-ambient transition-all duration-300 group"
              >
                Go to Dashboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </motion.div>

          {}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="mt-20 max-w-5xl mx-auto"
          >
            <div className="relative max-w-5xl mx-auto rounded-2xl shadow-ambient overflow-hidden border border-slate-200 bg-white p-2 sm:p-4">
               <img 
                 src="https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&q=80&w=2400" 
                 alt="ALRes UI Preview" 
                 className="w-full h-auto object-cover transform scale-[1.01] opacity-95 transition-transform duration-700 rounded-xl shadow-sm" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none rounded-2xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {}
      <section id="features" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...smoothFadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('features.title')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={smoothFadeUp}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-ambient transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-surface-container text-primary-600 flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-surface-on mb-3">{feature.title}</h3>
                <p className="text-secondary leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {}
      <section className="py-24 bg-[#283044] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            {...smoothFadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4">Why Job Seekers Love ALRes</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Designed by students, for students and job seekers.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((v, idx) => (
              <motion.div 
                key={idx} 
                variants={smoothFadeUp}
                className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-all">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {}
      <section id="templates" className="py-24 overflow-hidden bg-slate-50/50">
        <style>{`
          @keyframes infiniteScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            display: flex;
            width: max-content;
            animation: infiniteScroll 40s linear infinite;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div 
            {...smoothFadeUp}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Templates Built for <span className="text-primary-600">Success</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Choose from our curated collection of professional, ATS-friendly templates designed to get you noticed by top recruiters.
            </p>
          </motion.div>
        </div>

        <div className="relative group overflow-hidden py-10">
          {}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none"></div>

          <div className="animate-infinite-scroll gap-4 sm:gap-8 px-4">
            {}
            {[...resumeImages, ...resumeImages].map((img, idx) => (
              <div 
                key={idx} 
                className="w-[180px] sm:w-[350px] aspect-[1/1.414] bg-white rounded-lg shadow-sm border border-outline-variant overflow-hidden flex-shrink-0 transition-all duration-500 hover:shadow-ambient sm:hover:scale-[1.02] cursor-pointer group/item"
              >
                <div className="relative h-full w-full">
                  <img 
                    src={img} 
                    alt={`Resume Template ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             {...smoothFadeUp}
             className="bg-[#283044] rounded-2xl p-12 md:p-20 text-center relative overflow-hidden shadow-ambient"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to land your dream job?</h2>
              <p className="text-slate-300 text-base mb-10 max-w-xl mx-auto">Join thousands of professionals who have accelerated their careers using ALRes. Build your professional presence today.</p>
              
              <div className="flex flex-col items-center gap-6">
                 {!user ? (
                  <div className="flex flex-col items-center gap-4 w-full max-w-[320px] mx-auto">
                    <div className="w-full flex justify-center">
                      <button
                        onClick={triggerGoogleLogin}
                        className="flex items-center gap-3 px-6 py-3 bg-white text-slate-700 font-semibold text-base rounded-lg border border-slate-300 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-200"
                      >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                        Continue with Google
                      </button>
                    </div>
                  </div>
                  ) : (
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-lg shadow-sm hover:bg-slate-50 transition-all"
                    >
                      Go to Dashboard
                    </button>
                  )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

const resumeImages = [
  assets.ModernTech,
  assets.HarvardClass,
  assets.ExececutiveMini,
  assets.ExececutiveSch,
  assets.ModernProf,
  assets.Elegantserif
];

export default LandingPage;
