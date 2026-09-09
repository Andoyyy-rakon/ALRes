import { Layout, Check, Globe, PieChart, Trash2, Wand2, Type, ChevronDown, ChevronUp } from 'lucide-react';
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

const SectionStylePanel = ({ sectionKey, resume, setResume }) => {
  const sectionStyle = resume.sectionStyles?.[sectionKey] || {};
  const update = (key, val) => {
    setResume(prev => ({
      ...prev,
      sectionStyles: {
        ...(prev.sectionStyles || {}),
        [sectionKey]: { ...(prev.sectionStyles?.[sectionKey] || {}), [key]: val }
      }
    }));
  };
  return (
    <div className="mb-3 p-3 bg-paper-dim border border-rule grid grid-cols-3 gap-2" style={{ borderRadius: '2px' }}>
      <div>
        <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Font</label>
        <select value={sectionStyle.fontFamily || ''} onChange={e => update('fontFamily', e.target.value)}
          className="w-full text-xs p-1.5 border border-rule bg-white text-ink" style={{ borderRadius: '2px' }}>
          {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
        </select>
      </div>
      <div>
        <label className="text-[10px] font-bold text-ink-soft uppercase block mb-1">Size</label>
        <select value={sectionStyle.fontSize || ''} onChange={e => update('fontSize', e.target.value)}
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
        <select value={sectionStyle.fontWeight || ''} onChange={e => update('fontWeight', e.target.value)}
          className="w-full text-xs p-1.5 border border-rule bg-white text-ink" style={{ borderRadius: '2px' }}>
          <option value="">Default</option>
          <option value="300">Light</option>
          <option value="400">Regular</option>
          <option value="500">Medium</option>
          <option value="700">Bold</option>
        </select>
      </div>
    </div>
  );
};

const toText = (val) => Array.isArray(val) ? val.join('\n') : (typeof val === 'string' ? val : '');

const OtherSectionsEditor = ({ resume, setResume, enhanceWithAI, handleGrammarCheck, aiLoading, confirmDelete }) => {
  const { t } = useLanguage();
  const [openStyle, setOpenStyle] = useState(null);

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...(prev.projects || []), { name: '', description: '', url: '' }],
      enabledSections: { ...prev.enabledSections, projects: true }
    }));
  };

  const removeProject = (index) => {
    confirmDelete(() => {
      const newProj = [...resume.projects];
      newProj.splice(index, 1);
      setResume({ ...resume, projects: newProj });
    }, "Delete Project", "Are you sure you want to delete this project?");
  };

  const updateProject = (index, field, value) => {
    const newProj = [...resume.projects];
    newProj[index][field] = value;
    setResume({ ...resume, projects: newProj });
  };

  const toggleStyle = (section) => {
    setOpenStyle(openStyle === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* PROJECTS SECTION */}
      {resume.enabledSections.projects && (
        <section>
          <div className="flex items-center justify-between mb-4 border-b border-rule pb-3">
            <h3 className="text-lg font-serif font-bold text-ink flex items-center">
              <Layout className="w-5 h-5 mr-2 text-blue-500" />
              {t('resume.projects')}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => toggleStyle('projects')}
                className="text-[10px] font-bold text-ink-soft bg-paper-dim px-2 py-1 border border-rule hover:bg-paper transition-colors flex items-center gap-1"
                style={{ borderRadius: '2px' }}
              >
                <Type className="w-3 h-3" /> STYLE
                {openStyle === 'projects' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              <button
                onClick={addProject}
                className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 border border-blue-200 hover:bg-blue-100 transition-colors"
                style={{ borderRadius: '2px' }}
              >
                + {t('editor.addEntry')}
              </button>
            </div>
          </div>
          
          {openStyle === 'projects' && <SectionStylePanel sectionKey="projects" resume={resume} setResume={setResume} />}

          <div className="space-y-4">
            {(resume.projects || []).map((proj, index) => (
              <div key={index} className="p-4 bg-paper-dim border border-rule relative group" style={{ borderRadius: '2px' }}>
                <button
                  onClick={() => removeProject(index)}
                  className="absolute -top-2 -right-2 bg-red-100 text-pen border border-red-200 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1">{t('editor.projects') || 'Project Name'}</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      className="w-full text-sm p-2.5 border border-rule bg-white text-ink focus:border-blue-500 outline-none transition-colors"
                      style={{ borderRadius: '2px' }}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-1">Project URL</label>
                    <input
                      type="url"
                      value={proj.url}
                      onChange={(e) => updateProject(index, 'url', e.target.value)}
                      className="w-full text-sm p-2.5 border border-rule bg-white text-ink focus:border-blue-500 outline-none transition-colors"
                      style={{ borderRadius: '2px' }}
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-ink-soft uppercase tracking-wider">{t('editor.description')}</label>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleGrammarCheck(proj.description, 'projects', index)}
                                disabled={aiLoading}
                                className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                                style={{ borderRadius: '2px' }}
                            >
                                <Check className="w-3 h-3" />
                                {t('editor.grammar')}
                            </button>
                        </div>
                    </div>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      className="w-full text-sm p-2.5 border border-rule bg-white text-ink focus:border-blue-500 outline-none resize-none transition-colors"
                      style={{ borderRadius: '2px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS SECTION */}
      {resume.enabledSections.certifications && (
        <section>
          <div className="flex items-center justify-between mb-3 border-b border-rule pb-2">
            <h3 className="text-base font-serif font-bold text-ink flex items-center">
              <Check className="w-4 h-4 mr-2 text-blue-500" />
              {t('resume.certifications')}
            </h3>
            <div className="flex gap-2">
                <button
                  onClick={() => toggleStyle('certifications')}
                  className="text-[10px] font-bold text-ink-soft bg-paper-dim px-2 py-1 border border-rule hover:bg-paper transition-colors flex items-center gap-1"
                  style={{ borderRadius: '2px' }}
                >
                  <Type className="w-3 h-3" /> STYLE
                  {openStyle === 'certifications' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                <button 
                    onClick={() => handleGrammarCheck(toText(resume.certifications), 'certifications')}
                    disabled={aiLoading}
                    className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    style={{ borderRadius: '2px' }}
                >
                    {t('editor.grammar')}
                </button>
                <button 
                    onClick={() => enhanceWithAI('certificates', 0)}
                    disabled={aiLoading}
                    className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1 uppercase tracking-wider"
                    style={{ borderRadius: '2px' }}
                >
                    <Wand2 className="w-3 h-3" />
                    ENHANCE
                </button>
            </div>
          </div>
          
          {openStyle === 'certifications' && <SectionStylePanel sectionKey="certifications" resume={resume} setResume={setResume} />}

          <textarea
            rows={3}
            placeholder="AWS Certified Solutions Architect, Google Professional Data Engineer"
            value={toText(resume.certifications)}
            onChange={(e) => setResume({ 
              ...resume, 
              certifications: e.target.value.split('\n').filter(s => s.trim())
            })}
            className="block w-full border border-rule focus:border-blue-500 text-sm bg-white text-ink p-3 resize-none outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </section>
      )}

      {/* LANGUAGES SECTION */}
      {resume.enabledSections.languages && (
        <section>
          <div className="flex items-center justify-between mb-3 border-b border-rule pb-2">
            <h3 className="text-base font-serif font-bold text-ink flex items-center">
              <Globe className="w-4 h-4 mr-2 text-blue-500" />
              {t('resume.languages')}
            </h3>
            <div className="flex gap-2">
                <button
                  onClick={() => toggleStyle('languages')}
                  className="text-[10px] font-bold text-ink-soft bg-paper-dim px-2 py-1 border border-rule hover:bg-paper transition-colors flex items-center gap-1"
                  style={{ borderRadius: '2px' }}
                >
                  <Type className="w-3 h-3" /> STYLE
                  {openStyle === 'languages' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                <button 
                    onClick={() => handleGrammarCheck(toText(resume.languages), 'languages')}
                    disabled={aiLoading}
                    className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    style={{ borderRadius: '2px' }}
                >
                    {t('editor.grammar')}
                </button>
                <button 
                    onClick={() => enhanceWithAI('languages', 0)}
                    disabled={aiLoading}
                    className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1 uppercase tracking-wider"
                    style={{ borderRadius: '2px' }}
                >
                    <Wand2 className="w-3 h-3" />
                    FORMAT
                </button>
            </div>
          </div>

          {openStyle === 'languages' && <SectionStylePanel sectionKey="languages" resume={resume} setResume={setResume} />}

          <div className="p-4 bg-paper-dim border border-rule relative group" style={{ borderRadius: '2px' }}>
            <textarea
              rows={3}
              placeholder="English (Fluent), Spanish (Conversational)"
              value={toText(resume.languages)}
              onChange={(e) => setResume({ 
                ...resume, 
                languages: e.target.value.split('\n').filter(s => s.trim())
              })}
              className="block w-full border border-rule focus:border-blue-500 text-sm bg-white text-ink p-3 resize-none outline-none transition-colors"
              style={{ borderRadius: '2px' }}
            />
          </div>
        </section>
      )}

      {/* ACHIEVEMENTS SECTION */}
      {resume.enabledSections.achievements && (
        <section>
          <div className="flex items-center justify-between mb-3 border-b border-rule pb-2">
            <h3 className="text-base font-serif font-bold text-ink flex items-center">
              <PieChart className="w-4 h-4 mr-2 text-blue-500" />
              {t('resume.achievements') || 'Achievements'}
            </h3>
            <div className="flex gap-2">
                <button
                  onClick={() => toggleStyle('achievements')}
                  className="text-[10px] font-bold text-ink-soft bg-paper-dim px-2 py-1 border border-rule hover:bg-paper transition-colors flex items-center gap-1"
                  style={{ borderRadius: '2px' }}
                >
                  <Type className="w-3 h-3" /> STYLE
                  {openStyle === 'achievements' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                <button 
                    onClick={() => handleGrammarCheck(toText(resume.achievements), 'achievements')}
                    disabled={aiLoading}
                    className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    style={{ borderRadius: '2px' }}
                >
                    {t('editor.grammar')}
                </button>
                <button 
                    onClick={() => enhanceWithAI('achievements', 0)}
                    disabled={aiLoading}
                    className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center gap-1 uppercase tracking-wider"
                    style={{ borderRadius: '2px' }}
                >
                    <Wand2 className="w-3 h-3" />
                    ENHANCE
                </button>
            </div>
          </div>

          {openStyle === 'achievements' && <SectionStylePanel sectionKey="achievements" resume={resume} setResume={setResume} />}

          <textarea
            rows={3}
            placeholder="Employee of the Year 2023, Ranked top 10% in coding competition"
            value={toText(resume.achievements)}
            onChange={(e) => setResume({ 
              ...resume, 
              achievements: e.target.value.split('\n').filter(s => s.trim())
            })}
            className="block w-full border border-rule focus:border-blue-500 text-sm bg-white text-ink p-3 resize-none outline-none transition-colors"
            style={{ borderRadius: '2px' }}
          />
        </section>
      )}
    </div>
  );
};

export default OtherSectionsEditor;
