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
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-500" />
          {t('editor.personalInfo')}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2">
        {}
        {resume.templateId !== 'harvard' && (
          <div className="col-span-2">
            <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" />
              {t('editor.resumeTitle')}
            </label>
            <input
              type="text"
              placeholder="New Untitled Resume"
              value={['New Untitled Resume', 'Untitled Resume'].includes(resume.title) ? '' : (resume.title || '')}
              onChange={(e) => setResume(prev => ({ ...prev, title: e.target.value }))}
              className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-3 transition-shadow hover:shadow-md"
            />
            <p className="mt-1.5 text-[11px] text-slate-500"></p>
          </div>
        )}

        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            {t('editor.fullName')}
          </label>
          <input
            type="text"
            name="fullName" 
            placeholder="Natalie Audrey"
            value={resume.personalInfo.fullName || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-3"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            {t('editor.email')}
          </label>
          <input
            type="email"
            name="email"
            placeholder="NatalieAud@gmail.com"
            value={resume.personalInfo.email || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-3"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            {t('editor.phone')}
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={resume.personalInfo.phone || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-3"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            {t('editor.location')}
          </label>
          <input
            type="text"
            name="location"
            placeholder="City, Country"
            value={resume.personalInfo.location || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-3"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-slate-400" />
            {t('editor.linkedIn')}
          </label>
          <input
            type="url"
            name="linkedInUrl"
            placeholder="linkedin.com/in/username"
            value={resume.personalInfo.linkedInUrl || ''}
            onChange={handlePersonalInfoChange}
            className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-3"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Camera className="w-4 h-4 text-slate-400" />
              {t('editor.profilePhoto')}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-medium">{t('editor.showInResume')}</span>
              <input
                type="checkbox"
                checked={resume.enabledSections.photo || false}
                onChange={(e) => {
                  setResume(prev => ({
                    ...prev,
                    enabledSections: { ...prev.enabledSections, photo: e.target.checked }
                  }));
                }}
                className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4 bg-white border-slate-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-lg border border-slate-100">
            {resume.personalInfo.photoUrl ? (
              <div className="relative group flex-shrink-0">
                <img
                  src={resume.personalInfo.photoUrl}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <button
                  onClick={() => setResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, photoUrl: '' } }))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 border border-dashed border-slate-300 flex-shrink-0">
                <Camera className="w-5 h-5" />
              </div>
            )}
            <label className="flex-1 cursor-pointer">
              <span className="inline-flex items-center justify-center w-full px-3 py-2 border border-slate-300 shadow-sm text-xs font-bold rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-all hover:border-primary-300 active:scale-95">
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

        {}
        {jobFields.map((field) => (
          <div key={field.id} className="col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-bold text-slate-700">{field.label}</label>
              {field.type === 'textarea' && (
                <button
                  onClick={() => handleGrammarCheck(resume.jobSpecificFields?.[field.id] || '', 'jobSpecificFields', field.id)}
                  className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 hover:bg-green-100 transition-colors flex items-center gap-1"
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
                className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-3 resize-none transition-shadow hover:shadow-md"
              />
            ) : (
              <input
                type={field.type === 'tags' ? 'text' : field.type}
                value={resume.jobSpecificFields?.[field.id] || ''}
                onChange={(e) => handleJobSpecificChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="block w-full rounded-lg border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-3 transition-shadow hover:shadow-md"
              />
            )}
            {field.type === 'tags' && <p className="mt-1 text-[10px] text-slate-400">Separate with commas</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalInfoEditor;
