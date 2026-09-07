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
  Star,
  Check,
  FileText,
  Award,
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../api/axiosInstance';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { assets } from '../data/visualTemplates';

/* ─── tiny helpers ──────────────────────────────────────────── */

/** Dot-grid SVG data-uri backdrop */
const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='1' cy='1' r='1' fill='%236366f1' fill-opacity='0.12'/%3E%3C/svg%3E\")";

/** Reusable float animation wrapper (pure CSS keyframes injected once) */
const floatStyle = (delay = 0, duration = 6) => ({
  animation: `heroFloat ${duration}s ease-in-out ${delay}s infinite`,
});

const GLOBAL_KEYFRAMES = `
  @keyframes heroFloat {
    0%,100% { transform: translateY(0px) rotate(var(--rot,0deg)); }
    50%      { transform: translateY(-12px) rotate(var(--rot,0deg)); }
  }
  @keyframes blobDrift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(30px,-20px) scale(1.05); }
    66%     { transform: translate(-20px,10px) scale(0.97); }
  }
  @keyframes infiniteScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spinSlowRev {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  .animate-infinite-scroll {
    display: flex;
    width: max-content;
    animation: infiniteScroll 40s linear infinite;
  }
  .animate-infinite-scroll:hover { animation-play-state: paused; }
`;

/* ─── Floating card components ──────────────────────────────── */

const ScoreCard = () => (
  <div
    className="absolute left-[-30px] sm:left-[-60px] top-[18%] z-20 hidden sm:flex flex-col gap-1 bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3 shadow-card w-[148px]"
    style={{ ...floatStyle(0.5, 7), '--rot': '-2deg' }}
  >
    <div className="flex items-center justify-between mb-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resume Score</span>
      <Award className="w-3.5 h-3.5 text-amber-400" />
    </div>
    <div className="flex items-end gap-1">
      <span className="text-3xl font-extrabold text-slate-900 leading-none">92</span>
      <span className="text-sm font-bold text-slate-400 mb-0.5">%</span>
    </div>
    <div className="w-full h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-indigo-500" style={{ width: '92%' }} />
    </div>
    <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">↑ Great score!</span>
  </div>
);

const ATSCard = () => (
  <div
    className="absolute right-[-20px] sm:right-[-55px] top-[12%] z-20 hidden sm:flex items-center gap-2.5 bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3 shadow-card"
    style={{ ...floatStyle(1.5, 8), '--rot': '2deg' }}
  >
    <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
      <Check className="w-4 h-4 text-emerald-500" />
    </div>
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS Friendly</div>
      <div className="text-xs font-bold text-slate-800">Optimised</div>
    </div>
  </div>
);

const QuickCard = () => (
  <div
    className="absolute right-[-20px] sm:right-[-65px] bottom-[10%] z-20 hidden sm:flex items-center gap-2.5 bg-white/90 border border-slate-200/80 rounded-2xl px-4 py-3 shadow-card"
    style={{ ...floatStyle(0, 6.5), '--rot': '2deg' }}
  >
    <div className="w-7 h-7 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
      <Zap className="w-4 h-4 text-primary-500" />
    </div>
    <div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Built in</div>
      <div className="text-xs font-bold text-slate-800">Under 5 mins</div>
    </div>
  </div>
);

