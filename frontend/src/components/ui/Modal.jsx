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
    info: <Info className="w-6 h-6 text-blue-500" />,
    success: <CheckCircle2 className="w-6 h-6 text-green-500" />,
    warning: <AlertCircle className="w-6 h-6 text-yellow-500" />,
    error: <AlertCircle className="w-6 h-6 text-red-500" />,
    question: <HelpCircle className="w-6 h-6 text-primary-500" />
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        ></div>

        <div className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full ${maxWidth}`}>
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {icons[type]}
                <h3 className="text-xl font-bold text-slate-900">
                  {title}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-500 transition-colors p-1 rounded-full hover:bg-slate-100"
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
