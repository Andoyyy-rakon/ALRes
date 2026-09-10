import { GraduationCap, Trash2, ChevronDown, ChevronUp, Type } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FONTS = [
  { name: 'Default', value: '' },
  { name: 'Fraunces (Serif)', value: '"Fraunces", serif' },
  { name: 'Public Sans', value: '"Public Sans", sans-serif' },
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
      <div className="flex items-center justify-between mb-4 border-b border-rule pb-3">
        <h3 className="text-lg font-serif font-bold text-ink flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-blue-500" />
          {t('editor.education')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStyle(s => !s)}
            className="text-[10px] font-bold text-ink-soft bg-paper-dim px-2 py-1 border border-rule hover:bg-paper transition-colors flex items-center gap-1"
            style={{ borderRadius: '2px' }}
          >
            <Type className="w-3 h-3" /> STYLE
            {showStyle ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <button
            onClick={addEducation}
            className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 border border-blue-200 hover:bg-blue-100 transition-colors"
            style={{ borderRadius: '2px' }}
          >
            + {t('editor.addEntry')}
          </button>
        </div>
      </div>

      {showStyle && (
        <div className="mb-3 p-3 bg-paper-dim border border-rule grid grid-cols-3 gap-2" style={{ borderRadius: '2px' }}>
          <div>
            <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Font</label>
            <select value={sectionStyle.fontFamily || ''} onChange={e => updateStyle('fontFamily', e.target.value)}
              className="w-full text-xs p-1.5 border border-rule bg-white text-ink" style={{ borderRadius: '2px' }}>
              {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Size</label>
            <select value={sectionStyle.fontSize || ''} onChange={e => updateStyle('fontSize', e.target.value)}
              className="w-full text-xs p-1.5 border border-rule bg-white text-ink" style={{ borderRadius: '2px' }}>
              <option value="">Default</option>
              <option value="9px">Small</option>
              <option value="10px">Medium</option>
              <option value="11px">Large</option>
              <option value="12px">X-Large</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Weight</label>
            <select value={sectionStyle.fontWeight || ''} onChange={e => updateStyle('fontWeight', e.target.value)}
              className="w-full text-xs p-1.5 border border-rule bg-white text-ink" style={{ borderRadius: '2px' }}>
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
          <div key={index} className="p-4 bg-paper-dim border border-rule relative group" style={{ borderRadius: '2px' }}>
            <button
              onClick={() => removeEducation(index)}
              className="absolute -top-2 -right-2 bg-red-100 text-pen border border-red-200 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1">{t('editor.institution')}</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  className="w-full text-sm p-2.5 border border-rule bg-white text-ink focus:border-blue-500 outline-none transition-colors"
                  style={{ borderRadius: '2px' }}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1">{t('editor.degree')}</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    updateEducation(index, 'degree', e.target.value);
                    updateEducation(index, 'fieldOfStudy', '');
                  }}
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  className="w-full text-sm p-2.5 border border-rule bg-white text-ink focus:border-blue-500 outline-none transition-colors"
                  style={{ borderRadius: '2px' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 col-span-2 sm:col-span-1">
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1">{t('editor.startDate')}</label>
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                    className="w-full text-sm p-2.5 border border-rule bg-white text-ink focus:border-blue-500 outline-none transition-colors"
                    style={{ borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1">{t('editor.endDate')}</label>
                  <input
                    type="text"
                    placeholder="YYYY or Present"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                    className="w-full text-sm p-2.5 border border-rule bg-white text-ink focus:border-blue-500 outline-none transition-colors"
                    style={{ borderRadius: '2px' }}
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
