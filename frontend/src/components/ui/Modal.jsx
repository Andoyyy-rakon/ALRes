import React from 'react';
import { X, AlertCircle, Info, CheckCircle2, HelpCircle } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = 'info', 
  footer,
  maxWidth = 'sm:max-w-lg'
}) => {
  if (!isOpen) return null;

  const icons = {
    info: <Info className="w-5 h-5 text-blue-500" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    question: <HelpCircle className="w-5 h-5 text-primary-500" />
  };

  const iconBg = {
    info: 'bg-blue-50 ring-1 ring-blue-100',
    success: 'bg-emerald-50 ring-1 ring-emerald-100',
    warning: 'bg-amber-50 ring-1 ring-amber-100',
    error: 'bg-red-50 ring-1 ring-red-100',
    question: 'bg-primary-50 ring-1 ring-primary-100',
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900/50 transition-opacity" 
          onClick={onClose}
        ></div>

        <div className={`relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl ring-1 ring-slate-900/8 transition-all sm:my-8 w-full ${maxWidth}`}>
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${iconBg[type]}`}>
                  {icons[type]}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {title}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 text-slate-600">
              {children}
            </div>

            {footer && (
              <div className="mt-8 flex gap-3 justify-end">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
