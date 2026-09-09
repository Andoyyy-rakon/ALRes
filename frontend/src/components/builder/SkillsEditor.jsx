import { Award, Loader2, Wand2, User, Check, Plus, X, ChevronDown, ChevronUp, Type } from 'lucide-react';
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

const SkillsEditor = ({ resume, setResume, enhanceWithAI, handleGrammarCheck, aiLoading, type = 'skills', confirmDelete }) => {
  const { t } = useLanguage();
  const isSummary = type === 'summary';
  const label = isSummary ? t('editor.summary') : t('editor.skills');
  const icon = isSummary ? <User className="w-5 h-5 mr-2 text-blue-500" /> : <Award className="w-5 h-5 mr-2 text-blue-500" />;

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 border-b border-rule pb-3">
          <h3 className="text-lg font-serif font-bold text-ink flex items-center">
            {icon} {label}
          </h3>
          <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
            <button
              onClick={() => setShowStyle(s => !s)}
              className="text-[10px] font-bold text-ink-soft bg-paper-dim px-2 py-1 border border-rule hover:bg-paper transition-colors flex items-center gap-1"
              style={{ borderRadius: '2px' }}
              title="Section typography"
            >
              <Type className="w-3 h-3" />
              STYLE
              {showStyle ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              onClick={() => handleGrammarCheck(resume.summary, 'summary')}
              disabled={aiLoading}
              className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1"
              style={{ borderRadius: '2px' }}
            >
              <Check className="w-3 h-3" /> {t('editor.grammar')}
            </button>
            <button
              onClick={() => enhanceWithAI('summary')}
              disabled={aiLoading}
              className="text-[10px] inline-flex items-center px-2 py-1 border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition font-bold uppercase tracking-wider"
              style={{ borderRadius: '2px' }}
            >
              {aiLoading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
              AI REWRITE
            </button>
          </div>
        </div>

        {showStyle && (
          <div className="mb-3 p-3 bg-paper-dim border border-rule grid grid-cols-3 gap-2" style={{ borderRadius: '2px' }}>
            <div>
              <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Font</label>
              <select value={sectionStyle.fontFamily || ''} onChange={e => updateSectionStyle('fontFamily', e.target.value)}
                className="w-full text-xs p-1.5 border border-rule bg-white text-ink" style={{ borderRadius: '2px' }}>
                {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Size</label>
              <select value={sectionStyle.fontSize || ''} onChange={e => updateSectionStyle('fontSize', e.target.value)}
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
              <select value={sectionStyle.fontWeight || ''} onChange={e => updateSectionStyle('fontWeight', e.target.value)}
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

        <textarea
          rows={6}
          placeholder="Experienced professional with..."
          value={resume.summary || ''}
          onChange={e => setResume({ ...resume, summary: e.target.value })}
          className="block w-full border border-rule focus:border-blue-500 sm:text-sm bg-white text-ink p-3 resize-none outline-none transition-colors"
          style={{ borderRadius: '2px' }}
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
      <div className="flex items-center justify-between mb-4 border-b border-rule pb-3">
        <h3 className="text-lg font-serif font-bold text-ink flex items-center">
          {icon} {label}
        </h3>
        <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
          <button
            onClick={() => setShowStyle(s => !s)}
            className="text-[10px] font-bold text-ink-soft bg-paper-dim px-2 py-1 border border-rule hover:bg-paper transition-colors flex items-center gap-1"
            style={{ borderRadius: '2px' }}
          >
            <Type className="w-3 h-3" /> STYLE
            {showStyle ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <button
            onClick={() => enhanceWithAI('skills')}
            disabled={aiLoading}
            className="text-[10px] sm:text-xs inline-flex items-center px-2.5 py-1 border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition font-bold uppercase tracking-wider"
            style={{ borderRadius: '2px' }}
          >
            {aiLoading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Wand2 className="w-3 h-3 mr-1" />}
            AI SUGGEST
          </button>
        </div>
      </div>

      {showStyle && (
        <div className="mb-3 p-3 bg-paper-dim border border-rule grid grid-cols-3 gap-2" style={{ borderRadius: '2px' }}>
          <div>
            <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Font</label>
            <select value={sectionStyle.fontFamily || ''} onChange={e => updateSectionStyle('fontFamily', e.target.value)}
              className="w-full text-xs p-1.5 border border-rule bg-white text-ink" style={{ borderRadius: '2px' }}>
              {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Size</label>
            <select value={sectionStyle.fontSize || ''} onChange={e => updateSectionStyle('fontSize', e.target.value)}
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
            <select value={sectionStyle.fontWeight || ''} onChange={e => updateSectionStyle('fontWeight', e.target.value)}
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

      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-ink-soft text-sm font-bold w-4 text-center">•</span>
            <input
              type="text"
              value={skill}
              onChange={e => updateSkill(index, e.target.value)}
              placeholder={`Skill ${index + 1} (e.g. React, Python, Leadership)`}
              className="flex-1 text-sm p-2.5 border border-rule bg-white text-ink focus:border-blue-500 outline-none transition-colors"
              style={{ borderRadius: '2px' }}
            />
            <button
              onClick={() => removeSkill(index)}
              className="text-ink-soft hover:text-pen transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addSkill}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2 border border-dashed border-rule text-ink-soft text-xs font-bold uppercase tracking-wider hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
        style={{ borderRadius: '2px' }}
      >
        <Plus className="w-4 h-4" />
        {t('editor.addEntry')}
      </button>
    </section>
  );
};

export default SkillsEditor;
