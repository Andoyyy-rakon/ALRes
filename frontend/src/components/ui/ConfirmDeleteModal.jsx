import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import Modal from './Modal';

const ConfirmDeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete Item",
  cancelText = "Cancel"
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type="warning"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {confirmText}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-red-50 rounded-2xl shrink-0">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <p className="text-slate-600 leading-relaxed">
          {message}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
