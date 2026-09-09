import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { Save, ArrowLeft, Loader2, Wand2, Check, Layout, Briefcase, GraduationCap, Code, Heart, PieChart, PenTool, BarChart, Settings, Award, Globe, Plus, Trash2, Camera, User, Download, Edit2, Eye, X, AlertCircle } from 'lucide-react';
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
        fontFamily: data.fontFamily || '"Public Sans", sans-serif',
        fontSize: data.fontSize || '11px',
        fontWeight: data.fontWeight || '400',
        templateId: data.templateId || 'modern',
        styleColor: data.styleColor || '#2E4A9E',
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
      header: style === 'Modern' ? 'border-blue-500' : style === 'Minimalist' ? 'border-rule' : 'border-ink',
      name: style === 'Modern' ? 'text-3xl text-blue-700' : style === 'Minimalist' ? 'text-2xl text-ink' : 'text-3xl text-ink',
      accent: style === 'Modern' ? 'text-blue-500' : 'text-ink-soft',
      sectionTitle: style === 'Modern' ? 'text-blue-700 border-blue-200' : style === 'Minimalist' ? 'text-ink-soft border-rule' : 'text-ink border-rule',
      badge: style === 'Modern' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-paper-dim text-ink border-rule'
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
      fontFamily: template?.defaultStyles?.fontFamily || prev?.fontFamily || '"Public Sans", sans-serif',
      fontSize: template?.defaultStyles?.fontSize || prev?.fontSize || '11px',
      styleColor: template?.defaultStyles?.color || '#2E4A9E'
    }));
    setStep('edit');
  };

  const enhanceWithAI = async (type, index = null, field = null) => {
    let contentToEnhance = '';

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
        if (['certifications', 'languages', 'achievements'].includes(fieldPath)) {
          newResume[fieldPath] = typeof corrected === 'string'
            ? corrected.split('\n').map(s => s.trim()).filter(Boolean)
            : corrected;
        } else if (fieldPath === 'skills') {
          newResume[fieldPath] = typeof corrected === 'string'
            ? corrected.split(/[\n,]/).map(s => s.trim()).filter(Boolean)
            : corrected;
        } else {
          newResume[fieldPath] = corrected;
        }
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
    <div className="flex h-screen items-center justify-center bg-paper">
      <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
    </div>
  );

  /* Step 1: Role Selection Screen */
  if (step === 'select') {
    return (
      <div className="min-h-screen bg-paper py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink sm:text-4xl">
              What job are you applying for?
            </h2>
            <p className="mt-4 text-base text-ink-soft">
              Select your career path to get a tailored resume structure.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resume?.jobRole && RESUME_TEMPLATES[resume.jobRole] && (
              <button
                onClick={() => setStep('edit')}
                className="col-span-1 sm:col-span-2 lg:col-span-3 bg-blue-500 hover:bg-blue-600 text-white p-4 font-bold text-center tracking-wide transition-all shadow-sm"
                style={{ borderRadius: '2px' }}
              >
                CONTINUE WITH CURRENT ROLE: {RESUME_TEMPLATES[resume.jobRole].name.toUpperCase()}
              </button>
            )}
            {Object.entries(RESUME_TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                onClick={() => selectRole(key)}
                className="relative group bg-white p-6 border border-rule hover:border-rule-strong hover:shadow-card-hover transition-all text-left"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-paper-dim text-blue-500 group-hover:bg-blue-50 transition-colors" style={{ borderRadius: '2px' }}>
                    {key === 'tech' && <Code className="w-6 h-6" />}
                    {key === 'teacher' && <GraduationCap className="w-6 h-6" />}
                    {key === 'healthcare' && <Heart className="w-6 h-6" />}
                    {key === 'business' && <PieChart className="w-6 h-6" />}
                    {key === 'creative' && <PenTool className="w-6 h-6" />}
                    {key === 'general' && <Layout className="w-6 h-6" />}
                    {key !== 'tech' && key !== 'teacher' && key !== 'healthcare' && key !== 'business' && key !== 'creative' && key !== 'general' && <Briefcase className="w-6 h-6" />}
                  </div>
                  <ArrowLeft className="w-4 h-4 text-ink-soft group-hover:text-blue-500 rotate-180 transition-colors" />
                </div>
                <h3 className="text-base font-serif font-bold text-ink group-hover:text-blue-500 transition-colors">
                  {template.name}
                </h3>
                <p className="mt-1 text-xs text-ink-soft">
                  Custom fields for {template.name.split(' (')[0]}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* Step 2: Template Selection Screen */
  if (step === 'template-select') {
    return (
      <div className="min-h-screen bg-paper py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-ink sm:text-4xl">
              Choose your design template
            </h2>
            <p className="mt-4 text-base text-ink-soft">
              Select a professional design to start building your resume.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VISUAL_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => selectTemplate(template.id)}
                className="group flex flex-col bg-white border border-rule overflow-hidden hover:border-rule-strong hover:shadow-card-hover transition-all text-left"
                style={{ borderRadius: '2px' }}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors flex items-center justify-center">
                    <div className="bg-white text-ink font-serif font-bold px-4 py-2 border border-rule shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all text-xs" style={{ borderRadius: '2px' }}>
                      Choose Template
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-rule flex-1">
                  <h3 className="text-sm font-serif font-bold text-ink mb-1">{template.name}</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setStep('select')}
              className="text-ink-soft hover:text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-2 mx-auto transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Role Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const styles = getPreviewStyles();

  /* Step 3: Main Builder Workspace */
  return (
    <div className="min-h-screen bg-paper flex flex-col pt-0 font-sans">
      {/* Top Editorial Sticky Bar */}
      <div className="bg-paper/90 backdrop-blur border-b border-rule px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center sticky top-16 z-40 shadow-sm gap-3">
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={async () => {
              if (saveStatus === 'unsaved' || saveStatus === 'error') {
                await handleSave(true);
              }
              navigate('/dashboard');
            }}
            className="inline-flex items-center text-ink-soft hover:text-ink transition-colors text-xs sm:text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Dashboard</span>
            <span className="xs:hidden">Back</span>
          </button>

          {/* Auto-save Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 transition-all">
            {saveStatus === 'saving' && (
              <span className="flex items-center gap-1.5 text-ink-soft text-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                {t('builder.saving')}
              </span>
            )}
            {saveStatus === 'saved' && (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-medium text-ink-soft tracking-tight">
                  Saved {lastSavedTime ? `at ${lastSavedTime.toLocaleTimeString()}` : ''}
                </span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <span className="text-[11px] font-bold text-pen tracking-tight">Unsaved changes</span>
            )}
            {saveStatus === 'error' && (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-pen" />
                <span className="text-[11px] font-bold text-pen tracking-tight">Save failed. Click Save Draft to retry.</span>
              </>
            )}
          </div>

          {/* View Mode Switcher (Desktop) */}
          <div className="hidden lg:flex bg-paper-dim border border-rule p-0.5" style={{ borderRadius: '2px' }}>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 text-xs font-bold transition-all ${viewMode === 'split'
                ? 'bg-white text-ink border border-rule shadow-sm'
                : 'text-ink-soft hover:text-ink'
                }`}
              style={{ borderRadius: '2px' }}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-xs font-bold transition-all ${viewMode === 'preview'
                ? 'bg-white text-ink border border-rule shadow-sm'
                : 'text-ink-soft hover:text-ink'
                }`}
              style={{ borderRadius: '2px' }}
            >
              Full Preview
            </button>
          </div>

          {/* Mobile View Switcher */}
          <div className="flex lg:hidden bg-paper-dim border border-rule p-0.5" style={{ borderRadius: '2px' }}>
            <button
              onClick={() => setMobileView('edit')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold transition-all ${mobileView === 'edit'
                ? 'bg-white text-ink border border-rule shadow-sm'
                : 'text-ink-soft hover:text-ink'
                }`}
              style={{ borderRadius: '2px' }}
            >
              <Edit2 className="w-3 h-3" />
              EDIT
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold transition-all ${mobileView === 'preview'
                ? 'bg-white text-ink border border-rule shadow-sm'
                : 'text-ink-soft hover:text-ink'
                }`}
              style={{ borderRadius: '2px' }}
            >
              <Eye className="w-3 h-3" />
              PREVIEW
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end sm:justify-start">
          <span className="md:hidden inline text-[10px] font-bold text-ink-soft bg-paper-dim px-2 py-1 border border-rule">
            {saveStatus === 'saved' ? 'Saved' : saveStatus === 'saving' ? 'Saving...' : saveStatus === 'unsaved' ? 'Unsaved' : 'Save Error'}
          </span>
          {hasOverflow && (
            <span className="text-xs font-bold text-pen bg-red-50 px-2 py-1 border border-red-200">
              Content Overflows Paper!
            </span>
          )}
          <button
            onClick={handleDownload}
            disabled={hasOverflow || downloading}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 border text-xs sm:text-sm font-bold transition-all shadow-sm ${hasOverflow || downloading ? 'bg-paper-dim border-rule text-ink-soft cursor-not-allowed' : 'bg-ink text-paper hover:bg-ink-light border-ink'}`}
            style={{ borderRadius: '2px' }}
          >
            {downloading ? <Loader2 className="w-4 h-4 mr-1 sm:mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-1 sm:mr-2" />}
            {downloading ? 'Downloading...' : 'Download PDF'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saveStatus === 'saving'}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2 border border-rule text-xs sm:text-sm font-bold text-ink bg-white hover:bg-paper-dim disabled:opacity-50 transition-all shadow-sm"
            style={{ borderRadius: '2px' }}
          >
            {saveStatus === 'saving' ? <Loader2 className="w-4 h-4 mr-1 sm:mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-1 sm:mr-2" />}
            Save Draft
          </button>
        </div>
      </div>

      {/* Main Content Workspace */}
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

        {/* Editor Form Container */}
        <div className={`${viewMode === 'preview' ? 'hidden' : (mobileView === 'edit' ? 'flex' : 'hidden lg:flex')} bg-white border border-rule shadow-card overflow-hidden flex flex-col h-full transition-all duration-300 flex-1`} style={{ borderRadius: '2px' }}>
          <div className="p-4 sm:p-6 border-b border-rule bg-paper-dim flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-serif font-bold text-ink uppercase tracking-wider">Editor Panel</span>
                {resume.jobRole && RESUME_TEMPLATES[resume.jobRole] && (
                  <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider" style={{ borderRadius: '2px' }}>
                    {RESUME_TEMPLATES[resume.jobRole].name}
                  </span>
                )}
              </div>
              <button
                onClick={() => setStep('select')}
                className="inline-flex items-center px-3 py-1 bg-white border border-rule text-ink hover:text-blue-500 text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm group"
                style={{ borderRadius: '2px' }}
              >
                <Settings className="w-3 h-3 mr-1.5 text-ink-soft group-hover:rotate-90 transition-transform" />
                CHANGE ROLE
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar space-y-8">
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

        {/* Live Resume Document Preview Container */}
        <ResumePreview
          resume={resume}
          paperSize={paperSize}
          viewMode={viewMode}
          mobileView={mobileView}
          styles={styles}
          onOverflowChange={setHasOverflow}
        />

      </div>

      {/* Floating Settings Button (Mobile) */}
      {showFloatingButton && !mobileSidebarOpen && (
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-ink text-paper border-2 border-rule shadow-xl flex items-center justify-center"
          style={{ borderRadius: '2px' }}
        >
          <Settings className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Settings Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-paper border border-rule shadow-2xl overflow-hidden max-h-[85vh] flex flex-col" style={{ borderRadius: '2px' }}>
            <div className="p-4 border-b border-rule flex justify-between items-center bg-paper-dim">
              <h3 className="font-serif font-bold text-ink">Design & Settings</h3>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 hover:bg-paper-dim text-ink-soft hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
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

      {/* Download Modal */}
      <Modal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        title="Download Resume"
        type="question"
        footer={
          <>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="px-4 py-2 text-sm font-bold text-ink-soft hover:text-ink border border-rule bg-white transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Cancel
            </button>
            <button
              onClick={confirmDownload}
              className="px-4 py-2 text-sm font-bold text-white bg-ink hover:bg-ink-light shadow-sm transition-all"
              style={{ borderRadius: '2px' }}
            >
              Download PDF
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-ink-soft">
            Enter a filename for your resume. We'll automatically add the .pdf extension.
          </p>
          <div>
            <label htmlFor="filename" className="block text-xs font-bold text-ink-soft uppercase tracking-wider mb-2">
              File Name
            </label>
            <input
              id="filename"
              type="text"
              value={downloadFileName}
              onChange={(e) => setDownloadFileName(e.target.value)}
              className="w-full px-4 py-3 border border-rule bg-white text-ink focus:border-blue-500 outline-none transition-all text-sm"
              style={{ borderRadius: '2px' }}
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
            className="px-4 py-2 text-sm font-bold text-paper bg-ink hover:bg-ink-light transition-colors"
            style={{ borderRadius: '2px' }}
          >
            Close
          </button>
        }
      >
        <p className="text-sm text-ink-soft">
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
              className="px-4 py-2 text-sm font-bold text-ink-soft hover:text-ink border border-rule bg-white transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Discard Changes
            </button>
            <button
              onClick={applyGrammarCorrection}
              className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-all flex items-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              <Check className="w-4 h-4" />
              Apply Correction
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-2">Original</h4>
            <div className="p-4 bg-paper-dim border border-rule text-sm text-ink-soft line-through decoration-pen/50" style={{ borderRadius: '2px' }}>
              {grammarCheckResult?.original}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Suggested Correction
            </h4>
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-sm text-ink font-medium" style={{ borderRadius: '2px' }}>
              {grammarCheckResult?.corrected}
            </div>
          </div>
        </div>
      </Modal>

      {/* AI Rewrite Modal */}
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
                className="px-4 py-2 text-sm font-bold text-ink-soft hover:text-ink border border-rule bg-white transition-colors"
                style={{ borderRadius: '2px' }}
                onClick={() => setShowAiModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-sm transition-colors"
                style={{ borderRadius: '2px' }}
                onClick={() => setShowAiModal(false)}
              >
                Got it
              </button>
            </>
          }
        >
          <div className="bg-paper-dim border border-rule p-6 max-h-[60vh] overflow-y-auto custom-scrollbar italic text-ink whitespace-pre-wrap leading-relaxed text-sm" style={{ borderRadius: '2px' }}>
            {aiResult}
          </div>
        </Modal>
      )}

      {/* AI Enhancement Modal */}
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
              className="px-4 py-2 text-sm font-bold text-ink-soft hover:text-ink border border-rule bg-white transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Discard Changes
            </button>
            <button
              onClick={applyAiEnhancement}
              className="px-4 py-2 text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 shadow-sm transition-all flex items-center gap-2"
              style={{ borderRadius: '2px' }}
            >
              <Check className="w-4 h-4" />
              Apply Enhancement
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-ink-soft uppercase tracking-wider mb-2">Original</h4>
            <div className="p-4 bg-paper-dim border border-rule text-sm text-ink-soft line-through decoration-pen/50" style={{ borderRadius: '2px' }}>
              {aiEnhanceResult?.original}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Enhanced Content
            </h4>
            <div className="p-4 bg-blue-50 border border-blue-200 text-sm text-ink font-medium whitespace-pre-wrap" style={{ borderRadius: '2px' }}>
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
    @page {
      margin: 0;
    }

    nav, aside, button, .sticky, .fixed, .z-40, .z-50, 
    .bg-paper.border-b, .p-6.border-b, .p-6.overflow-y-auto,
    .text-sm.text-ink-soft, .bg-ink.text-white.px-6.py-3,
    .h-6.w-px {
      display: none !important;
    }

    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
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
  }
`;
document.head.appendChild(style);

export default Builder;
