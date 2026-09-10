

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
            <div className="bg-emerald-50 p-3" style={{ borderRadius: '2px' }}>
              <Send className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <h4 className="text-lg font-serif font-semibold text-ink mb-2">
            {t('contactForm.success')}
          </h4>

          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="mt-6 px-6 py-2 bg-ink text-paper font-bold hover:bg-blue-deep transition-colors"
            style={{ borderRadius: '2px' }}
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
        <div className="bg-paper-dim p-3 border border-rule mb-6" style={{ borderRadius: '2px' }}>
          <p className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-1">
            {t('contactForm.ownerEmail')}
          </p>
        </div>

        {}
        <div>
          <label className="text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
            <User className="w-4 h-4 text-ink-soft" />
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
            className="block w-full border border-rule p-3 bg-white text-ink focus:border-blue-500 focus:outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        {}
        <div>
          <label className="text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
            <Mail className="w-4 h-4 text-ink-soft" />
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
            className="block w-full border border-rule p-3 bg-white text-ink focus:border-blue-500 focus:outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        {}
        <div>
          <label className="text-sm font-bold text-ink mb-1.5 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-ink-soft" />
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
            className="block w-full border border-rule p-3 resize-none bg-white text-ink focus:border-blue-500 focus:outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        {}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-ink hover:bg-blue-deep text-paper font-bold disabled:opacity-50 transition-colors duration-200 cursor-pointer"
          style={{ borderRadius: '2px' }}
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