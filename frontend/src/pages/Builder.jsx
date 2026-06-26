import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { Save, ArrowLeft, Loader2, Wand2, Check, Layout, Briefcase, GraduationCap, Code, Heart, PieChart, PenTool, BarChart, Settings, Award, Globe, Plus, Trash2, Camera, User, Download, Edit2, Eye, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { RESUME_TEMPLATES } from '../data/resumeTemplates';
import { VISUAL_TEMPLATES } from '../data/visualTemplates';

import PersonalInfoEditor from '../components/builder/PersonalInfoEditor';
import ExperienceEditor from '../components/builder/ExperienceEditor';
import EducationEditor from '../components/builder/EducationEditor';
import SkillsEditor from '../components/builder/SkillsEditor';
import OtherSectionsEditor from '../components/builder/OtherSectionsEditor';
import BuilderSidebar from '../components/builder/BuilderSidebar';
import ResumePreview from '../components/builder/ResumePreview';

import Modal from '../components/ui/Modal';
import ConfirmDeleteModal from '../components/ui/ConfirmDeleteModal';
import { useToast } from '../context/ToastContext';
import { Type, Languages, Star, Scissors } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Builder = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [step, setStep] = useState('loading'); 
  const [activeTab, setActiveTab] = useState('content'); 
  const [showSidebar, setShowSidebar] = useState(true);
  const [viewMode, setViewMode] = useState('split'); 
  const [paperSize, setPaperSize] = useState('A4'); 
  const [mobileView, setMobileView] = useState('edit'); 

  const { showToast, hideToast } = useToast();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadFileName, setDownloadFileName] = useState('my-resume');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [grammarCheckResult, setGrammarCheckResult] = useState(null); 
  const [showGrammarModal, setShowGrammarModal] = useState(false);
  const [aiEnhanceResult, setAiEnhanceResult] = useState(null);
  const [showAiEnhanceModal, setShowAiEnhanceModal] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, onConfirm: null, title: '', message: '' });
  const containerRef = React.useRef(null);
  const [saveStatus, setSaveStatus] = useState('saved'); 
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const hasLoadedRef = React.useRef(false);
  const lastSavedResumeRef = React.useRef(null);
  const editScrollPosRef = React.useRef(0);
  const prevViewModeRef = React.useRef(viewMode);
  const prevMobileViewRef = React.useRef(mobileView);

  useEffect(() => {
    fetchResume();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const isMobile = window.innerWidth < 1024;
      if (isMobile && containerRef.current.scrollTop > 300) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const isEnteringPreview = (viewMode === 'preview' && prevViewModeRef.current !== 'preview') || 
                              (mobileView === 'preview' && prevMobileViewRef.current !== 'preview');
    
    const isReturningToEdit = (viewMode !== 'preview' && prevViewModeRef.current === 'preview') || 
                              (mobileView !== 'preview' && prevMobileViewRef.current === 'preview');

    if (isEnteringPreview) {
      
      if (containerRef.current) {
        editScrollPosRef.current = containerRef.current.scrollTop;
      }
      
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    } else if (isReturningToEdit) {
      
      if (containerRef.current) {
        
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = editScrollPosRef.current;
          }
        }, 50);
      }
    }

    prevViewModeRef.current = viewMode;
    prevMobileViewRef.current = mobileView;
  }, [viewMode, mobileView]);

  useEffect(() => {
    if (!resume || step === 'loading') return;

    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      lastSavedResumeRef.current = resume;
      return;
    }

    const resumeStr = JSON.stringify({ ...resume, updatedAt: null });
    const lastSavedStr = lastSavedResumeRef.current ? JSON.stringify({ ...lastSavedResumeRef.current, updatedAt: null }) : '';

    if (resumeStr === lastSavedStr) {
      return;
    }

    setSaveStatus('unsaved');

    const timer = setTimeout(() => {
      const autoSave = async () => {
        setSaveStatus('saving');
        try {
          const updatedResume = { ...resume, updatedAt: new Date().toISOString() };
          if (!user) {
            let guestResumes = JSON.parse(localStorage.getItem('guest_resumes') || '[]');
            guestResumes = guestResumes.map(r => r._id === id ? updatedResume : r);
            localStorage.setItem('guest_resumes', JSON.stringify(guestResumes));
          } else {
            const token = localStorage.getItem('token');
            await axios.put(`/resumes/${id}`, updatedResume);
          }
          lastSavedResumeRef.current = updatedResume;
          setLastSavedTime(new Date(updatedResume.updatedAt));
          setSaveStatus('saved');
        } catch (err) {
          console.error('Autosave error:', err);
          setSaveStatus('error');
        }
      };

      autoSave();
    }, 1500); 

    return () => clearTimeout(timer);
  }, [resume, user, id, step]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (saveStatus === 'unsaved' || saveStatus === 'saving') {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveStatus]);

  const fetchResume = async () => {
    if (!id) {
      console.warn('No resume ID provided to Builder');
      navigate('/dashboard');
      return;
    }
    
    try {
      let data;
      if (!user) {
        const guestResumes = JSON.parse(localStorage.getItem('guest_resumes') || '[]');
        data = guestResumes.find(r => r._id === id);
        if (!data) throw new Error('Guest resume not found');
      } else {
        const response = await axios.get(`/resumes/${id}`);
        data = response.data;
      }

      const initializedResume = {
        ...data,
        jobRole: data.jobRole || '',
        style: data.style || 'Modern',
        personalInfo: data.personalInfo || {},
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || [],
        projects: data.projects || [],
        certifications: data.certifications || [],
        languages: data.languages || [],
        achievements: data.achievements || [],
        jobSpecificFields: data.jobSpecificFields || {},
        fontFamily: data.fontFamily || 'Inter, sans-serif',
        fontSize: data.fontSize || '11px',
        fontWeight: data.fontWeight || '400',
        templateId: data.templateId || 'modern',
        styleColor: data.styleColor || '#4F46E5',
        sectionStyles: data.sectionStyles || {},
        enabledSections: data.enabledSections || {
          photo: false,
          summary: true,
          experience: true,
          education: true,
          skills: true,
          projects: false,
          certifications: false,
          languages: false,
          achievements: false
        }
      };

      setResume(initializedResume);
      setStep('select');
    } catch (error) {
      console.error('Error fetching resume:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (silent = false) => {
    if (!silent) {
      setSaving(true);
    }
    setSaveStatus('saving');
    try {
      const updatedResume = { ...resume, updatedAt: new Date().toISOString() };

      if (!user) {
        let guestResumes = JSON.parse(localStorage.getItem('guest_resumes') || '[]');
        guestResumes = guestResumes.map(r => r._id === id ? updatedResume : r);
        localStorage.setItem('guest_resumes', JSON.stringify(guestResumes));
      } else {
        await axios.put(`/resumes/${id}`, updatedResume);
      }

      lastSavedResumeRef.current = updatedResume;
      setLastSavedTime(new Date(updatedResume.updatedAt));
      setSaveStatus('saved');
      if (!silent) {
        showToast('Resume saved successfully!', 'success');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      setSaveStatus('error');
      if (!silent) {
        showToast('Failed to save resume.', 'error');
      }
    } finally {
      if (!silent) {
        setSaving(false);
      }
    }
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResume(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleJobSpecificChange = (id, value) => {
    setResume(prev => ({
      ...prev,
      jobSpecificFields: {
        ...prev.jobSpecificFields,
        [id]: value
      }
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file.', 'error');
        return;
      }

      showToast('Processing photo...', 'loading', 2000);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

          setResume(prev => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              photoUrl: compressedDataUrl,
              withPhoto: true
            },
            enabledSections: {
              ...prev.enabledSections,
              photo: true
            }
          }));
          showToast('Photo uploaded and optimized successfully!', 'success');
        };
        img.onerror = () => {
          showToast('Failed to load image file.', 'error');
        };
        img.src = event.target.result;
      };
      reader.onerror = () => {
        showToast('Failed to read image file.', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (hasOverflow) {
      showToast('Cannot download because your content overflows the selected paper size. Please adjust content or paper size.', 'error');
      return;
    }
    setShowDownloadModal(true);
  };

  const confirmDownload = async () => {
    try {
      setShowDownloadModal(false);
      setDownloading(true);
      setSaving(true);
      const loadingToastId = showToast('Preparing your PDF...', 'loading', 15000);

      let response;
      if (!user) {
        resume.updatedAt = new Date().toISOString();
        let guestResumes = JSON.parse(localStorage.getItem('guest_resumes') || '[]');
        guestResumes = guestResumes.map(r => r._id === id ? resume : r);
        localStorage.setItem('guest_resumes', JSON.stringify(guestResumes));

        response = await axios.post(`/resumes/download/guest`, resume, {
          responseType: 'blob'
        });
      } else {
        await axios.put(`/resumes/${id}`, resume);

        response = await axios.get(`/resumes/${id}/download`, {
          responseType: 'blob'
        });
      }

      let blob = response.data;
      if (!(blob instanceof Blob)) {
        blob = new Blob([response.data], { type: 'application/pdf' });
      }

      if (blob.type !== 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const error = JSON.parse(reader.result);
            setErrorMessage(error.message || 'Failed to generate PDF');
            setShowErrorModal(true);
          } catch (e) {
            setErrorMessage('Failed to generate PDF. Server returned an invalid response.');
            setShowErrorModal(true);
          }
        };
        reader.readAsText(blob);
        setSaving(false);
        setDownloading(false);
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = downloadFileName || "resume";
      link.setAttribute('download', `${fileName.replace('.pdf', '')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      if (typeof loadingToastId !== 'undefined') hideToast(loadingToastId);
      showToast('Download successfully!', 'success');
    } catch (error) {
      console.error('Download error:', error);
      setErrorMessage('Failed to download PDF. Please try again.');
      setShowErrorModal(true);
    } finally {
      setSaving(false);
      setDownloading(false);
    }
  };

  const getPreviewStyles = () => {
    const style = resume?.style || 'Formal';
    return {
      header: style === 'Modern' ? 'border-primary-600' : style === 'Minimalist' ? 'border-slate-200' : 'border-slate-800',
      name: style === 'Modern' ? 'text-3xl text-primary-700' : style === 'Minimalist' ? 'text-2xl text-slate-800' : 'text-3xl text-slate-900',
      accent: style === 'Modern' ? 'text-primary-600' : 'text-slate-500',
      sectionTitle: style === 'Modern' ? 'text-primary-700 border-primary-200' : style === 'Minimalist' ? 'text-slate-600 border-slate-100' : 'text-slate-800 border-slate-200',
      badge: style === 'Modern' ? 'bg-primary-50 text-primary-700 border-primary-100' : 'bg-slate-50 text-slate-700 border-slate-200'
    };
  };

  const selectRole = (roleKey) => {
    setResume(prev => ({
      ...(prev || {}),
      jobRole: roleKey
    }));
    setStep('template-select');
  };

  const selectTemplate = (templateId) => {
    const template = VISUAL_TEMPLATES.find(t => t.id === templateId);
    setResume(prev => ({
      ...(prev || {}),
      templateId: templateId,
      fontFamily: template?.defaultStyles?.fontFamily || prev?.fontFamily || 'Inter, sans-serif',
      fontSize: template?.defaultStyles?.fontSize || prev?.fontSize || '11px',
      styleColor: template?.defaultStyles?.color || '#4F46E5'
    }));
    setStep('edit');
  };

  const enhanceWithAI = async (type, index = null, field = null) => {
    let contentToEnhance = '';
    let enhanceType = type;

    if (type === 'summary') {
      contentToEnhance = resume.summary;
    } else if (type === 'description' && index !== null) {
      contentToEnhance = resume.experience[index].description;
    } else if (type === 'certificates') {
      contentToEnhance = Array.isArray(resume.certifications) ? resume.certifications.join('\n') : (resume.certifications || '');
    } else if (type === 'languages') {
      contentToEnhance = Array.isArray(resume.languages) ? resume.languages.join('\n') : (resume.languages || '');
    } else if (type === 'achievements') {
      contentToEnhance = Array.isArray(resume.achievements) ? resume.achievements.join('\n') : (resume.achievements || '');
    }

    if (!contentToEnhance && type !== 'skills' && type !== 'full-resume') {
      showToast(`Please provide some initial content for the AI to enhance.`, 'info');
      return;
    }

    setAiLoading(true);
    try {
      const payload = {
        type: (type === 'full-resume' || type === 'skills' || type === 'summary') ? type : 'enhance',
        content: contentToEnhance,
        data: {
          enhanceType: type,
          experience: (resume.experience || []).map(exp => `${exp.role} at ${exp.company}: ${exp.description}`).join('\n'),
          targetRole: resume.title || 'Professional',
          userData: resume,
          enabledSections: resume.enabledSections
        }
      };

      let data;
      if (!user) {
        const res = await axios.post('/resumes/generate/guest', payload);
        data = res.data;
      } else {
        const res = await axios.post('/resumes/generate', payload);
        data = res.data;
      }

      if (type === 'full-resume') {
        setAiResult(data.result);
        setShowAiModal(true);
      } else {
        setAiEnhanceResult({
          original: contentToEnhance,
          enhanced: data.result,
          type,
          index
        });
        setShowAiEnhanceModal(true);
      }
    } catch (error) {
      console.error('Error enhancing with AI:', error);
      showToast('Failed to enhance content with AI', 'error');
    } finally {
      setAiLoading(false);
    }
  };

  const applyAiEnhancement = () => {
    const { enhanced, type, index } = aiEnhanceResult;

    setResume(prev => {
      const newResume = { ...prev };
      if (type === 'summary') {
        newResume.summary = enhanced;
      } else if (type === 'skills') {
        newResume.skills = enhanced;
      } else if (type === 'description' && index !== null) {
        const newExperience = [...(newResume.experience || [])];
        newExperience[index] = { ...newExperience[index], description: enhanced };
        newResume.experience = newExperience;
      } else if (type === 'certificates') {
        newResume.certifications = enhanced.split('\n').map(s => s.trim()).filter(Boolean);
      } else if (type === 'languages') {
        newResume.languages = enhanced.split('\n').map(s => s.trim()).filter(Boolean);
      } else if (type === 'achievements') {
        newResume.achievements = enhanced.split('\n').map(s => s.trim()).filter(Boolean);
      }
      return newResume;
    });

    setShowAiEnhanceModal(false);
    showToast('Enhancement applied!', 'success');
  };

  const handleGrammarCheck = async (content, fieldPath, index = null) => {
    if (!content) {
      showToast('No content to check.', 'info');
      return;
    }

    setAiLoading(true);
    try {
      const payload = {
        type: 'grammar-check',
        content: content
      };

      let data;
      if (!user) {
        const res = await axios.post('/resumes/generate/guest', payload);
        data = res.data;
      } else {
        const res = await axios.post('/resumes/generate', payload);
        data = res.data;
      }

      if (data.result.trim() === content.trim()) {
        showToast('Grammar looks perfect!', 'success');
      } else {
        setGrammarCheckResult({
          original: content,
          corrected: data.result,
          fieldPath,
          index
        });
        setShowGrammarModal(true);
      }
    } catch (error) {
      console.error('Grammar check error:', error);
      showToast('Grammar check failed.', 'error');
    } finally {
      setAiLoading(false);
    }
  };

  const applyGrammarCorrection = () => {
    const { corrected, fieldPath, index } = grammarCheckResult;

    setResume(prev => {
      const newResume = { ...prev };
      if (index !== null) {
        if (fieldPath === 'jobSpecificFields') {
          newResume.jobSpecificFields = {
            ...newResume.jobSpecificFields,
            [index]: corrected
          };
        } else {
          const array = [...(newResume[fieldPath] || [])];
          if (typeof array[index] === 'object' && array[index] !== null) {
            if (fieldPath === 'experience' || fieldPath === 'projects') {
              array[index] = { ...array[index], description: corrected };
            }
          } else {
            array[index] = corrected;
          }
          newResume[fieldPath] = array;
        }
      } else {
        newResume[fieldPath] = corrected;
      }
      return newResume;
    });

    setShowGrammarModal(false);
    showToast('Correction applied!', 'success');
  };

  const triggerDeleteConfirm = (onConfirm, title, message) => {
    setDeleteConfirm({ isOpen: true, onConfirm, title, message });
  };

  if (loading || step === 'loading') return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin h-10 w-10 text-primary-600" />
    </div>
  );

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-surface-on sm:text-4xl">
              What job are you applying for?
            </h2>
            <p className="mt-4 text-lg text-secondary">
              Select your career path to get a tailored resume structure.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resume?.jobRole && RESUME_TEMPLATES[resume.jobRole] && (
              <button
                onClick={() => setStep('edit')}
                className="col-span-1 sm:col-span-2 lg:col-span-3 bg-primary-600 text-white p-4 rounded-2xl shadow-sm border border-primary-500 hover:bg-primary-700 transition-all text-center font-bold"
              >
                CONTINUE WITH CURRENT ROLE: {RESUME_TEMPLATES[resume.jobRole].name.toUpperCase()}
              </button>
            )}
            {Object.entries(RESUME_TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                onClick={() => selectRole(key)}
                className="relative group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-primary-500 hover:ring-1 hover:ring-primary-500 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary-50 transition-colors text-slate-600 group-hover:text-primary-600">
                    {key === 'tech' && <Code className="w-6 h-6" />}
                    {key === 'teacher' && <GraduationCap className="w-6 h-6" />}
                    {key === 'healthcare' && <Heart className="w-6 h-6" />}
                    {key === 'business' && <PieChart className="w-6 h-6" />}
                    {key === 'creative' && <PenTool className="w-6 h-6" />}
                    {key === 'general' && <Layout className="w-6 h-6" />}
                    {key !== 'tech' && key !== 'teacher' && key !== 'healthcare' && key !== 'business' && key !== 'creative' && key !== 'general' && <Briefcase className="w-6 h-6" />}
                  </div>
                  <ArrowLeft className="w-4 h-4 text-slate-300 group-hover:text-primary-400 rotate-180 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                  {template.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Custom fields for {template.name.split(' (')[0]}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'template-select') {
    return (
      <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-surface-on sm:text-4xl">
              Choose your design template
            </h2>
            <p className="mt-4 text-lg text-secondary">
              Select a professional design to start building your resume.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VISUAL_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => selectTemplate(template.id)}
                className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-primary-500 hover:ring-1 hover:ring-primary-500 transition-all text-left"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors flex items-center justify-center">
                    <div className="bg-white text-primary-600 font-bold px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                      Choose Template
                    </div>
                  </div>
                </div>
                <div className="p-5 border-t border-slate-50 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{template.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setStep('select')}
              className="text-slate-500 hover:text-slate-800 text-sm font-medium flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Role Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const styles = getPreviewStyles();

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-0 font-sans">
      {}
      {}
      <div className="bg-white border-b border-outline-variant px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center sticky top-16 z-40 shadow-sm gap-3">
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={async () => {
              if (saveStatus === 'unsaved' || saveStatus === 'error') {
                await handleSave(true);
              }
              navigate('/dashboard');
            }}
            className="inline-flex items-center text-secondary hover:text-primary-600 transition-colors text-xs sm:text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Dashboard</span>
            <span className="xs:hidden">Back</span>
          </button>

          {}
          <div className="hidden md:flex items-center gap-2  rounded-xl px-3 py-1.5  transition-all">
            {saveStatus === 'saving' && (
              <>
                {}
                    {saveStatus === 'saving' ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        {t('builder.saving')}
                      </span>
                    ) : saveStatus === 'saved' ? (
                      <span className="flex items-center gap-1.5 text-green-600">
                        <Check className="w-3.5 h-3.5" />
                        {t('builder.saved')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-slate-400">
                        {t('builder.save')}
                      </span>
                    )}
              </>
            )}
            {saveStatus === 'saved' && (
              <>

                <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="text-[11px] font-semibold text-slate-500 tracking-tight">
                  Saved {lastSavedTime ? `at ${lastSavedTime.toLocaleTimeString()}` : ''}
                </span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                {}
                <span className="text-[11px] font-bold text-slate-800 tracking-tight">Unsaved changes</span>
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[11px] font-bold text-red-500 tracking-tight">Save failed. Click Save Draft to retry.</span>
              </>
            )}
          </div>

          <div className="hidden lg:flex bg-slate-100 p-1 rounded-lg sm:rounded-xl">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold transition-all ${viewMode === 'split'
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold transition-all ${viewMode === 'preview'
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              Full
            </button>
          </div>

          {}
          <div className="flex lg:hidden bg-slate-200/50 p-1 rounded-xl shadow-inner border border-slate-200">
            <button
              onClick={() => setMobileView('edit')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-black tracking-tight transition-all ${mobileView === 'edit'
                ? 'bg-white text-primary-700 shadow-md ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              <Edit2 className="w-3.5 h-3.5" />
              {t('builder.edit').toUpperCase()}
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-black tracking-tight transition-all ${mobileView === 'preview'
                ? 'bg-white text-primary-700 shadow-md ring-1 ring-slate-200'
                : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {t('builder.preview').toUpperCase()}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end sm:justify-start">
          {}
          <span className="md:hidden inline text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
            {saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : saveStatus === 'unsaved' ? 'Unsaved' : 'Save Error'}
          </span>
          {hasOverflow && (
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-200">
              Content Overflows Paper!
            </span>
          )}
          <button
            onClick={handleDownload}
            disabled={hasOverflow || downloading}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-bold rounded-lg transition-all shadow-sm ${hasOverflow || downloading ? 'bg-surface-dim text-secondary cursor-not-allowed' : 'text-white bg-surface-inverse hover:bg-slate-800'}`}
          >
            {downloading ? <Loader2 className="w-4 h-4 mr-1 sm:mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-1 sm:mr-2" />}
            {downloading ? 'Downloading...' : 'Download PDF'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saveStatus === 'saving'}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 border border-outline-variant text-xs sm:text-sm font-bold rounded-lg text-surface-on bg-white hover:bg-surface-dim disabled:opacity-50 transition-all shadow-sm hover:border-primary-300"
          >
            {saveStatus === 'saving' ? <Loader2 className="w-4 h-4 mr-1 sm:mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-1 sm:mr-2" />}
            Save Draft
          </button>
        </div>
      </div>

      {}
      <div
        ref={containerRef}
        className={`flex-1 max-w-[1600px] w-full mx-auto p-2 sm:p-6 lg:p-8 flex flex-col lg:flex-row ${showSidebar && viewMode === 'split' ? 'gap-6 lg:gap-8' : 'gap-0'} lg:h-[calc(100vh-140px)] overflow-y-auto lg:overflow-hidden relative`}
      >

        <BuilderSidebar
          showSidebar={showSidebar}
          viewMode={viewMode}
          mobileView={mobileView}
          mobileSidebarOpen={mobileSidebarOpen}
          resume={resume}
          setResume={setResume}
          paperSize={paperSize}
          setPaperSize={setPaperSize}
        />

        {}
        <div className={`${viewMode === 'preview' ? 'hidden' : (mobileView === 'edit' ? 'flex' : 'hidden lg:flex')} bg-white rounded-2xl shadow-ambient border border-outline-variant overflow-hidden flex flex-col h-full transition-all duration-300 flex-1`}>
          <div className="p-6 border-b border-slate-100 bg-white flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              {resume.jobRole && RESUME_TEMPLATES[resume.jobRole] && (
                <div className="px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] font-bold rounded uppercase tracking-wider">
                  {RESUME_TEMPLATES[resume.jobRole].name}
                </div>
              )}
              <button
                onClick={() => setStep('select')}
                className="inline-flex items-center px-3 py-1 bg-white border border-primary-200 text-primary-700 text-[10px] font-bold rounded-full hover:bg-primary-50 transition-all shadow-sm group"
              >
                <Settings className="w-3 h-3 mr-1.5 text-primary-400 group-hover:rotate-90 transition-transform" />
                CHANGE ROLE
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-8">
            <PersonalInfoEditor
              resume={resume}
              setResume={setResume}
              handlePersonalInfoChange={handlePersonalInfoChange}
              handlePhotoUpload={handlePhotoUpload}
              handleJobSpecificChange={handleJobSpecificChange}
              RESUME_TEMPLATES={RESUME_TEMPLATES}
              handleGrammarCheck={handleGrammarCheck}
            />

            {resume.enabledSections.summary && (
              <SkillsEditor
                resume={resume}
                setResume={setResume}
                enhanceWithAI={enhanceWithAI}
                handleGrammarCheck={handleGrammarCheck}
                aiLoading={aiLoading}
                type="summary"
              />
            )}

            {resume.enabledSections.experience && (
              <ExperienceEditor
                resume={resume}
                setResume={setResume}
                enhanceWithAI={enhanceWithAI}
                handleGrammarCheck={handleGrammarCheck}
                aiLoading={aiLoading}
                confirmDelete={triggerDeleteConfirm}
              />
            )}

            {resume.enabledSections.education && (
              <EducationEditor
                resume={resume}
                setResume={setResume}
                handleGrammarCheck={handleGrammarCheck}
                confirmDelete={triggerDeleteConfirm}
              />
            )}

            {resume.enabledSections.skills && (
              <SkillsEditor
                resume={resume}
                setResume={setResume}
                enhanceWithAI={enhanceWithAI}
                aiLoading={aiLoading}
                confirmDelete={triggerDeleteConfirm}
              />
            )}

            <OtherSectionsEditor
              resume={resume}
              setResume={setResume}
              enhanceWithAI={enhanceWithAI}
              handleGrammarCheck={handleGrammarCheck}
              aiLoading={aiLoading}
              confirmDelete={triggerDeleteConfirm}
            />
          </div>
        </div>

        {}
        <ResumePreview
          resume={resume}
          paperSize={paperSize}
          viewMode={viewMode}
          mobileView={mobileView}
          styles={styles}
          onOverflowChange={setHasOverflow}
        />

      </div>
      {}
      {showFloatingButton && !mobileSidebarOpen && (
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary-600 text-white rounded-full shadow-2xl animate-in zoom-in duration-300 flex items-center justify-center border-4 border-white"
        >
          <Settings className="w-6 h-6" />
        </button>
      )}

      {}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900">Design & Settings</h3>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <BuilderSidebar
                showSidebar={true}
                viewMode="split" 
                mobileView="edit"
                mobileSidebarOpen={true}
                resume={resume}
                setResume={setResume}
                paperSize={paperSize}
                setPaperSize={setPaperSize}
              />
            </div>
          </div>
        </div>
      )}

      {}
      <Modal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        title="Download Resume"
        type="question"
        footer={
          <>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDownload}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm transition-all"
            >
              Download PDF
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            Enter a filename for your resume. We'll automatically add the .pdf extension.
          </p>
          <div>
            <label htmlFor="filename" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              File Name
            </label>
            <input
              id="filename"
              type="text"
              value={downloadFileName}
              onChange={(e) => setDownloadFileName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. John_Doe_Resume"
              autoFocus
            />
          </div>
        </div>
      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Oops! Something went wrong"
        type="error"
        footer={
          <button
            onClick={() => setShowErrorModal(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close
          </button>
        }
      >
        <p className="text-sm text-slate-600">
          {errorMessage}
        </p>
      </Modal>

      {/* Grammar Check Modal */}
      <Modal
        isOpen={showGrammarModal}
        onClose={() => setShowGrammarModal(false)}
        title="Grammar Check Result"
        type="info"
        maxWidth="sm:max-w-2xl"
        footer={
          <>
            <button
              onClick={() => setShowGrammarModal(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Discard Changes
            </button>
            <button
              onClick={applyGrammarCorrection}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Apply Correction
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Original</h4>
            <div className="p-4 bg-slate-100 rounded-xl text-sm text-slate-600 line-through decoration-red-400/50">
              {grammarCheckResult?.original}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Suggested Correction
            </h4>
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-slate-800 font-medium">
              {grammarCheckResult?.corrected}
            </div>
          </div>
        </div>
      </Modal>

      {/* AI Professional Rewrite Modal (Original AI Modal) */}
      {showAiModal && (
        <Modal
          isOpen={showAiModal}
          onClose={() => setShowAiModal(false)}
          title="AI Help"
          type="info"
          maxWidth="sm:max-w-3xl"
          footer={
            <>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setShowAiModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-lg shadow-sm transition-colors"
                onClick={() => setShowAiModal(false)}
              >
                Got it
              </button>
            </>
          }
        >
          <div className="bg-slate-50 rounded-xl p-6 max-h-[60vh] overflow-y-auto custom-scrollbar border border-slate-100 italic text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
            {aiResult}
          </div>
        </Modal>
      )}

      {/* AI Enhancement Confirmation Modal */}
      <Modal
        isOpen={showAiEnhanceModal}
        onClose={() => setShowAiEnhanceModal(false)}
        title="AI Enhancement Result"
        type="info"
        maxWidth="sm:max-w-2xl"
        footer={
          <>
            <button
              onClick={() => setShowAiEnhanceModal(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Discard Changes
            </button>
            <button
              onClick={applyAiEnhancement}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Apply Enhancement
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Original</h4>
            <div className="p-4 bg-slate-100 rounded-xl text-sm text-slate-600 line-through decoration-red-400/50">
              {aiEnhanceResult?.original}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Enhanced Content
            </h4>
            <div className="p-4 bg-primary-50 border border-primary-100 rounded-xl text-sm text-slate-800 font-medium whitespace-pre-wrap">
              {aiEnhanceResult?.enhanced}
            </div>
          </div>
        </div>
      </Modal>

      {/* Global Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm(prev => ({ ...prev, isOpen: false }))}
        onConfirm={deleteConfirm.onConfirm}
        title={deleteConfirm.title}
        message={deleteConfirm.message}
      />
    </div>
  );
};

// Add print styles
const style = document.createElement('style');
style.textContent = `
  @media print {
    /* Hide browser headers/footers */
    @page {
      margin: 0;
    }

    /* Hide specific non-resume components */
    nav, aside, button, .sticky, .fixed, .z-40, .z-50, 
    .bg-white.border-b, .p-6.border-b, .p-6.overflow-y-auto,
    .text-sm.text-slate-400, .bg-slate-800.text-white.px-6.py-3,
    .h-6.w-px, .hidden.lg\\:flex.bg-slate-100 {
      display: none !important;
    }

    /* Font Rendering Fixes */
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }

    body, html, #root, .min-h-screen, .flex-1, .max-w-\\[1600px\\] {
      background: white !important;
      margin: 0 !important;
      padding: 0 !important;
      height: auto !important;
      min-height: 0 !important;
      overflow: visible !important;
      display: block !important;
      max-width: none !important;
      width: 100% !important;
    }

    .flex-1.max-w-\\[1600px\\].w-full.mx-auto.p-4.sm\\:p-6.lg\\:p-8 {
        display: block !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    .flex-1.bg-white.rounded-2xl.shadow-sm.border.border-slate-200.overflow-hidden.flex.flex-col {
        display: none !important;
    }

    .bg-white.rounded-2xl.shadow-sm.border.border-slate-200.overflow-hidden.min-h-0.flex.flex-col {
        display: block !important;
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
        width: 100% !important;
        height: auto !important;
    }

    .flex-1.overflow-y-auto.p-4.sm\\:p-8.bg-slate-200\\/50.flex.justify-center {
        display: block !important;
        background: transparent !important;
        padding: 0 !important;
        overflow: visible !important;
    }

    .bg-white.w-full.shadow-2xl {
      box-shadow: none !important;
      margin: 0 auto !important;
      padding: 0 !important;
      transform: none !important;
      width: 100% !important;
      min-height: auto !important;
      box-sizing: border-box !important;
    }

    [style*="max-width: 210mm"], [style*="max-width: 215.9mm"] {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0.5in !important;
        min-height: 0 !important;
        box-shadow: none !important;
        border: none !important;
        aspect-ratio: auto !important;
    }
  }
`;
document.head.appendChild(style);

export default Builder;
