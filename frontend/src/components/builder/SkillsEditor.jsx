import { Award, Loader2, Wand2, User, Check, Plus, X, ChevronDown, ChevronUp, Type } from 'lucide-react';
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

const SkillsEditor = ({ resume, setResume, enhanceWithAI, handleGrammarCheck, aiLoading, type = 'skills', confirmDelete }) => {
  const { t } = useLanguage();
  const isSummary = type === 'summary';
  const label = isSummary ? t('editor.summary') : t('editor.skills');
  const icon = isSummary ? <User className="w-5 h-5 mr-2 text-slate-400" /> : <Award className="w-5 h-5 mr-2 text-slate-400" />;

  const [showStyle, setShowStyle] = useState(false);
  const sectionKey = isSummary ? 'summary' : 'skills';
  const sectionStyle = resume.sectionStyles?.[sectionKey] || {};

  const updateSectionStyle = (key, val) => {
    setResume(prev => ({
      ...prev,
      sectionStyles: {
        ...(prev.sectionStyles || {}),
        [sectionKey]: {
          ...(prev.sectionStyles?.[sectionKey] || {}),
          [key]: val
        }
      }
    }));
  };

  if (isSummary) {
    return (
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-slate-100 pb-2">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center">
            {icon} {label}
          </h3>
          <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
            <button
              onClick={() => setShowStyle(s => !s)}
              className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1"
              title="Section typography"
            >
              <Type className="w-3 h-3" />
              STYLE
              {showStyle ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              onClick={() => handleGrammarCheck(resume.summary, 'summary')}
              disabled={aiLoading}
              className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1.5 rounded-lg border border-green-100 hover:bg-green-100 transition-colors flex items-center gap-1"
            >
              <Check className="w-3 h-3" /> {t('editor.grammar')}
            </button>
            <button
              onClick={() => enhanceWithAI('summary')}
              disabled={aiLoading}
              className="text-[10px] inline-flex items-center px-2 py-1.5 border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 transition font-medium rounded-lg"
            >
              {aiLoading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
              AI REWRITE
            </button>
          </div>
        </div>

        {showStyle && (
          <div className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Font</label>
              <select value={sectionStyle.fontFamily || ''} onChange={e => updateSectionStyle('fontFamily', e.target.value)}
                className="w-full text-xs p-1.5 rounded border border-slate-200 bg-white text-slate-700">
                {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Size</label>
              <select value={sectionStyle.fontSize || ''} onChange={e => updateSectionStyle('fontSize', e.target.value)}
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
              <select value={sectionStyle.fontWeight || ''} onChange={e => updateSectionStyle('fontWeight', e.target.value)}
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

        <textarea
          rows={6}
          placeholder="Experienced professional with..."
          value={resume.summary || ''}
          onChange={e => setResume({ ...resume, summary: e.target.value })}
          className="block w-full rounded-md border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-slate-900 p-2.5 resize-none"
        />
      </section>
    );
  }

  const skills = resume.skills || [];

  const addSkill = () => {
    setResume(prev => ({ ...prev, skills: [...(prev.skills || []), ''] }));
  };

  const updateSkill = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setResume(prev => ({ ...prev, skills: updated }));
  };

  const removeSkill = (index) => {
    confirmDelete(() => {
      const updated = skills.filter((_, i) => i !== index);
      setResume(prev => ({ ...prev, skills: updated }));
    }, "Delete Skill", "Are you sure you want to remove this skill?");
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
          {icon} {label}
        </h3>
        <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
          <button
            onClick={() => setShowStyle(s => !s)}
            className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <Type className="w-3 h-3" /> STYLE
            {showStyle ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <button
            onClick={() => enhanceWithAI('skills')}
            disabled={aiLoading}
            className="text-[10px] sm:text-xs inline-flex items-center px-2.5 py-1.5 border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 transition font-medium rounded-lg"
          >
            {aiLoading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
            AI SUGGEST
          </button>
        </div>
      </div>

      {showStyle && (
        <div className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">Font</label>
            <select value={sectionStyle.fontFamily || ''} onChange={e => updateSectionStyle('fontFamily', e.target.value)}
              className="w-full text-xs p-1.5 rounded border border-slate-200 bg-white text-slate-700">
              {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">Size</label>
            <select value={sectionStyle.fontSize || ''} onChange={e => updateSectionStyle('fontSize', e.target.value)}
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
            <select value={sectionStyle.fontWeight || ''} onChange={e => updateSectionStyle('fontWeight', e.target.value)}
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

      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-slate-400 text-sm font-bold w-4 text-center">•</span>
            <input
              type="text"
              value={skill}
              onChange={e => updateSkill(index, e.target.value)}
              placeholder={`Skill ${index + 1} (e.g. React, Python, Leadership)`}
              className="flex-1 text-sm p-2 rounded-md border border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-white text-slate-900"
            />
            <button
              onClick={() => removeSkill(index)}
              className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addSkill}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-slate-200 text-slate-400 text-sm font-medium rounded-lg hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
      >
        <Plus className="w-4 h-4" />
        {t('editor.addEntry')}
      </button>
    </section>
  );
};

export default SkillsEditor;
