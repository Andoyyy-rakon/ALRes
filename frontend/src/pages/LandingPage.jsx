import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Layout,
  Download,
  CheckCircle,
  Clock,
  MousePointerClick,
  ShieldCheck,
  Star,
  Check,
  FileText,
  Award,
  PenLine
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../api/axiosInstance';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { assets } from '../data/visualTemplates';

/* ─── keyframes ──────────────────────────────────────────── */
const GLOBAL_KEYFRAMES = `
  @keyframes docIn {
    from { opacity: 0; transform: translateX(24px) rotate(0deg); }
    to   { opacity: 1; transform: translateX(0) rotate(-2.2deg); }
  }
  @keyframes blink { 50% { opacity: 0; } }
  @keyframes infiniteScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-infinite-scroll {
    display: flex;
    width: max-content;
    animation: infiniteScroll 40s linear infinite;
  }
  .animate-infinite-scroll:hover { animation-play-state: paused; }
`;

/* ─── Editorial Resume Preview ──────────────────────────── */
const PROFILES = [
  {
    name: 'Jose Reyes',
    title: 'Senior Product Designer',
    email: 'jose.reyes@email.com',
    domain: 'jose-reyes.design',
  },
  {
    name: 'Andre Hamil',
    title: 'Lead UI/UX Designer',
    email: 'Andre@email.com',
    domain: 'Andre-Hamil.design',
  },
  {
    name: 'Alex Rivera',
    title: 'Senior Brand Architect',
    email: 'alex.rivera@email.com',
    domain: 'alex-rivera.design',
  },
];

