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
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Open Sans', value: '"Open Sans", sans-serif' },
    { name: 'Lato', value: 'Lato, sans-serif' },
    { name: 'Montserrat', value: 'Montserrat, sans-serif' },
    { name: 'Playfair Display', value: '"Playfair Display", serif' },
    { name: 'Merriweather', value: 'Merriweather, serif' },
    { name: 'Source Code Pro', value: '"Source Code Pro", monospace' },
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
    <div className={`flex bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full ${mobileSidebarOpen ? '' : 'max-h-[800px]'}`}>
      {}
      <div className="w-20 bg-slate-50 border-r border-slate-200 flex flex-col items-center py-6 gap-4">
        <button 
          onClick={() => setActiveTab('templates')}
          className={`flex flex-col items-center gap-1 group transition-all ${activeTab === 'templates' ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <div className={`p-2.5 rounded-xl transition-all ${activeTab === 'templates' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white border border-slate-100 group-hover:bg-slate-100'}`}>
            <Layout className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Design</span>
        </button>

        <button 
          onClick={() => setActiveTab('content')}
          className={`flex flex-col items-center gap-1 group transition-all ${activeTab === 'content' ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <div className={`p-2.5 rounded-xl transition-all ${activeTab === 'content' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white border border-slate-100 group-hover:bg-slate-100'}`}>
            <Settings2 className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Content</span>
        </button>

        <button 
          onClick={() => setActiveTab('design')}
          className={`flex flex-col items-center gap-1 group transition-all ${activeTab === 'design' ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <div className={`p-2.5 rounded-xl transition-all ${activeTab === 'design' ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white border border-slate-100 group-hover:bg-slate-100'}`}>
            <Palette className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest mt-1">Style</span>
        </button>
      </div>

      {}
      <aside className="w-72 flex flex-col overflow-y-auto px-4 py-6 custom-scrollbar bg-white">
        {activeTab === 'templates' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Templates</h3>
              <p className="text-[10px] text-slate-500 mb-4">Choose a professional layout to start.</p>
              
              <div className="grid grid-cols-1 gap-4">
                {VISUAL_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`group relative flex flex-col rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                      resume.templateId === t.id
                      ? 'border-primary-500 ring-4 ring-primary-500/10 shadow-lg scale-[1.02]'
                      : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="aspect-[4/4] overflow-hidden">
                      <img src={t.thumbnail} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className={`absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 transition-colors`} />
                    </div>
                    <div className={`p-3 flex justify-between items-center ${resume.templateId === t.id ? 'bg-primary-500 text-white' : 'bg-white text-slate-900'}`}>
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-tight leading-none">{t.name}</div>
                        <div className={`text-[9px] mt-1 ${resume.templateId === t.id ? 'text-primary-100' : 'text-slate-500'}`}>
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
              <h3 className="text-sm font-bold text-slate-900 mb-1">Visible Sections</h3>
              <p className="text-[10px] text-slate-500 mb-4">Show or hide parts of your resume.</p>
              
              <div className="space-y-2">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => toggleSection(id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                      resume.enabledSections[id] 
                      ? 'bg-primary-50 text-primary-700 border border-primary-100 shadow-sm' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-lg mr-3 ${resume.enabledSections[id] ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                         <Icon className="w-3.5 h-3.5" />
                      </div>
                      {label}
                    </div>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${resume.enabledSections[id] ? 'bg-primary-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${resume.enabledSections[id] ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
            {}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Typography</h3>
              
              <div className="space-y-4">
                {}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Type className="w-3 h-3" /> FONT STYLE
                  </label>
                  <select 
                    value={resume.fontFamily || 'Inter, sans-serif'}
                    onChange={(e) => setResume({ ...resume, fontFamily: e.target.value })}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    {fonts.map(font => (
                      <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>{font.name}</option>
                    ))}
                  </select>
                </div>

                {}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Maximize2 className="w-3 h-3" /> SIZE
                    </label>
                    <select 
                      value={resume.fontSize || '11px'}
                      onChange={(e) => setResume({ ...resume, fontSize: e.target.value })}
                      className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      {fontSizes.map(size => (
                        <option key={size.label} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Bold className="w-3 h-3" /> WEIGHT
                    </label>
                    <select 
                      value={resume.fontWeight || '400'}
                      onChange={(e) => setResume({ ...resume, fontWeight: e.target.value })}
                      className="w-full text-xs font-bold p-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    >
                      {fontWeights.map(weight => (
                        <option key={weight.label} value={weight.value}>{weight.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Layout</h3>
              <div className="grid grid-cols-1 gap-2">
                {['A4', 'Letter', 'Long'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPaperSize(size)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold border-2 transition-all ${
                      paperSize === size 
                      ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' 
                      : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col items-start translate-y-0.5">
                       <span>{size}</span>
                       <span className="text-[8px] text-slate-400 font-medium tracking-wide uppercase">
                         {size === 'A4' ? '210 × 297 mm' : size === 'Letter' ? '216 × 279 mm' : '216 × 356 mm'}
                       </span>
                    </div>
                    {paperSize === size && <Check className="w-4 h-4 text-primary-600" />}
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
