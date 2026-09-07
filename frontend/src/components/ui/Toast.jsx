import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />,
    loading: <Loader2 className="w-5 h-5 text-primary-500 animate-spin flex-shrink-0" />
  };

  const styles = {
    success: 'bg-white border-l-4 border-l-emerald-500 border border-slate-200',
    error: 'bg-white border-l-4 border-l-red-500 border border-slate-200',
    info: 'bg-white border-l-4 border-l-blue-500 border border-slate-200',
    loading: 'bg-white border-l-4 border-l-primary-500 border border-slate-200'
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-card animate-in slide-in-from-right duration-300 max-w-sm ${styles[type]}`}>
      {icons[type]}
      <p className="text-sm font-semibold text-slate-800 flex-1">
        {message}
      </p>
      <button 
        onClick={onClose}
        className="ml-1 text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-lg hover:bg-slate-100 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
