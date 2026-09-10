import { LogOut, User as UserIcon, LogIn, Layout, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import logo from '../../assets/logo.png';
import Modal from '../ui/Modal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { user, login, logout, isLoginModalOpen, openLoginModal, closeLoginModal } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoggingIn(true);
    try {
      const { data } = await axios.post('/auth/google', {
        credential: credentialResponse.credential,
      });

      login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-rule" style={{ background: 'rgba(243,246,252,0.92)', backdropFilter: 'blur(6px)' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group transition-all">
              <div className="p-1.5 rounded-sm transition-colors group-hover:bg-paper-dim">
                <img src={logo} alt="ALRes Logo" className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 transition-transform group-hover:scale-105" />
              </div>
              <span className="ml-1.5 font-serif text-xl sm:text-2xl font-semibold tracking-tight">
                AL<span className="text-blue-500">Res</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="relative text-ink-soft hover:text-ink px-2 sm:px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[1px] after:bg-pen after:scale-x-0 after:origin-center hover:after:scale-x-100 after:transition-transform after:duration-250"
                >
                  {t('nav.dashboard')}
                </Link>
                
                <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-rule flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {user.picture ? (
                      <img src={user.picture} alt="Avatar" className="w-8 h-8 rounded-full ring-2 ring-blue-500 ring-offset-1 flex-shrink-0" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-paper-dim ring-2 ring-blue-500 ring-offset-1 flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-4 h-4 text-blue-500" />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-ink hidden md:block truncate max-w-[100px]">{user.name}</span>
                  </div>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="p-1.5 sm:p-2 text-ink-soft hover:text-pen transition-colors rounded-sm hover:bg-red-50 flex-shrink-0"
                    title="Logout"
                  >
                     <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center flex-shrink-0 ml-2">
                <button
                  onClick={openLoginModal}
                  className="btn-gradient flex items-center px-6 py-2 text-white rounded-sm font-bold text-sm sm:text-base border border-transparent"
                >
                  {t('nav.signIn')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        title={t('auth.modalTitle')}
        type="info"
        maxWidth="sm:max-w-md"
      >
        <div className="flex flex-col gap-6 py-4">
          <p className="text-sm text-ink-soft text-center">
            Choose how you want to access your resumes.
          </p>
          
          <div className="flex flex-col gap-4">
            {/* Google Login Option */}
            <div className="group relative w-full">
              <div className="relative flex flex-col items-center bg-white border border-rule rounded-sm p-4 sm:p-6 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-card">
                <div className="w-full max-w-[280px] flex justify-center mb-4 overflow-hidden">
                  <div className="w-[calc(100vw-120px)] sm:w-full min-w-[200px] max-w-[280px] overflow-hidden flex justify-center">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        handleGoogleSuccess(credentialResponse);
                        closeLoginModal();
                      }}
                      onError={() => console.error('Login Failed')}
                      useOneTap={false}
                      theme="filled_blue"
                      shape="rectangular"
                      width="100%"
                      text="signin_with"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-bold text-ink mb-1">Sync with Cloud</h4>
                  <p className="text-xs text-ink-soft">
                    Sync resumes across devices and never lose your progress.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center py-2">
              <div className="border-t border-rule w-full"></div>
              <span className="bg-white px-4 text-xs font-bold text-ink-soft uppercase tracking-widest absolute">OR</span>
            </div>

            {/* Local Workspace Option */}
            <button
              onClick={() => {
                closeLoginModal();
                navigate('/dashboard');
              }}
              className="group relative flex items-center gap-4 w-full p-6 bg-paper-dim border border-rule rounded-sm transition-colors duration-200 hover:bg-paper hover:border-blue-500"
            >
              <div className="flex-shrink-0 p-3 bg-white border border-rule rounded-sm text-ink-soft group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:border-blue-200 transition-colors duration-200 shadow-sm">
                <Layout className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block text-base font-bold text-ink group-hover:text-blue-500 transition-colors">
                  {t('auth.localMode')}
                </span>
                <span className="block text-xs text-ink-soft mt-1 leading-relaxed">
                  {t('auth.localModeDesc')}
                </span>
              </div>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-blue-500" />
              </div>
            </button>
          </div>
          
          <p className="text-[10px] text-ink-soft text-center px-6">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        type="warning"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              className="px-5 py-2.5 text-sm font-semibold text-ink bg-paper-dim border border-rule hover:bg-paper transition-colors cursor-pointer"
              style={{ borderRadius: '2px' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-5 py-2.5 text-sm font-semibold text-white border-none cursor-pointer flex items-center gap-2"
              style={{ background: '#A6402D', borderRadius: '2px', transition: 'background 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#853222'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#A6402D'; }}
            >
              <LogOut className="w-4 h-4 text-white" />
              <span>Yes, Logout</span>
            </button>
          </div>
        }
      >
        <p className="text-sm text-ink-soft">
          Are you sure you want to log out? You will need to sign in again to access your cloud resumes.
        </p>
      </Modal>

      {/* Google Login Loading Overlay */}
      {isLoggingIn && createPortal(
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-paper/90 backdrop-blur-md transition-all animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-rule border-t-blue-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={logo} alt="ALRes Logo" className="w-12 h-12 object-contain" />
            </div>
          </div>
          <div className="mt-8 text-center">
            <h4 className="text-xl font-serif font-semibold text-ink mb-2">Signing you in...</h4>
            <p className="text-ink-soft text-sm animate-pulse">Connecting your account to ALRes</p>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
