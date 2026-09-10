import React from 'react';
import { createPortal } from 'react-dom';
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
    error: <AlertCircle className="w-5 h-5 text-pen" />,
    question: <HelpCircle className="w-5 h-5 text-blue-500" />
  };

  const iconBg = {
    info: 'bg-blue-50 ring-1 ring-blue-100',
    success: 'bg-emerald-50 ring-1 ring-emerald-100',
    warning: 'bg-amber-50 ring-1 ring-amber-100',
    error: 'bg-red-50 ring-1 ring-red-100',
    question: 'bg-blue-50 ring-1 ring-blue-100',
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity" 
          style={{ background: 'rgba(22,32,43,0.5)' }}
          onClick={onClose}
        ></div>

        <div className={`relative z-10 transform overflow-hidden bg-white text-left shadow-2xl ring-1 ring-rule transition-all sm:my-8 w-full ${maxWidth}`} style={{ borderRadius: '2px' }}>
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${iconBg[type]}`} style={{ borderRadius: '2px' }}>
                  {icons[type]}
                </div>
                <h3 className="text-xl font-serif font-semibold text-ink">
                  {title}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="text-ink-soft hover:text-ink transition-colors p-1.5 hover:bg-paper-dim"
                style={{ borderRadius: '2px' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 text-ink-soft">
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
    </div>,
    document.body
  );
};

export default Modal;
