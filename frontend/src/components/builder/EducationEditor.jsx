import { GraduationCap, Trash2, ChevronDown, ChevronUp, Type } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FONTS = [
  { name: 'Default', value: '' },
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
];

const EducationEditor = ({ resume, setResume, handleGrammarCheck, confirmDelete }) => {
  const { t } = useLanguage();
  const [showStyle, setShowStyle] = useState(false);
  const sectionStyle = resume.sectionStyles?.education || {};

  const updateStyle = (key, val) => {
    setResume(prev => ({
      ...prev,
      sectionStyles: {
        ...(prev.sectionStyles || {}),
        education: { ...(prev.sectionStyles?.education || {}), [key]: val }
      }
    }));
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...(prev.education || []), { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', current: false }]
    }));
  };

  const removeEducation = (index) => {
    confirmDelete(() => {
      const newEdu = [...resume.education];
      newEdu.splice(index, 1);
      setResume({ ...resume, education: newEdu });
    }, "Delete Education", "Are you sure you want to delete this education entry?");
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...resume.education];
    newEdu[index][field] = value;
    setResume({ ...resume, education: newEdu });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-slate-400" />
          {t('editor.education')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStyle(s => !s)}
            className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <Type className="w-3 h-3" /> STYLE
            {showStyle ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <button
            onClick={addEducation}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 hover:bg-primary-100 transition-colors"
          >
            + {t('editor.addEntry')}
          </button>
        </div>
      </div>

      {showStyle && (
        <div className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">Font</label>
            <select value={sectionStyle.fontFamily || ''} onChange={e => updateStyle('fontFamily', e.target.value)}
              className="w-full text-xs p-1.5 rounded border border-slate-200 bg-white text-slate-700">
              {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">Size</label>
            <select value={sectionStyle.fontSize || ''} onChange={e => updateStyle('fontSize', e.target.value)}
              className="w-full text-xs p-1.5 rounded border border-slate-200 bg-white text-slate-700">
              <option value="">Default</option>
              <option value="9px">Small</option>
              <option value="10px">Medium</option>
              <option value="11px">Large</option>
              <option value="12px">X-Large</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">Weight</label>
            <select value={sectionStyle.fontWeight || ''} onChange={e => updateStyle('fontWeight', e.target.value)}
              className="w-full text-xs p-1.5 rounded border border-slate-200 bg-white text-slate-700">
              <option value="">Default</option>
              <option value="300">Light</option>
              <option value="400">Regular</option>
              <option value="500">Medium</option>
              <option value="700">Bold</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {(resume.education || []).map((edu, index) => (
          <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
            <button
              onClick={() => removeEducation(index)}
              className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">{t('editor.institution')}</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  className="w-full text-sm p-2 rounded-md border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white text-slate-900"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">{t('editor.degree')}</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    updateEducation(index, 'degree', e.target.value);
                    updateEducation(index, 'fieldOfStudy', '');
                  }}
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  className="w-full text-sm p-2 rounded-md border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white text-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 col-span-2 sm:col-span-1">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t('editor.startDate')}</label>
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    className="w-full text-sm p-2 rounded-md border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{t('editor.endDate')}</label>
                  <input
                    type="text"
                    placeholder="YYYY or Present"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    className="w-full text-sm p-2 rounded-md border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationEditor;