const ResumePreviewCard = () => {
  const [profileIndex, setProfileIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentProfile = PROFILES[profileIndex];

  useEffect(() => {
    const fullName = currentProfile.name;
    let timer;

    if (!isDeleting) {
      if (displayedName.length < fullName.length) {
        timer = setTimeout(() => {
          setDisplayedName(fullName.slice(0, displayedName.length + 1));
        }, 110);
      } else {
        // Hold full name for 3 seconds
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
      }
    } else {
      if (displayedName.length > 0) {
        timer = setTimeout(() => {
          setDisplayedName(fullName.slice(0, displayedName.length - 1));
        }, 60);
      } else {
        setIsDeleting(false);
        setProfileIndex((prev) => (prev + 1) % PROFILES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedName, isDeleting, profileIndex, currentProfile.name]);

  return (
    <div
      className="relative z-[2] bg-white w-full max-w-[560px] border shadow-doc flex flex-col gap-[18px]"
      style={{
        padding: '44px 46px',
        borderColor: '#DDE3EE',
        aspectRatio: '8.5/10.6',
        fontFamily: '"Public Sans", sans-serif',
        animation: 'docIn 1.1s cubic-bezier(.2,.8,.2,1) both',
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: '2px solid #172033', paddingBottom: '14px' }}>
        <div className="font-serif text-[29px] font-semibold min-h-[42px] flex items-center" style={{ letterSpacing: '-0.01em', color: '#172033' }}>
          <span>{displayedName}</span>
          <span
            className="inline-block w-[2.5px] h-[26px] bg-[#3155A6] ml-1 rounded-full animate-pulse"
            style={{ animationDuration: '0.7s' }}
          />
        </div>
        <div className="text-[13.5px] font-semibold mt-[3px]" style={{ color: '#3155A6' }}>{currentProfile.title}</div>
        <div className="mt-[10px] flex gap-[14px] flex-wrap text-[11px]" style={{ color: '#526078' }}>
          <span>{currentProfile.email}</span>
          <span>+1 (415) 555-0134</span>
          <span>San Francisco, CA</span>
          <span>{currentProfile.domain}</span>
        </div>
      </div>

    {/* Summary */}
    <div>
      <div className="text-[10.5px] font-bold uppercase tracking-[0.06em] pb-[5px] mb-[9px]" style={{ color: '#172033', borderBottom: '1px solid #DDE3EE' }}>Summary</div>
      <p className="text-[11.5px] leading-[1.55]" style={{ color: '#526078' }}>
        Product designer with 8 years building design systems and 0–1 products for growth-stage teams. Focused on clarity, craft, and shipping things that hold up.
      </p>
    </div>

    {/* Experience */}
    <div>
      <div className="text-[10.5px] font-bold uppercase tracking-[0.06em] pb-[5px] mb-[9px]" style={{ color: '#172033', borderBottom: '1px solid #DDE3EE' }}>Experience</div>
      <div className="mb-[10px]">
        <div className="flex justify-between text-[12px] font-semibold"><span>Senior Product Designer, Northbeam</span><span>2021 — Present</span></div>
        <div className="text-[11px] italic mt-[1px]" style={{ color: '#526078' }}>Led the design system used across 6 product teams</div>
        <ul className="mt-[6px] pl-[14px] list-disc">
          <li className="text-[11px] mb-[3px] leading-[1.45]" style={{ color: '#526078' }}>Reduced design-to-ship time by 34% with a shared component library</li>
          <li className="text-[11px] mb-[3px] leading-[1.45]" style={{ color: '#526078' }}>Ran the redesign of the core onboarding flow, lifting activation 18%</li>
        </ul>
      </div>
      <div className="mb-[10px]">
        <div className="flex justify-between text-[12px] font-semibold"><span>Product Designer, Fieldstone</span><span>2018 — 2021</span></div>
        <div className="text-[11px] italic mt-[1px]" style={{ color: '#526078' }}>First design hire, reporting to the founder</div>
      </div>
    </div>

    {/* Education */}
    <div>
      <div className="text-[10.5px] font-bold uppercase tracking-[0.06em] pb-[5px] mb-[9px]" style={{ color: '#172033', borderBottom: '1px solid #DDE3EE' }}>Education</div>
      <div className="flex justify-between text-[12px] font-semibold"><span>B.F.A., Graphic Design — RISD</span><span>2018</span></div>
    </div>

    {/* Skills */}
    <div>
      <div className="text-[10.5px] font-bold uppercase tracking-[0.06em] pb-[5px] mb-[9px]" style={{ color: '#172033', borderBottom: '1px solid #DDE3EE' }}>Skills</div>
      <div className="flex flex-wrap gap-[6px_10px]">
        {['Design systems', 'Figma', 'Prototyping', 'Research', 'Typography'].map((s) => (
          <span key={s} className="text-[10.5px] px-[9px] py-[3px]" style={{ color: '#172033', border: '1px solid #C4D0E3', borderRadius: '1px' }}>{s}</span>
        ))}
      </div>
    </div>
  </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────── */
const LandingPage = () => {
  const { user, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const googleLoginRef = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    try {
      const { data } = await axios.post('/auth/google', { credential: credentialResponse.credential });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  }, [login, navigate]);

  const triggerGoogleLogin = () => {
    const btn = googleLoginRef.current?.querySelector('div[role="button"]');
    if (btn) btn.click();
  };

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: t('features.easyTitle'), description: t('features.easyDesc') },
    { icon: <Layout className="w-5 h-5" />, title: t('features.profTitle'), description: t('features.profDesc') },
    { icon: <Download className="w-5 h-5" />, title: t('features.downTitle'), description: t('features.downDesc') },
    { icon: <MousePointerClick className="w-5 h-5" />, title: t('features.fastTitle'), description: t('features.fastDesc') },
  ];

  const values = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: t('values.freeTitle'), description: t('values.freeDesc') },
    { icon: <PenLine className="w-5 h-5" />, title: t('values.noSkillsTitle'), description: t('values.noSkillsDesc') },
    { icon: <Clock className="w-5 h-5" />, title: t('values.savesTimeTitle'), description: t('values.savesTimeDesc') },
    { icon: <Zap className="w-5 h-5" />, title: t('values.smoothTitle'), description: t('values.smoothDesc') },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] },
  };
  const stagger = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
    viewport: { once: true, amount: 0.05 },
  };

  return (
    <div className="bg-paper min-h-screen font-sans overflow-x-hidden">
      <style>{GLOBAL_KEYFRAMES}</style>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="rails relative min-h-[82vh] flex items-center" style={{ padding: '0 clamp(32px, 6.5vw, 110px)' }}>
        <div className="max-w-[1360px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-center">

          {/* LEFT: headline + CTA */}
          <div className="py-[60px] pl-0 lg:pl-6 pr-0 lg:pr-6">

            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-[10px] mb-7 text-[13.5px] font-semibold text-ink-soft"
            >
              <span className="w-[7px] h-[7px] bg-pen inline-block" style={{ transform: 'rotate(45deg)' }} />
              A resume builder, not a template shop
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-serif text-ink leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(38px, 4.4vw, 58px)', fontWeight: 500, letterSpacing: '-0.01em' }}
            >
              {t('hero.title1')}<br />
              <em className="italic font-normal text-blue-500">{t('hero.titleAccent')}</em>
              <br />{t('hero.title2')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-[17px] leading-[1.6] text-ink-soft mb-10 max-w-[38ch]"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
              className="flex items-center gap-[22px] flex-wrap"
            >
              {!user ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group inline-flex items-center gap-[10px] px-[26px] py-[15px] text-[15px] font-semibold text-paper border-none cursor-pointer"
                    style={{ background: '#3155A6', borderRadius: '2px', transition: 'transform .25s cubic-bezier(.2,.8,.2,1), background .2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#254388'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#3155A6'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {t('hero.buildBtn')}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </button>
                  <span className="text-[13px] text-ink-soft">Free to start · <b className="text-ink font-semibold">No design skills needed</b></span>
                </>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group inline-flex items-center gap-[10px] px-[26px] py-[15px] text-[15px] font-semibold text-paper border-none cursor-pointer"
                  style={{ background: '#3155A6', borderRadius: '2px', transition: 'transform .25s cubic-bezier(.2,.8,.2,1), background .2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#254388'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#3155A6'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Go to Dashboard
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              )}
            </motion.div>

            {/* Google login (still visible for non-logged-in under CTA) */}
            {!user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3 w-full max-w-[320px]">
                  <div className="flex-1 h-px bg-rule" />
                  <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-rule" />
                </div>
                <div ref={googleLoginRef}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.error('Login Failed')}
                    text="continue_with"
                    size="large"
                    theme="outline"
                    shape="rectangular"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Resume preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="hidden lg:flex relative h-full items-center justify-center lg:justify-end pt-10"
          >
            <div className="relative w-full max-w-[540px]">
              {/* Shadow card behind */}
              <div
                className="absolute z-[1]"
                style={{
                  inset: '12px -16px -16px 16px',
                  background: '#E5ECF6',
                  border: '1px solid #C4D0E3',
                  transform: 'rotate(1.4deg)',
                }}
              />
              <ResumePreviewCard />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROBLEM STATEMENT (editorial)
      ══════════════════════════════════════════════════════ */}
      <section className="rails" style={{ maxWidth: '1360px', margin: '0 auto', padding: '120px clamp(32px, 6.5vw, 110px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1.3fr] gap-8 lg:gap-16 items-start px-2 sm:px-6 lg:px-8">
          <div className="pt-[6px]">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-pen uppercase tracking-widest bg-paper-dim border border-rule" style={{ borderRadius: '2px' }}>
              <span className="w-1.5 h-1.5 bg-pen rotate-45 inline-block" />
              01 / The Problem
            </div>
          </div>
          <div className="hidden lg:block bg-rule h-full" />
          <p
            className="font-serif italic leading-[1.35] text-ink lg:pl-4"
            style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, maxWidth: '22ch' }}
          >
            Most resumes look identical because most resume tools give everyone the{' '}
            <span className="not-italic font-medium text-blue-500" style={{ borderBottom: '2px solid #A6402D' }}>same three boxes</span>{' '}
            to fill in — a name, a job, a paragraph — and call the result a template.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════ */}
      <section id="features" className="rails py-24 overflow-hidden" style={{ maxWidth: '1360px', margin: '0 auto', padding: '120px clamp(32px, 6.5vw, 110px)' }}>
        <div className="px-2 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-14">
            <div className="text-[13px] text-ink-soft font-semibold mb-5 uppercase tracking-wider">The ALRes builder</div>
            <h2 className="font-serif text-ink leading-[1.2] mb-4" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>{t('features.title')}</h2>
            <p className="text-ink-soft text-[16px] max-w-[52ch]">{t('features.subtitle')}</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group bg-white p-7 border border-rule hover:border-blue-500 hover:-translate-y-1.5 transition-all duration-300"
                style={{ borderRadius: '2px' }}
              >
                <div className="w-11 h-11 bg-ink text-paper flex items-center justify-center mb-5 group-hover:bg-blue-500 transition-colors duration-300" style={{ borderRadius: '2px' }}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-ink mb-2" style={{ fontFamily: '"Public Sans", sans-serif' }}>{f.title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY / VALUES (dark ink section)
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: '#172033', padding: '140px clamp(32px, 6.5vw, 110px)' }}
      >
        {/* Corner marks */}
        <div className="max-w-[1360px] mx-auto relative px-2 sm:px-6 lg:px-8">
          <span className="absolute w-[22px] h-[22px]" style={{ top: '-70px', left: '16px', borderTop: '1px solid rgba(243,246,252,0.4)', borderLeft: '1px solid rgba(243,246,252,0.4)' }} />
          <span className="absolute w-[22px] h-[22px]" style={{ top: '-70px', right: '16px', borderTop: '1px solid rgba(243,246,252,0.4)', borderRight: '1px solid rgba(243,246,252,0.4)' }} />
          <span className="absolute w-[22px] h-[22px]" style={{ bottom: '-70px', left: '16px', borderBottom: '1px solid rgba(243,246,252,0.4)', borderLeft: '1px solid rgba(243,246,252,0.4)' }} />
          <span className="absolute w-[22px] h-[22px]" style={{ bottom: '-70px', right: '16px', borderBottom: '1px solid rgba(243,246,252,0.4)', borderRight: '1px solid rgba(243,246,252,0.4)' }} />

          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 500 }}>Why Job Seekers Love ALRes</h2>
            <p className="text-[16px] max-w-2xl mx-auto font-medium" style={{ color: '#E5ECF6' }}>Designed by students, for students and job seekers.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-7 border hover:-translate-y-1 transition-all duration-300 group"
                style={{ background: 'rgba(243,246,252,0.06)', borderColor: 'rgba(243,246,252,0.18)', borderRadius: '2px' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(243,246,252,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(243,246,252,0.06)'; }}
              >
                <div className="w-11 h-11 border flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: '#3155A6', borderColor: 'rgba(243,246,252,0.25)', borderRadius: '2px' }}>
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: '"Public Sans", sans-serif' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed font-normal" style={{ color: '#E5ECF6' }}>{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TEMPLATES (infinite carousel)
      ══════════════════════════════════════════════════════ */}
      <section id="templates" className="py-24 bg-paper overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 mb-14">
          <motion.div {...fadeUp} className="text-center">
            <div className="text-[13px] text-ink-soft font-semibold mb-5 uppercase tracking-wider">Templates</div>
            <h2 className="font-serif text-ink mb-5" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>
              Documents, not decorations.
            </h2>
            <p className="text-ink-soft text-[15px] max-w-[38ch] mx-auto mt-[10px]">
              Choose from our curated collection of professional, ATS-friendly templates designed to get you noticed.
            </p>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          {/* Fade masks */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />

          <div className="animate-infinite-scroll gap-5 sm:gap-8 py-4">
            {[...resumeImages, ...resumeImages].map((img, idx) => (
              <div
                key={idx}
                className="w-[150px] sm:w-[300px] aspect-[1/1.414] bg-white shadow-card border border-rule overflow-hidden flex-shrink-0 hover:shadow-card-hover hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                style={{ borderRadius: '2px' }}
              >
                <img src={img} alt={`Resume Template ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS (timeline)
      ══════════════════════════════════════════════════════ */}
      <section id="story" className="rails" style={{ maxWidth: '1360px', margin: '0 auto', padding: '120px clamp(32px, 6.5vw, 110px)' }}>
        <div className="px-2 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-[600px] mb-[70px]">
            <div className="text-[13px] text-ink-soft font-semibold mb-5 uppercase tracking-wider">How it works</div>
            <h2 className="font-serif text-ink leading-[1.2] mb-4" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>Four sections. One page. In order.</h2>
            <p className="text-ink-soft text-[16px]">ALRes walks you through your story in the sequence a hiring manager actually reads it.</p>
          </motion.div>

          <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Horizontal line */}
            <div className="hidden lg:block absolute top-[11px] left-3 right-3 h-[1px]" style={{ background: '#DDE3EE' }} />

            {[
              { num: '01', title: 'Experience', desc: 'Start with what you\'ve done. Roles, dates, and outcomes — structured so nothing gets buried.', w1: 80, w2: 60, active: true },
              { num: '02', title: 'Education', desc: 'Degrees, certifications, and coursework — sized to matter as much as it should and no more.', w1: 60, w2: 40 },
              { num: '03', title: 'Skills', desc: 'Named plainly, grouped by relevance, and kept out of a bar chart pretending to measure them.', w1: 50, w2: 70 },
              { num: '04', title: 'Projects', desc: 'The proof. Work you\'re proud of, described in enough detail to earn the follow-up question.', w1: 90, w2: 50 },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative pt-9 pr-2 lg:pr-4 mb-8 lg:mb-0">
                {/* Node dot */}
                <div
                  className="absolute top-[6px] left-0 w-[11px] h-[11px] rounded-full"
                  style={{
                    background: step.active ? '#A6402D' : '#F3F6FC',
                    border: step.active ? '2px solid #A6402D' : '2px solid #172033',
                  }}
                />
                <span className="text-[12px] text-ink-soft mb-[10px] block font-mono font-bold">{step.num}</span>
                <div className="font-serif text-[20px] font-semibold mb-[10px] text-ink">{step.title}</div>
                <p className="text-[13.5px] text-ink-soft leading-[1.55] mb-4">{step.desc}</p>
                <div className="border border-rule-strong bg-white p-[14px_16px]" style={{ borderRadius: '0px' }}>
                  <div className="h-[9px] mb-[6px] rounded-[1px]" style={{ width: `${step.w1}%`, background: '#E5ECF6' }} />
                  <div className="h-[9px] rounded-[1px]" style={{ width: `${step.w2}%`, background: '#E5ECF6' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA (dark card)
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeUp}
            className="relative p-10 sm:p-16 text-center overflow-hidden"
            style={{ background: '#172033', borderRadius: '2px' }}
          >
            {/* Corner marks */}
            <span className="absolute w-[22px] h-[22px]" style={{ top: '24px', left: '24px', borderTop: '1px solid rgba(243,246,252,0.4)', borderLeft: '1px solid rgba(243,246,252,0.4)' }} />
            <span className="absolute w-[22px] h-[22px]" style={{ top: '24px', right: '24px', borderTop: '1px solid rgba(243,246,252,0.4)', borderRight: '1px solid rgba(243,246,252,0.4)' }} />
            <span className="absolute w-[22px] h-[22px]" style={{ bottom: '24px', left: '24px', borderBottom: '1px solid rgba(243,246,252,0.4)', borderLeft: '1px solid rgba(243,246,252,0.4)' }} />
            <span className="absolute w-[22px] h-[22px]" style={{ bottom: '24px', right: '24px', borderBottom: '1px solid rgba(243,246,252,0.4)', borderRight: '1px solid rgba(243,246,252,0.4)' }} />

            <div className="relative z-10">
              <h2 className="font-serif text-white mb-4 mx-auto max-w-[16ch]" style={{ color: '#FFFFFF', fontSize: 'clamp(32px,4.6vw,58px)', lineHeight: '1.15', fontWeight: 500 }}>
                Your next opportunity starts with one page.
              </h2>
              <p className="mt-[22px] text-[16px] font-medium" style={{ color: '#E5ECF6' }}>Start writing — the layout is already taken care of.</p>

              <div className="flex flex-col items-center gap-4 mt-10">
                {!user ? (
                  <>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="group inline-flex items-center gap-[10px] px-[26px] py-[15px] text-[15px] font-bold border-none cursor-pointer"
                      style={{ background: '#F3F6FC', color: '#172033', borderRadius: '2px', transition: 'background .2s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#F3F6FC'; }}
                    >
                      <span>{t('hero.buildBtn')}</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" style={{ color: '#172033' }}>→</span>
                    </button>
                    {/* Hidden google login ref for CTA trigger */}
                    <div className="hidden" ref={googleLoginRef}>
                      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} />
                    </div>
                    <button
                      onClick={triggerGoogleLogin}
                      className="flex items-center gap-2.5 px-6 py-3 text-sm font-semibold cursor-pointer border transition-colors duration-200"
                      style={{ background: 'rgba(243,246,252,0.06)', color: '#E5ECF6', borderColor: 'rgba(243,246,252,0.35)', borderRadius: '2px' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(243,246,252,0.7)'; e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(243,246,252,0.12)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(243,246,252,0.35)'; e.currentTarget.style.color = '#E5ECF6'; e.currentTarget.style.background = 'rgba(243,246,252,0.06)'; }}
                    >
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                      Continue with Google
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group inline-flex items-center gap-[10px] px-[26px] py-[15px] text-[15px] font-bold border-none cursor-pointer"
                    style={{ background: '#F3F6FC', color: '#172033', borderRadius: '2px', transition: 'background .2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#F3F6FC'; }}
                  >
                    <span style={{ color: '#172033' }}>Go to Dashboard</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" style={{ color: '#172033' }}>→</span>
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
  assets.Elegantserif,
];

export default LandingPage;
