

import React, { useState, useRef } from 'react';
import Modal from './Modal';
import { Send, User, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import emailjs from '@emailjs/browser';

const ContactModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const formRef = useRef();

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.user_name,
      email: formData.user_email,
      message: formData.message,
      time: new Date().toLocaleString(),
    };
    
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    )
    .then(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      setFormData({
        user_name: '',
        user_email: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      setIsSubmitting(false);
      alert("Failed to send message. Please try again.");
    });
  };

  if (submitted) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSubmitted(false);
          onClose();
        }}
        title={t('contactForm.title')}
        type="success"
      >
        <div className="text-center py-8">
          <div className="mb-4 flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Send className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 mb-2">
            {t('contactForm.success')}
          </h4>

          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('contactForm.title')}
      type="question"
    >
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 pt-2">

        {}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            {t('contactForm.ownerEmail')}
          </p>
        </div>

        {}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            {t('contactForm.name')}
          </label>

          <input
            type="text"
            name="user_name"
            required
            value={formData.user_name}
            onChange={(e) =>
              setFormData({ ...formData, user_name: e.target.value })
            }
            placeholder={t('contactForm.placeholderName')}
            className="block w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        {}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            {t('contactForm.email')}
          </label>

          <input
            type="email"
            name="user_email"
            required
            value={formData.user_email}
            onChange={(e) =>
              setFormData({ ...formData, user_email: e.target.value })
            }
            placeholder={t('contactForm.placeholderEmail')}
            className="block w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        {}
        <div>
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            {t('contactForm.message')}
          </label>

          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder={t('contactForm.placeholderMessage')}
            className="block w-full rounded-lg border border-slate-300 p-3 resize-none"
          />
        </div>

        {}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold disabled:opacity-50 transition-colors duration-180 cursor-pointer"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t('contactForm.send')}
            </>
          )}
        </button>

      </form>
    </Modal>
  );
};

export default ContactModal;