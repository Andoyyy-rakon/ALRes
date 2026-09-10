import React, { useState } from 'react';
import { Camera, User, Briefcase, GraduationCap, Award, Layout, Check, Globe, PieChart, Type, Maximize2, Bold, Palette, Settings2 } from 'lucide-react';

import { VISUAL_TEMPLATES } from '../../data/visualTemplates';

const BuilderSidebar = ({ 
  showSidebar, 
  viewMode, 
  mobileView,
  mobileSidebarOpen,
  resume, 
  setResume, 
  paperSize, 
  setPaperSize 
}) => {
  const [activeTab, setActiveTab] = useState('templates'); 

  const sections = [
    { id: 'photo', label: 'Profile Photo', icon: Camera },
    { id: 'summary', label: 'Summary', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'projects', label: 'Projects', icon: Layout },
    { id: 'certifications', label: 'Certifications', icon: Check },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'achievements', label: 'Achievements', icon: PieChart },
  ];

  const fonts = [
    { name: 'Fraunces (Serif)', value: '"Fraunces", serif' },
    { name: 'Public Sans', value: '"Public Sans", sans-serif' },
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: '"Open Sans", sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Playfair Display', value: '"Playfair Display", serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
  ];

  const fontSizes = [
    { label: 'Small', value: '10px' },
    { label: 'Medium', value: '11px' },
    { label: 'Large', value: '12px' },
    { label: 'X-Large', value: '13px' },
  ];

  const fontWeights = [
    { label: 'Light', value: '300' },
    { label: 'Regular', value: '400' },
    { label: 'Medium', value: '500' },
    { label: 'Bold', value: '700' },
  ];

  const toggleSection = (id) => {
    setResume(prev => ({
      ...prev,
      enabledSections: {
        ...prev.enabledSections,
        [id]: !prev.enabledSections[id]
      }
    }));
  };

  const handleTemplateChange = (templateId) => {
    const template = VISUAL_TEMPLATES.find(t => t.id === templateId);
    setResume(prev => ({
      ...prev,
      templateId,
      fontFamily: template?.defaultStyles?.fontFamily || prev.fontFamily,
      fontSize: template?.defaultStyles?.fontSize || prev.fontSize,
      styleColor: template?.defaultStyles?.color || prev.styleColor
    }));
  };

  if (!showSidebar || viewMode !== 'split') return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  if (isMobile && mobileView === 'preview' && !mobileSidebarOpen) return null;

  return (
    <div className={`flex bg-white border border-rule shadow-card overflow-hidden h-full ${mobileSidebarOpen ? '' : 'max-h-[800px]'}`} style={{ borderRadius: '2px' }}>
      {/* Icon navigation strip */}
      <div className="w-20 bg-paper-dim border-r border-rule flex flex-col items-center py-6 gap-4">
        <button 
          onClick={() => setActiveTab('templates')}
          className={`flex flex-col items-center gap-1 group transition-all ${activeTab === 'templates' ? 'text-blue-500' : 'text-ink-soft hover:text-ink'}`}
        >
          <div className={`p-2.5 transition-all ${activeTab === 'templates' ? 'bg-blue-500 text-white shadow-sm' : 'bg-white border border-rule group-hover:bg-paper'}`} style={{ borderRadius: '2px' }}>
            <Layout className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider mt-1">Design</span>
        </button>

        <button 
          onClick={() => setActiveTab('content')}
          className={`flex flex-col items-center gap-1 group transition-all ${activeTab === 'content' ? 'text-blue-500' : 'text-ink-soft hover:text-ink'}`}
        >
          <div className={`p-2.5 transition-all ${activeTab === 'content' ? 'bg-blue-500 text-white shadow-sm' : 'bg-white border border-rule group-hover:bg-paper'}`} style={{ borderRadius: '2px' }}>
            <Settings2 className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider mt-1">Content</span>
        </button>

        <button 
          onClick={() => setActiveTab('design')}
          className={`flex flex-col items-center gap-1 group transition-all ${activeTab === 'design' ? 'text-blue-500' : 'text-ink-soft hover:text-ink'}`}
        >
          <div className={`p-2.5 transition-all ${activeTab === 'design' ? 'bg-blue-500 text-white shadow-sm' : 'bg-white border border-rule group-hover:bg-paper'}`} style={{ borderRadius: '2px' }}>
            <Palette className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider mt-1">Style</span>
        </button>
      </div>

      {/* Main tab content */}
      <aside className="w-72 flex flex-col overflow-y-auto px-4 py-6 custom-scrollbar bg-white">
        {activeTab === 'templates' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
            <div>
              <h3 className="text-sm font-serif font-semibold text-ink mb-1">Templates</h3>
              <p className="text-[11px] text-ink-soft mb-4">Choose a professional layout to start.</p>
              
              <div className="grid grid-cols-1 gap-4">
                {VISUAL_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`group relative flex flex-col border transition-all duration-300 ${
                      resume.templateId === t.id
                      ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-card'
                      : 'border-rule hover:border-rule-strong'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="aspect-[4/4] overflow-hidden">
                      <img src={t.thumbnail} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className={`absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors`} />
                    </div>
                    <div className={`p-3 flex justify-between items-center ${resume.templateId === t.id ? 'bg-blue-500 text-white' : 'bg-white text-ink'}`}>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-tight leading-none">{t.name}</div>
                        <div className={`text-[9px] mt-1 ${resume.templateId === t.id ? 'text-blue-100' : 'text-ink-soft'}`}>
                          {t.layoutType.replace('-', ' ')}
                        </div>
                      </div>
                      {resume.templateId === t.id && <Check className="w-4 h-4" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
            <div>
              <h3 className="text-sm font-serif font-semibold text-ink mb-1">Visible Sections</h3>
              <p className="text-[11px] text-ink-soft mb-4">Show or hide parts of your resume.</p>
              
              <div className="space-y-2">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => toggleSection(id)}
                    className={`w-full flex items-center justify-between p-3 border text-xs font-bold transition-all ${
                      resume.enabledSections[id] 
                      ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' 
                      : 'bg-paper text-ink-soft hover:bg-paper-dim border-rule'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex items-center">
                      <div className={`p-1.5 mr-3 ${resume.enabledSections[id] ? 'bg-blue-500 text-white' : 'bg-paper-dim text-ink-soft'}`} style={{ borderRadius: '2px' }}>
                         <Icon className="w-3.5 h-3.5" />
                      </div>
                      {label}
                    </div>
                    <div className={`w-8 h-4 relative transition-colors ${resume.enabledSections[id] ? 'bg-blue-500' : 'bg-rule-strong'}`} style={{ borderRadius: '99px' }}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white shadow-sm transition-all ${resume.enabledSections[id] ? 'right-0.5' : 'left-0.5'}`} style={{ borderRadius: '99px' }}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
            {/* Typography */}
            <div className="space-y-4">
              <h3 className="text-sm font-serif font-semibold text-ink mb-1">Typography</h3>
              
              <div className="space-y-4">
                {/* Font Family */}
                <div>
                  <label className="text-[10px] font-bold text-ink-soft uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Type className="w-3 h-3" /> FONT STYLE
                  </label>
                  <select 
                    value={resume.fontFamily || '"Public Sans", sans-serif'}
                    onChange={(e) => setResume({ ...resume, fontFamily: e.target.value })}
                    className="w-full text-xs font-bold p-3 border border-rule bg-white text-ink focus:outline-none focus:border-blue-500 transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    {fonts.map(font => (
                      <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>{font.name}</option>
                    ))}
                  </select>
                </div>

                {/* Font Size & Weight */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-ink-soft uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Maximize2 className="w-3 h-3" /> SIZE
                    </label>
                    <select 
                      value={resume.fontSize || '11px'}
                      onChange={(e) => setResume({ ...resume, fontSize: e.target.value })}
                      className="w-full text-xs font-bold p-3 border border-rule bg-white text-ink focus:outline-none focus:border-blue-500 transition-colors"
                      style={{ borderRadius: '2px' }}
                    >
                      {fontSizes.map(size => (
                        <option key={size.label} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-ink-soft uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Bold className="w-3 h-3" /> WEIGHT
                    </label>
                    <select 
                      value={resume.fontWeight || '400'}
                      onChange={(e) => setResume({ ...resume, fontWeight: e.target.value })}
                      className="w-full text-xs font-bold p-3 border border-rule bg-white text-ink focus:outline-none focus:border-blue-500 transition-colors"
                      style={{ borderRadius: '2px' }}
                    >
                      {fontWeights.map(weight => (
                        <option key={weight.label} value={weight.value}>{weight.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Paper Size */}
            <div className="space-y-4">
              <h3 className="text-sm font-serif font-semibold text-ink mb-1">Layout</h3>
              <div className="grid grid-cols-1 gap-2">
                {['A4', 'Letter', 'Long'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPaperSize(size)}
                    className={`flex items-center justify-between p-3 text-xs font-bold border transition-all ${
                      paperSize === size 
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                      : 'bg-white border-rule text-ink-soft hover:bg-paper-dim hover:text-ink'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <div className="flex flex-col items-start translate-y-0.5">
                       <span>{size}</span>
                       <span className="text-[8px] text-ink-soft font-medium tracking-wider uppercase">
                         {size === 'A4' ? '210 × 297 mm' : size === 'Letter' ? '216 × 279 mm' : '216 × 356 mm'}
                       </span>
                    </div>
                    {paperSize === size && <Check className="w-4 h-4 text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default BuilderSidebar;
