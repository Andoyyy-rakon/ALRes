import React from 'react';
import { Camera, Trash2, Check, Globe, Linkedin, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const PersonalInfoEditor = ({
  resume,
  setResume,
  handlePersonalInfoChange,
  handlePhotoUpload,
  handleJobSpecificChange,
  RESUME_TEMPLATES,
  handleGrammarCheck
}) => {
  const { t } = useLanguage();
  const { fields: jobFields = [] } = RESUME_TEMPLATES[resume.jobRole] || {};

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-rule pb-3">
        <h3 className="text-lg font-serif font-bold text-ink flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          {t('editor.personalInfo')}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2">
        {/* Resume Title */}
        {resume.templateId !== 'harvard' && (
          <div className="col-span-2">
            <label className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-ink-soft" />
              {t('editor.resumeTitle')}
            </label>
            <input
              type="text"
              placeholder="New Untitled Resume"
              value={['New Untitled Resume', 'Untitled Resume'].includes(resume.title) ? '' : (resume.title || '')}
              onChange={(e) => setResume(prev => ({ ...prev, title: e.target.value }))}
              className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 outline-none transition-colors"
              style={{ borderRadius: '2px' }}
            />
          </div>
        )}

        <div className="col-span-2 sm:col-span-1">
          <label className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <User className="w-4 h-4 text-ink-soft" />
            {t('editor.fullName')}
          </label>
          <input
            type="text"
            name="fullName" 
            placeholder="Natalie Audrey"
            value={resume.personalInfo.fullName || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <Mail className="w-4 h-4 text-ink-soft" />
            {t('editor.email')}
          </label>
          <input
            type="email"
            name="email"
            placeholder="NatalieAud@gmail.com"
            value={resume.personalInfo.email || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <Phone className="w-4 h-4 text-ink-soft" />
            {t('editor.phone')}
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={resume.personalInfo.phone || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-ink-soft" />
            {t('editor.location')}
          </label>
          <input
            type="text"
            name="location"
            placeholder="City, Country"
            value={resume.personalInfo.location || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-ink-soft" />
            {t('editor.linkedIn')}
          </label>
          <input
            type="url"
            name="linkedInUrl"
            placeholder="linkedin.com/in/username"
            value={resume.personalInfo.linkedInUrl || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-ink-soft uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-ink-soft" />
              {t('editor.profilePhoto')}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-ink-soft font-bold uppercase tracking-wider">{t('editor.showInResume')}</span>
              <input
                type="checkbox"
                checked={resume.enabledSections.photo || false}
                onChange={(e) => {
                  setResume(prev => ({
                    ...prev,
                    enabledSections: { ...prev.enabledSections, photo: e.target.checked }
                  }));
                }}
                className="h-4 w-4 bg-white border-rule text-blue-500 focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 p-2.5 bg-paper-dim border border-rule" style={{ borderRadius: '2px' }}>
            {resume.personalInfo.photoUrl ? (
              <div className="relative group flex-shrink-0">
                <img
                  src={resume.personalInfo.photoUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border border-rule shadow-sm"
                />
                <button
                  onClick={() => setResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, photoUrl: '' } }))}
                  className="absolute -top-1 -right-1 bg-pen text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-12 h-12 bg-white flex items-center justify-center text-ink-soft border border-dashed border-rule flex-shrink-0" style={{ borderRadius: '2px' }}>
                <Camera className="w-5 h-5" />
              </div>
            )}
            <label className="flex-1 cursor-pointer">
              <span className="inline-flex items-center justify-center w-full px-3 py-2 border border-rule text-xs font-bold text-ink bg-white hover:bg-paper transition-all" style={{ borderRadius: '2px' }}>
                {resume.personalInfo.photoUrl ? t('editor.changePhoto') : t('editor.uploadPhoto')}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>
        </div>

        {/* Dynamic Job Specific Fields */}
        {jobFields.map((field) => (
          <div key={field.id} className="col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider">{field.label}</label>
              {field.type === 'textarea' && (
                <button
                  onClick={() => handleGrammarCheck(resume.jobSpecificFields?.[field.id] || '', 'jobSpecificFields', field.id)}
                  className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                  style={{ borderRadius: '2px' }}
                >
                  <Check className="w-3 h-3" />
                  {t('editor.grammar')}
                </button>
              )}
            </div>
            {field.type === 'textarea' ? (
              <textarea
                value={resume.jobSpecificFields?.[field.id] || ''}
                onChange={(e) => handleJobSpecificChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 resize-none outline-none transition-colors"
                style={{ borderRadius: '2px' }}
              />
            ) : (
              <input
                type={field.type === 'tags' ? 'text' : field.type}
                value={resume.jobSpecificFields?.[field.id] || ''}
                onChange={(e) => handleJobSpecificChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 outline-none transition-colors"
                style={{ borderRadius: '2px' }}
              />
            )}
            {field.type === 'tags' && <p className="mt-1 text-[10px] text-ink-soft">Separate with commas</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalInfoEditor;