/* Mini resume preview card */
const ResumePreviewCard = () => (
  <div
    className="w-full bg-white rounded-2xl shadow-[0_8px_40px_-8px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/8 overflow-hidden"
    style={{ ...floatStyle(1, 7), '--rot': '0deg' }}
  >
    {/* Resume header accent */}
    <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 to-indigo-500" />
    <div className="p-5">
      {/* Name block */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="w-28 h-3.5 rounded-full bg-slate-900 mb-1.5" />
          <div className="w-20 h-2 rounded-full bg-slate-300" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-indigo-100 flex-shrink-0" />
      </div>
      {/* Contact row */}
      <div className="flex gap-2 mb-4">
        {[40, 52, 36].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-slate-200" style={{ width: w }} />
        ))}
      </div>
      {/* Section: Experience */}
      <div className="mb-3">
        <div className="w-16 h-1.5 rounded-full bg-primary-400 mb-2" />
        <div className="space-y-1.5">
          {[70, 90, 55].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      {/* Section: Skills */}
      <div className="mb-3">
        <div className="w-10 h-1.5 rounded-full bg-primary-400 mb-2" />
        <div className="flex flex-wrap gap-1.5">
          {[30, 40, 28, 36, 32].map((w, i) => (
            <div key={i} className="h-4 rounded-md bg-primary-50 border border-primary-100" style={{ width: w }} />
          ))}
        </div>
      </div>
      {/* Section: Education */}
      <div>
        <div className="w-16 h-1.5 rounded-full bg-primary-400 mb-2" />
        <div className="space-y-1.5">
          {[60, 80].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Sparkle & Floating Decorative Shapes ────────────────── */

const Sparkle = ({ top, left, right, bottom, size = 16, delay = 0, duration = 6, color = '#6366f1', opacity = 0.6, style = {} }) => (
  <div
    className="absolute pointer-events-none select-none z-10"
    style={{
      top, left, right, bottom,
      animation: `heroFloat ${duration}s ease-in-out ${delay}s infinite`,
      opacity,
      ...style
    }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill={color}
      />
    </svg>
  </div>
);

const FloatingParticle = ({ type = 'circle', top, left, right, bottom, size = 12, delay = 0, duration = 7, className = '', style = {} }) => {
  const animStyle = {
    top, left, right, bottom,
    animation: `heroFloat ${duration}s ease-in-out ${delay}s infinite`,
    ...style
  };

  if (type === 'dot') {
    return (
      <div
        className={`absolute pointer-events-none select-none rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)] ${className}`}
        style={{ width: size, height: size, ...animStyle }}
      />
    );
  }

  if (type === 'ring') {
    return (
      <div
        className={`absolute pointer-events-none select-none rounded-full border border-dashed border-indigo-400/40 ${className}`}
        style={{
          width: size,
          height: size,
          animation: `heroFloat ${duration}s ease-in-out ${delay}s infinite, spinSlow ${duration * 3}s linear infinite`,
          ...style
        }}
      />
    );
  }

  if (type === 'halo') {
    return (
      <div
        className={`absolute pointer-events-none select-none rounded-full border-2 border-indigo-300/30 bg-indigo-500/10 backdrop-blur-[1px] ${className}`}
        style={{ width: size, height: size, ...animStyle }}
      />
    );
  }

  if (type === 'diamond') {
    return (
      <div
        className={`absolute pointer-events-none select-none rounded-sm bg-gradient-to-br from-amber-400 to-orange-500 opacity-70 shadow-sm ${className}`}
        style={{
          width: size,
          height: size,
          transform: 'rotate(45deg)',
          ...animStyle
        }}
      />
    );
  }

  if (type === 'plus') {
    return (
      <div
        className={`absolute pointer-events-none select-none text-indigo-400/50 font-black leading-none ${className}`}
        style={{ fontSize: size, ...animStyle }}
      >
        +
      </div>
    );
  }

  if (type === 'triangle') {
    return (
      <div className={`absolute pointer-events-none select-none ${className}`} style={animStyle}>
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 22,22 2,22" stroke="#6366f1" strokeWidth="2.5" strokeOpacity="0.45" fill="rgba(99,102,241,0.08)" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`absolute pointer-events-none select-none rounded-full border border-primary-300/40 ${className}`}
      style={{ width: size, height: size, ...animStyle }}
    />
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
    { icon: <Zap className="w-5 h-5" />, title: t('features.easyTitle'), description: t('features.easyDesc'), color: 'from-amber-500 to-orange-500' },
    { icon: <Layout className="w-5 h-5" />, title: t('features.profTitle'), description: t('features.profDesc'), color: 'from-primary-500 to-indigo-500' },
    { icon: <Download className="w-5 h-5" />, title: t('features.downTitle'), description: t('features.downDesc'), color: 'from-emerald-500 to-teal-500' },
    { icon: <MousePointerClick className="w-5 h-5" />, title: t('features.fastTitle'), description: t('features.fastDesc'), color: 'from-violet-500 to-purple-500' },
  ];

  const values = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: t('values.freeTitle'), description: t('values.freeDesc') },
    { icon: <Sparkles className="w-5 h-5" />, title: t('values.noSkillsTitle'), description: t('values.noSkillsDesc') },
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
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Inject keyframes once */}
      <style>{GLOBAL_KEYFRAMES}</style>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">

        {/* ── Layer 0: dot grid ── */}
        <div
          className="absolute inset-0 -z-20 pointer-events-none"
          style={{ backgroundImage: DOT_GRID, backgroundSize: '24px 24px' }}
        />

        {/* ── Layer 1: soft blobs ── */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
              top: '-15%', left: '-10%',
              animation: 'blobDrift 18s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)',
              top: '10%', right: '-5%',
              animation: 'blobDrift 22s ease-in-out 6s infinite',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)',
              bottom: '0%', left: '40%',
              animation: 'blobDrift 15s ease-in-out 3s infinite',
            }}
          />
          {/* Very subtle top radial sweep */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(37,99,235,0.07)_0%,transparent_65%)]" />
        </div>

        {/* ── Sparkles & Particles across background ── */}
        <Sparkle top="10%" left="6%" size={14} delay={0} color="#6366f1" opacity={0.4} />
        <Sparkle top="18%" left="20%" size={10} delay={1} color="#2563eb" opacity={0.35} />
        <Sparkle top="65%" left="4%" size={12} delay={1.5} color="#6366f1" opacity={0.3} />

        {/* Extra sparkles emphasizing the right side background */}
        <Sparkle top="6%" right="28%" size={16} delay={0.4} color="#3b82f6" opacity={0.5} />
        <Sparkle top="14%" right="8%" size={18} delay={1.2} color="#6366f1" opacity={0.6} />
        <Sparkle top="45%" right="4%" size={12} delay={2.0} color="#f59e0b" opacity={0.55} />
        <Sparkle top="72%" right="12%" size={20} delay={0.8} color="#2563eb" opacity={0.45} />
        <Sparkle top="82%" right="25%" size={14} delay={1.6} color="#6366f1" opacity={0.5} />

        {/* Small floating geometric background shapes */}
        <FloatingParticle type="circle" top="28%" left="3%" size={20} delay={0.8} duration={9} />
        <FloatingParticle type="diamond" top="54%" left="7%" size={12} delay={2.0} duration={8} />
        <FloatingParticle type="plus" top="22%" left="15%" size={18} delay={1.5} duration={7} />

        <FloatingParticle type="ring" top="20%" right="4%" size={48} delay={1.2} duration={12} />
        <FloatingParticle type="halo" top="58%" right="5%" size={32} delay={0.3} duration={10} />
        <FloatingParticle type="triangle" top="75%" right="15%" size={22} delay={2.4} duration={8} />

        {/* ── Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT: headline + CTA */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200/80 text-primary-700 text-sm font-semibold mb-7 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                <span>{t('hero.sparkle')}</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.04] mb-6"
              >
                {t('hero.title1')}<br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)' }}
                >
                  {t('hero.titleAccent')}
                </span>
                <br />{t('hero.title2')}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* CTA block */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5 }}
                className="flex flex-col items-center lg:items-start gap-4"
              >
                {!user ? (
                  <>
                    {/* Primary CTA */}
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-base sm:text-lg transition-colors duration-200 cursor-pointer shadow-sm"
                    >
                      {t('hero.buildBtn')}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 w-full max-w-[320px] mx-auto lg:mx-0">
                      <div className="flex-1 h-px bg-slate-200" />
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">or</span>
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Google login */}
                    <div className="flex justify-center lg:justify-start" ref={googleLoginRef}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.error('Login Failed')}
                        text="continue_with"
                        size="large"
                        theme="outline"
                        shape="rectangular"
                      />
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg transition-colors duration-200 cursor-pointer shadow-sm"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                )}
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="flex items-center gap-3 mt-8 justify-center lg:justify-start"
              >

              </motion.div>
            </div>

            {/* RIGHT: Resume preview + Social proof composition */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              className="flex-1 hidden lg:block relative w-full max-w-[420px] mx-auto"
            >
              {/* Soft subtle radial glow behind preview */}
              <div
                className="absolute inset-[-15%] rounded-full -z-10 pointer-events-none opacity-50 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(99,102,241,0.08) 50%, transparent 80%)',
                }}
              />

              {/* ── RIGHT HERO DEDICATED FLOATING DECORATIVE PARTICLES ── */}
              {/* Top-Right floating cluster */}
              <Sparkle top="-32px" right="-28px" size={22} delay={0.2} color="#f59e0b" opacity={0.85} />
              <Sparkle top="-15px" right="65px" size={14} delay={1.4} color="#6366f1" opacity={0.7} />
              <FloatingParticle type="ring" top="-45px" right="-10px" size={60} delay={0.1} duration={10} />
              <FloatingParticle type="dot" top="-22px" right="110px" size={10} delay={0.7} duration={6} />
              <FloatingParticle type="diamond" top="-18px" right="-45px" size={14} delay={1.8} duration={7} />

              {/* Top-Left floating cluster above ScoreCard */}
              <Sparkle top="-25px" left="-20px" size={18} delay={0.9} color="#2563eb" opacity={0.75} />
              <FloatingParticle type="halo" top="-38px" left="-48px" size={44} delay={1.3} duration={8} />
              <FloatingParticle type="plus" top="15px" left="-58px" size={20} delay={2.1} duration={6} />

              {/* Middle-Right floating particles (Beside ATS & Quick cards) */}
              <Sparkle top="26%" right="-55px" size={20} delay={0.5} color="#8b5cf6" opacity={0.8} />
              <FloatingParticle type="triangle" top="36%" right="-68px" size={22} delay={1.6} duration={7} />
              <FloatingParticle type="dot" top="48%" right="-42px" size={12} delay={0.4} duration={5} />
              <FloatingParticle type="ring" top="42%" right="-78px" size={48} delay={1.1} duration={11} />
              <FloatingParticle type="diamond" top="58%" right="-64px" size={12} delay={2.3} duration={8} />

              {/* Middle-Left floating particles (Beside Score Card & Preview) */}
              <Sparkle top="34%" left="-48px" size={16} delay={1.1} color="#f59e0b" opacity={0.75} />
              <FloatingParticle type="halo" top="46%" left="-72px" size={38} delay={0.6} duration={9} />
              <FloatingParticle type="dot" top="58%" left="-52px" size={10} delay={1.9} duration={6} />
              <Sparkle top="66%" left="-38px" size={14} delay={0.3} color="#2563eb" opacity={0.65} />

              {/* Bottom right & bottom left floating cluster around Social Proof */}
              <Sparkle bottom="-18px" right="25px" size={20} delay={2.2} color="#6366f1" opacity={0.8} />
              <Sparkle bottom="35px" right="-52px" size={16} delay={1.0} color="#10b981" opacity={0.7} />
              <FloatingParticle type="ring" bottom="-28px" right="-35px" size={54} delay={0.8} duration={12} />
              <FloatingParticle type="plus" bottom="42px" right="-48px" size={18} delay={1.4} duration={7} />
              <FloatingParticle type="diamond" bottom="-16px" left="-30px" size={14} delay={0.5} duration={8} />
              <Sparkle bottom="24px" left="-45px" size={16} delay={1.7} color="#ec4899" opacity={0.7} />

              {/* Floating preview card composition */}
              <div className="relative z-10" style={{ transform: 'rotate(2deg)' }}>
                <ScoreCard />
                <ATSCard />
                <QuickCard />
                <ResumePreviewCard />
              </div>

              {/* Integrated Right-Side Social Proof Section */}
              <div className="mt-8 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-card flex items-center gap-4 transition-all duration-300 hover:shadow-card-hover relative z-10">
                {/* Overlapping User Avatars */}
                <div className="flex -space-x-2.5 flex-shrink-0">
                  {[
                    'from-blue-500 to-indigo-600',
                    'from-indigo-500 to-purple-600',
                    'from-violet-500 to-pink-500',
                    'from-emerald-400 to-teal-500',
                    'from-sky-400 to-blue-600'
                  ].map((g, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} ring-2 ring-white shadow-sm flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110 hover:z-30`}
                      style={{ transform: `translateY(${i % 2 === 0 ? '0px' : '-2px'})` }}
                    >
                      {['A', 'J', 'K', 'M', 'R'][i]}
                    </div>
                  ))}
                </div>

                {/* Rating & Social Text */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800 ml-1">5.0</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    Loved by 1,000+ job seekers
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    Join thousands of professionals building better resumes.
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════ */}
      <section id="features" className="py-24 bg-slate-50/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t('features.title')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group bg-white p-7 rounded-3xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY / VALUES  (dark section)
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#0f1e3a 45%,#1e1b4b 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DOT_GRID, backgroundSize: '24px 24px', opacity: 0.06 }} />
        <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[70%] bg-primary-800/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-indigo-800/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Job Seekers Love ALRes</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Designed by students, for students and job seekers.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.05 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/[0.06] p-7 rounded-2xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/30 to-indigo-500/30 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TEMPLATES  (infinite carousel)
      ══════════════════════════════════════════════════════ */}
      <section id="templates" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5">
              Templates Built for{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg,#2563eb 0%,#6366f1 100%)' }}
              >
                Success
              </span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Choose from our curated collection of professional, ATS-friendly templates designed to get you noticed.
            </p>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          {/* Fade masks */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-infinite-scroll gap-5 sm:gap-8 py-4">
            {[...resumeImages, ...resumeImages].map((img, idx) => (
              <div
                key={idx}
                className="w-[150px] sm:w-[300px] aspect-[1/1.414] bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden flex-shrink-0 hover:shadow-card-hover hover:scale-[1.02] transition-all duration-500 cursor-pointer"
              >
                <img src={img} alt={`Resume Template ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA  (dark card)
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#0f172a 0%,#0f1e3a 45%,#1e1b4b 100%)' }}
          >
            {/* Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[100%] bg-primary-800/35 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[45%] h-[80%] bg-indigo-800/30 rounded-full blur-[70px] pointer-events-none" />
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Ready to land your dream job?</h2>
              <p className="text-slate-300 text-sm sm:text-base mb-10 max-w-xl mx-auto leading-relaxed">
                Join thousands of professionals who have accelerated their careers using ALRes. Build your professional presence today.
              </p>

              <div className="flex flex-col items-center gap-4">
                {!user ? (
                  <>
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-base sm:text-lg transition-colors duration-200 cursor-pointer shadow-sm"
                    >
                      {t('hero.buildBtn')}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                    {/* Hidden google login ref for CTA trigger */}
                    <div className="hidden" ref={googleLoginRef}>
                      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} />
                    </div>
                    <button
                      onClick={triggerGoogleLogin}
                      className="flex items-center gap-2.5 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 transition-colors duration-200 cursor-pointer shadow-sm"
                    >
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                      Continue with Google
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg transition-colors duration-200 cursor-pointer shadow-sm"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
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
