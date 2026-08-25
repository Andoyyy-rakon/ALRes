import React from 'react';
import { Layout, Globe, Briefcase } from 'lucide-react';
import { RESUME_TEMPLATES } from '../../data/resumeTemplates';
import { useLanguage } from '../../context/LanguageContext';

const getPaperDimensions = (paperSize) => {
  switch (paperSize) {
    case 'Letter':
      return { width: '215.9mm', height: '279.4mm' };
    case 'Long':
      return { width: '215.9mm', height: '355.6mm' };
    case 'A4':
    default:
      return { width: '210mm', height: '297mm' };
  }
};

const ResumePreview = ({ resume, paperSize, viewMode, mobileView, onOverflowChange }) => {
  const { t } = useLanguage();
  const paperRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const checkOverflow = () => {
      if (paperRef.current) {
        const { scrollHeight } = paperRef.current;

        const paperStyle = window.getComputedStyle(paperRef.current);
        const minHeightPx = parseFloat(paperStyle.minHeight);

        const manualPaperHeightPx = parseFloat(getPaperDimensions(paperSize).height) * 3.7795275591;
        const targetHeight = !isNaN(minHeightPx) && minHeightPx > 0 ? minHeightPx : manualPaperHeightPx;

        const isOverflowing = scrollHeight > targetHeight + 10;
        
        if (typeof onOverflowChange === 'function') {
          onOverflowChange(isOverflowing);
        }
      }
    };

    const timeoutId = setTimeout(checkOverflow, 100);
    return () => clearTimeout(timeoutId);
  }, [resume, paperSize, onOverflowChange]);

  const templateId = resume.templateId || 'modern';

  const globalFontStyle = {
    fontFamily: resume.fontFamily || 'Inter, sans-serif',
    fontSize: resume.fontSize || '11px',
    fontWeight: resume.fontWeight || '400',
    color: '#1e293b'
  };

  const getSectionStyle = (sectionKey) => {
    const override = resume.sectionStyles?.[sectionKey] || {};
    return {
      fontFamily: override.fontFamily || globalFontStyle.fontFamily,
      fontSize: override.fontSize || globalFontStyle.fontSize,
      fontWeight: override.fontWeight || globalFontStyle.fontWeight,
    };
  };

  const Header = () => {
    if (templateId === 'executive-scholar') {
      return (
        <header className="border-b-4 border-slate-900 pb-4 mb-8">
          <h1 className="text-3xl font-black text-slate-900 text-center tracking-tight mb-1">
            {resume.personalInfo.fullName || 'YOUR NAME'}
          </h1>
          {resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) && (
            <p className="text-center text-[0.9em] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">
              {resume.title}
            </p>
          )}
          <div className="text-[0.85em] text-slate-600 flex justify-center gap-6 font-bold uppercase tracking-wider">
            {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          </div>
        </header>
      );
    }

    if (templateId === 'modern') {
      return (
        <header className="flex justify-between items-start mb-8 pb-6 border-b-2 border-slate-100">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              {resume.personalInfo.fullName || 'YOUR NAME'}
            </h1>
            {resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) && (
              <p className="text-lg font-bold text-primary-600 mb-4 uppercase tracking-wider">
                {resume.title}
              </p>
            )}
            <div className="text-[0.85em] text-slate-600 flex flex-wrap gap-x-4 gap-y-1 font-medium">
              {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
              {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
              {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
              {resume.personalInfo.linkedInUrl && <span>{resume.personalInfo.linkedInUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
            </div>
          </div>
          {resume.enabledSections.photo && resume.personalInfo.photoUrl && (
            <img src={resume.personalInfo.photoUrl} alt="Profile" className="w-28 h-28 rounded-2xl object-cover border-4 border-white ml-8" />
          )}
        </header>
      );
    }

    if (templateId === 'modern-tech') {
      return (
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-6">
            {resume.enabledSections.photo && resume.personalInfo.photoUrl && (
              <img src={resume.personalInfo.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-primary-100" />
            )}
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter">
                {resume.personalInfo.fullName || 'YOUR NAME'}
              </h1>
              {resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) && (
                <p className="text-primary-600 font-bold tracking-[0.2em] uppercase mt-1">
                  {resume.title}
                </p>
              )}
            </div>
          </div>
          <div className="text-right text-[0.85em] text-slate-500 space-y-1">
            {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
            {resume.personalInfo.phone && <div>{resume.personalInfo.phone}</div>}
            {resume.personalInfo.location && <div>{resume.personalInfo.location}</div>}
            {resume.personalInfo.linkedInUrl && <div>{resume.personalInfo.linkedInUrl.replace(/^https?:\/\/(www\.)?/, '')}</div>}
          </div>
        </header>
      );
    }

    if (templateId === 'harvard') {
      return (
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            {resume.personalInfo.fullName?.toUpperCase() || 'FIRST LAST'}
          </h1>
          <div className="text-[0.85em] text-slate-700 flex flex-wrap justify-center gap-x-2 gap-y-1 font-medium">
            {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
            {resume.personalInfo.phone && <span>| P: {resume.personalInfo.phone}</span>}
            {resume.personalInfo.email && <span>| {resume.personalInfo.email}</span>}
            {resume.personalInfo.linkedInUrl && (
              <span>| {resume.personalInfo.linkedInUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>
            )}
          </div>
        </header>
      );
    }

    if (templateId === 'elegant-serif') {
      return (
        <header className="border-b-2 border-primary-600 pb-6 mb-8 flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase mb-1">
              {resume.personalInfo.fullName || 'YOUR NAME'}
            </h1>
            {resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) && (
              <p className="text-primary-600 font-bold italic text-sm tracking-wide mb-3">
                {resume.title}
              </p>
            )}
            <div className="text-[0.85em] text-slate-600 flex flex-wrap gap-x-4 gap-y-1 font-medium">
              {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
              {resume.personalInfo.phone && <span>• {resume.personalInfo.phone}</span>}
              {resume.personalInfo.location && <span>• {resume.personalInfo.location}</span>}
            </div>
            <div className="text-[9px] mt-1 flex flex-wrap gap-x-3 font-semibold text-primary-600">
              {resume.personalInfo.linkedInUrl && <span>LinkedIn: {resume.personalInfo.linkedInUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
            </div>
          </div>
          {resume.enabledSections.photo && resume.personalInfo.photoUrl && (
            <img src={resume.personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-xl object-cover border-2 border-slate-100 shadow-sm ml-6" />
          )}
        </header>
      );
    }

    return (
      <header className="mb-8 flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-1 tracking-tight">
            {resume.personalInfo.fullName || 'YOUR NAME'}
          </h1>
          {resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) && (
            <p className="text-primary-600 font-bold text-base mb-3">
              {resume.title}
            </p>
          )}
          <div className="text-[0.85em] text-slate-600 flex flex-wrap gap-x-4 gap-y-1 font-medium">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
            {resume.personalInfo.linkedInUrl && <span>{resume.personalInfo.linkedInUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          </div>
        </div>
        {resume.enabledSections.photo && resume.personalInfo.photoUrl && (
          <img src={resume.personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-xl object-cover border-2 border-slate-100 shadow-sm ml-6" />
        )}
      </header>
    );
  };

  const SectionTitle = ({ title }) => {
    if (templateId === 'harvard') {
       return <h2 className="text-[11px] font-bold uppercase text-slate-900 border-b border-slate-900 mb-2 mt-4">{title}</h2>;
    }
    return <h2 className="text-[1.1em] font-bold uppercase tracking-wider text-primary-700 border-b-2 border-primary-50 mb-4 pb-1">{title}</h2>;
  };

  const Content = () => {
    const experienceItem = (exp, i) => {
      if (templateId === 'harvard') {
        return (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-slate-900 uppercase ">{exp.company || 'COMPANY NAME'}</h3>
              <span className=" font-medium text-slate-900 italic ml-2">{exp.location || 'Location'}</span>
            </div>
            <div className="flex justify-between items-baseline mb-1">
              <div className=" font-medium italic text-slate-800">{exp.position || 'Position'}</div>
              <span className=" font-medium text-slate-900 italic ml-2">{exp.startDate} – {exp.endDate}</span>
            </div>
            <ul className="list-disc ml-4 text-slate-800 space-y-0.5">
              {exp.description?.split('\n').map((bullet, idx) => (
                <li key={idx}>{bullet.trim()}</li>
              ))}
            </ul>
          </div>
        );
      }
      return (
        <div key={i} className={templateId === 'harvard' ? 'mb-4' : 'mb-6'}>
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-slate-900">{exp.position || 'Position'}</h3>
            <span className=" font-bold text-slate-500 whitespace-nowrap ml-2">{exp.startDate} – {exp.endDate}</span>
          </div>
          <div className={`font-bold italic ${templateId === 'harvard' ? 'text-slate-800' : 'text-primary-600'} mb-2`}>{exp.company}</div>
          <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-line">
            {exp.description}
          </p>
        </div>
      );
    };

    const educationItem = (edu, i) => {
      if (templateId === 'harvard') {
        return (
          <div key={i} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-slate-900 uppercase ">{edu.institution || 'UNIVERSITY NAME'}</h3>
              <span className=" font-medium text-slate-900 italic ml-2">{edu.location || 'Location'}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <div className=" font-medium italic text-slate-800">
                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
              </div>
              <span className=" font-medium text-slate-900 italic ml-2">
                {edu.endDate?.toLowerCase().includes('expected') ? edu.endDate : `Graduated ${edu.endDate}`}
              </span>
            </div>
            {edu.description && (
               <ul className="list-disc ml-4 text-slate-800 mt-1 space-y-0.5">
                {edu.description.split('\n').map((bullet, idx) => (
                  <li key={idx}>{bullet.trim()}</li>
                ))}
              </ul>
            )}
          </div>
        );
      }
      return (
        <div key={i} className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-slate-900">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
            <div className="text-slate-500 font-medium italic">{edu.institution}</div>
          </div>
          <span className=" font-bold text-slate-500 whitespace-nowrap ml-2">{edu.startDate} – {edu.endDate}</span>
        </div>
      );
    };

    const renderJobSpecificFields = () => {
      const jobTemplate = RESUME_TEMPLATES[resume.jobRole];
      if (!jobTemplate || !resume.jobSpecificFields) return null;

      const fieldsToRender = jobTemplate.fields.filter(field => resume.jobSpecificFields[field.id]);
      if (fieldsToRender.length === 0) return null;

      return (
        <section style={getSectionStyle('jobSpecific')}>
          <SectionTitle title={t('resume.summary')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fieldsToRender.map(field => {
              const value = resume.jobSpecificFields[field.id];
              const isHarvard = templateId === 'harvard';
              return (
                <div key={field.id} className="space-y-1">
                  <div className={`text-[10px] font-bold ${isHarvard ? 'text-slate-900 uppercase' : 'text-slate-400 uppercase tracking-widest'}`}>{field.label}</div>
                  {field.type === 'tags' ? (
                    <div className="flex flex-wrap gap-2">
                      {value.split(',').map((tag, i) => (
                        <span key={i} className={isHarvard 
                          ? "text-slate-800 text-[11px] font-medium" 
                          : "px-2 py-0.5 bg-primary-50 text-primary-700 border border-primary-100 rounded text-[10px] font-bold"}>
                          {isHarvard ? (i === 0 ? tag.trim() : `, ${tag.trim()}`) : tag.trim()}
                        </span>
                      ))}
                    </div>
                  ) : field.type === 'url' ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className={`${isHarvard ? 'text-slate-800' : 'text-primary-600'} font-bold text-[11px] hover:underline flex items-center gap-1`}>
                      {!isHarvard && <Globe className="w-3 h-3" />}
                      {value.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  ) : (
                    <p className={`${isHarvard ? 'text-slate-800' : 'text-slate-700'} text-[11px] leading-relaxed whitespace-pre-line`}>{value}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      );
    };

    const renderJobSpecificFieldsSidebar = () => {
      const jobTemplate = RESUME_TEMPLATES[resume.jobRole];
      if (!jobTemplate || !resume.jobSpecificFields) return null;

      const fieldsToRender = jobTemplate.fields.filter(field => resume.jobSpecificFields[field.id]);
      if (fieldsToRender.length === 0) return null;

      return (
        <div className="space-y-6">
          {fieldsToRender.map(field => {
            const value = resume.jobSpecificFields[field.id];
            return (
              <div key={field.id}>
                <h4 className={`font-black uppercase text-slate-400 tracking-widest mb-3 ${templateId === 'modern-tech' ? 'text-[10px]' : 'text-[8px]'}`}>
                  {field.label}
                </h4>
                {field.type === 'tags' ? (
                  <div className="flex flex-wrap gap-2">
                    {value.split(',').map((tag, i) => (
                      <span key={i} className={`px-2 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded font-bold ${templateId === 'modern-tech' ? 'text-[9px]' : 'text-[8px]'}`}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                ) : field.type === 'url' ? (
                  <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-bold text-[10px] hover:underline flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {value.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                ) : (
                  <p className="text-slate-600 text-[10px] font-medium leading-relaxed">{value}</p>
                )}
              </div>
            );
          })}
        </div>
      );
    };

    const sections = (
      <div className="space-y-6">
        {resume.enabledSections.summary && resume.summary && (
          <section style={getSectionStyle('summary')}>
            <SectionTitle title={t('resume.summary')} />
            <p className="text-slate-700 leading-relaxed text-justify">
              {resume.summary}
            </p>
          </section>
        )}

        {}
        {templateId !== 'modern-tech' && templateId !== 'creative' && renderJobSpecificFields()}

        {resume.enabledSections.experience && resume.experience?.length > 0 && (
          <section style={getSectionStyle('experience')}>
            <SectionTitle title={t('resume.experience')} />
            <div className="space-y-2">
              {resume.experience.map(experienceItem)}
            </div>
          </section>
        )}

        {resume.enabledSections.education && resume.education?.length > 0 && (
          <section style={getSectionStyle('education')}>
            <SectionTitle title={t('resume.education')} />
            <div className="space-y-2">
              {resume.education.map(educationItem)}
            </div>
          </section>
        )}

        {resume.enabledSections.projects && resume.projects?.length > 0 && (
          <section style={getSectionStyle('projects')}>
            <SectionTitle title={t('resume.projects')} />
            <div className="space-y-4">
              {resume.projects.map((proj, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 ">{proj.name}</h3>
                    {proj.url && <span className="text-[9px] text-primary-600 font-medium">{proj.url.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                  </div>
                  <p className="text-slate-600 mt-1 whitespace-pre-line">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.enabledSections.skills && Array.isArray(resume.skills) && resume.skills.length > 0 && (
          <section style={getSectionStyle('skills')}>
            <SectionTitle title={t('resume.skills')} />
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {resume.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-slate-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.enabledSections.certifications && Array.isArray(resume.certifications) && resume.certifications.length > 0 && (
          <section style={getSectionStyle('certifications')}>
            <SectionTitle title={t('resume.certifications')} />
            <ul className="list-disc ml-4 text-slate-700 space-y-1">
              {resume.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {resume.enabledSections.languages && Array.isArray(resume.languages) && resume.languages.length > 0 && (
          <section style={getSectionStyle('languages')}>
            <SectionTitle title={t('resume.languages')} />
            <div className="flex flex-wrap gap-3">
              {resume.languages.map((lang, i) => (
                <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-md font-bold uppercase tracking-tight">{lang}</span>
              ))}
            </div>
          </section>
        )}

        {resume.enabledSections.achievements && Array.isArray(resume.achievements) && resume.achievements.length > 0 && (
          <section style={getSectionStyle('achievements')}>
            <SectionTitle title="Achievements" />
            <ul className="list-disc ml-4 text-slate-700 space-y-1">
              {resume.achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );

    if (templateId === 'modern-tech') {
       return (
         <div className="grid grid-cols-12 gap-8">
            <main className="col-span-8 space-y-8">
               {sections}
            </main>
            <aside className="col-span-4 space-y-8">
                {}
                {renderJobSpecificFieldsSidebar()}
                
                {resume.enabledSections.skills && resume.skills?.length > 0 && (
                   <section>
                      <h4 className=" font-bold uppercase text-slate-400 tracking-widest mb-4">Core Tech Skills</h4>
                      <div className="flex flex-col gap-2">
                        {resume.skills.map((skill, i) => (
                           <div key={i} className="flex justify-between items-center p-2 bg-slate-50 border border-slate-100 rounded font-bold text-slate-700">
                             {skill}
                             <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                           </div>
                        ))}
                      </div>
                   </section>
                )}
                {}
            </aside>
         </div>
       );
    }

    if (templateId === 'creative') {
       return (
         <div className="grid grid-cols-12 gap-10">
            <aside className="col-span-4 space-y-8">
                <div>
                   <h4 className=" font-black uppercase text-slate-400 tracking-widest mb-4">Contact</h4>
                   <div className="space-y-3">
                      <div className="text-slate-600 font-medium">
                        <div className="text-slate-400 uppercase font-bold text-[8px] mb-0.5">Location</div>
                        {resume.personalInfo.location || 'City, Country'}
                      </div>
                      <div className="text-slate-600 font-medium">
                        <div className="text-slate-400 uppercase font-bold text-[8px] mb-0.5">Email</div>
                        {resume.personalInfo.email}
                      </div>
                      <div className="text-slate-600 font-medium">
                        <div className="text-slate-400 uppercase font-bold text-[8px] mb-0.5">Phone</div>
                        {resume.personalInfo.phone}
                      </div>
                      {resume.personalInfo.linkedInUrl && (
                        <div className="text-slate-600 font-medium">
                          <div className="text-slate-400 uppercase font-bold text-[8px] mb-0.5">LinkedIn</div>
                          {resume.personalInfo.linkedInUrl.replace(/^https?:\/\/(www\.)?/, '')}
                        </div>
                      )}
                   </div>
                </div>

                {}
                {renderJobSpecificFieldsSidebar()}

                {resume.enabledSections.skills && resume.skills?.length > 0 && (
                   <div>
                     <h4 className=" font-black uppercase text-slate-400 tracking-widest mb-4">Skills</h4>
                     <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, i) => (
                           <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded font-bold text-[9px]">{skill}</span>
                        ))}
                     </div>
                   </div>
                )}
            </aside>
            <main className="col-span-8 space-y-8 border-l border-slate-100 pl-10">
               {sections}
            </main>
         </div>
       );
    }

    return sections;
  };

  const dimensions = getPaperDimensions(paperSize);
  const [scale, setScale] = React.useState(1);
  const [paperHeight, setPaperHeight] = React.useState(0);

  const paperWidthMm = parseFloat(dimensions.width);
  const paperWidthPx = paperWidthMm * 3.7795275591; 

  React.useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const padding = window.innerWidth < 640 ? 16 : 48;
        const containerWidth = containerRef.current.offsetWidth - padding;
        
        let newScale = Math.min(1, containerWidth / paperWidthPx);

        if (viewMode === 'preview' && window.innerWidth >= 1024) {
          newScale = 1;
        }

        setScale(newScale);

        if (paperRef.current) {
          setPaperHeight(paperRef.current.offsetHeight);
        }
      }
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    if (paperRef.current) observer.observe(paperRef.current);
    updateScale();

    return () => observer.disconnect();
  }, [dimensions.width, viewMode, mobileView, resume]);

  React.useEffect(() => {
    if (viewMode === 'preview' || mobileView === 'preview') {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  }, [viewMode, mobileView]);

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] lg:min-h-0 flex flex-col transition-all duration-500 ease-in-out ${viewMode === 'preview' || mobileView === 'preview' ? 'flex-1' : 'flex-1 lg:max-w-[50%]'} ${mobileView === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
      <div className="bg-slate-800 text-white px-6 py-3 text-sm font-medium tracking-wide flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <Layout className="w-4 h-4 text-slate-400" />
            {templateId.toUpperCase()} Layout — {paperSize}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-600"></div>
          <div className="w-3 h-3 rounded-full bg-slate-600"></div>
          <div className="w-3 h-3 rounded-full bg-slate-600"></div>
        </div>
      </div>
      <div ref={containerRef} className="flex-1 overflow-y-auto p-2 sm:p-6 bg-slate-300 flex justify-center items-start custom-scrollbar">
        <div
          style={{
            width: `${paperWidthPx * scale}px`,
            height: `${paperHeight * scale}px`,
            position: 'relative'
          }}
        >
          <div
            ref={paperRef}
            style={{ 
              ...globalFontStyle, 
              width: `${paperWidthPx}px`, 
              minHeight: dimensions.height,
              height: 'auto',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0
            }}
            className="bg-white shadow-2xl p-6 sm:p-12 relative"
          >
            <Header />
            <Content />
            
            {}
            <div 
              className="absolute left-0 right-0 pointer-events-none border-t-2 border-dashed border-red-300/50 z-20"
              style={{ top: dimensions.height }}
              title="End of Page 1"
            >
              <span className="absolute -top-5 right-0 bg-red-50 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-l-md border border-red-100 border-r-0">
                PAGE 1 END
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
