import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../api/axiosInstance';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import logo from '../../assets/logo.png'; 

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  if (!isLoginModalOpen) return null;

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoggingIn(true);
    try {
      const { data } = await axios.post('/auth/google', {
        credential: credentialResponse.credential,
      });
      login(data);
      closeLoginModal();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoggingIn(false);
    }
  };

  const handleManualLogin = (e) => {
    e.preventDefault();

    alert('This is a mock login. Please use "Continue with Google" for now.');
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900/50 transition-opacity" 
          onClick={closeLoginModal}
        ></div>

        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full sm:max-w-md">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Welcome back
              </h3>
              <button 
                onClick={closeLoginModal}
                className="text-slate-400 hover:text-slate-500 transition-colors p-1 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleManualLogin} className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" 
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 outline-none transition-all" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 outline-none transition-all" 
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm mt-2"
              >
                Log in
              </button>
            </form>
            
            <div className="relative w-full flex items-center justify-center mb-6">
              <div className="absolute border-t border-slate-200 w-full"></div>
              <span className="relative bg-white px-4 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Or continue with
              </span>
            </div>
            
            <div className="w-full flex justify-center overflow-hidden px-4">
              <div className="w-full max-w-[280px] overflow-hidden flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.error('Login Failed')}
                  text="continue_with"
                  size="large"
                  theme="outline"
                  shape="rectangular"
                  width="100%"
                />
              </div>
            </div>
            
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoggingIn && (
          <div className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md transition-all animate-in fade-in duration-300">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={logo} alt="ALRes Logo" className="w-12 h-12 object-contain" />
              </div>
            </div>
            <div className="mt-8 text-center">
              <h4 className="text-xl font-bold text-slate-900 mb-2">Signing you in...</h4>
              <p className="text-slate-500 text-sm animate-pulse">Please wait while we connect your account</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
