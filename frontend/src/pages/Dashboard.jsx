import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Plus, FileText, Trash2, Edit2, Download, Cloud, AlertCircle, X, Loader2 } from 'lucide-react';
import logo from '../assets/logo.png'; 
import { GoogleLogin } from '@react-oauth/google';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const { user, login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const { showToast, hideToast } = useToast();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [resumeToDownload, setResumeToDownload] = useState(null);
  const [downloadingResumes, setDownloadingResumes] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchResumes();
  }, [user]);

  const fetchResumes = async () => {
    try {
      if (!user) {
        const guestResumes = JSON.parse(localStorage.getItem('guest_resumes') || '[]');
        setResumes(guestResumes);
      } else {
        const { data } = await axios.get('/resumes');
        setResumes(data);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    try {
      if (!user) {
        const newResume = {
          _id: 'guest_' + Date.now(),
          title: 'New Untitled Resume',
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        };
        const guestResumes = JSON.parse(localStorage.getItem('guest_resumes') || '[]');
        guestResumes.push(newResume);
        localStorage.setItem('guest_resumes', JSON.stringify(guestResumes));
        navigate(`/builder/${newResume._id}`);
      } else {
        const loadingToast = showToast('Creating your resume...', 'loading', 10000);
        const { data } = await axios.post('/resumes', 
          { title: 'New Untitled Resume' }
        );
        
        hideToast(loadingToast);
        navigate(`/builder/${data._id}`);
      }
    } catch (error) {
      console.error('Error creating resume:', error);
      showToast('Failed to create new resume. Please try again.', 'error');
    }
  };
  
  const deleteResume = (id) => {
    setResumeToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!resumeToDelete) return;
    try {
      if (!user) {
        let guestResumes = JSON.parse(localStorage.getItem('guest_resumes') || '[]');
        guestResumes = guestResumes.filter(r => r._id !== resumeToDelete);
        localStorage.setItem('guest_resumes', JSON.stringify(guestResumes));
        fetchResumes();
      } else {
        await axios.delete(`/resumes/${resumeToDelete}`);
        fetchResumes();
      }
    } catch (error) {
        console.error('Error deleting:', error);
    } finally {
        setShowDeleteModal(false);
        setResumeToDelete(null);
    }
  };

  const handleDownloadClick = (resume) => {
    if (downloadingResumes[resume._id]) return;
    setResumeToDownload(resume);
    setShowDownloadModal(true);
  };

  const confirmDownload = async () => {
    if (!resumeToDownload) return;
    const targetResume = resumeToDownload;
    
    setShowDownloadModal(false);
    setResumeToDownload(null);

    setDownloadingResumes(prev => ({ ...prev, [targetResume._id]: true }));
    const loadingToastId = showToast('Preparing your PDF...', 'loading', 15000);

    try {
      let response;
      if (!user) {
        
        const guestResumes = JSON.parse(localStorage.getItem('guest_resumes') || '[]');
        const localResume = guestResumes.find(r => r._id === targetResume._id);
        if (!localResume) {
          showToast('Resume data not found.', 'error');
          setDownloadingResumes(prev => ({ ...prev, [targetResume._id]: false }));
          return;
        }

        response = await axios.post(`/resumes/download/guest`, localResume, {
            responseType: 'blob'
        });
      } else {
        response = await axios.get(`/resumes/${targetResume._id}/download`, {
            responseType: 'blob'
        });
      }
      
      let blob = response.data;
      if (!(blob instanceof Blob)) {
          blob = new Blob([response.data], { type: 'application/pdf' });
      }

      if (blob.type !== 'application/pdf') {
          showToast('Failed to generate PDF. Unexpected server response.', 'error');
          setDownloadingResumes(prev => ({ ...prev, [targetResume._id]: false }));
          return;
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${targetResume.title || 'resume'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      if (typeof loadingToastId !== 'undefined') hideToast(loadingToastId);
      showToast('Download successfully!', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showToast('Failed to download PDF. Please try again.', 'error');
    } finally {
        setDownloadingResumes(prev => ({ ...prev, [targetResume._id]: false }));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoggingIn(true);
    try {
      const { data } = await axios.post('/auth/google', {
        credential: credentialResponse.credential,
      });
      login(data);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
  );

  return (
    <div className="bg-surface min-h-screen pt-6 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!user && (
          <div className="mb-8 bg-surface-container border border-outline-variant rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-surface text-primary-600 rounded-lg shrink-0 shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
            <div>
              <h3 className="text-lg font-bold text-surface-on mb-1">Local Workspace Mode</h3>
              <p className="text-sm text-secondary max-w-2xl">
                You are currently building resumes locally on this device. Your work is saved to your browser's local storage.
              </p>
            </div>
          </div>
        </div>
      )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              {t('dashboard.myResumes')}
          </h2>
          <button
              onClick={createResume}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all font-bold shadow-ambient hover:shadow-ambient-hover"
          >
              <Plus size={18} />
              {t('dashboard.newResume')}
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-ambient">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container mb-6">
                <FileText className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-surface-on mb-2">No resumes found</h3>
            <p className="text-secondary mb-8 max-w-sm mx-auto">Get started by creating your first AI-powered professional resume.</p>
             <button
                onClick={createResume}
                className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-bold rounded-lg text-surface-on bg-white hover:bg-surface-dim transition"
             >
                <Plus className="w-4 h-4 mr-2" />
                Start Building
             </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white rounded-2xl shadow-ambient border border-slate-200 overflow-hidden hover:shadow-ambient-hover transition-all group group-hover:-translate-y-1">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-surface-container text-primary-600 mb-4">
                            <FileText size={30} />
                        </div>
                        <span className="text-xs font-bold text-outline">
                             {t('dashboard.lastUpdated')}: {new Date(resume.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                
                  <h3 className="text-lg font-bold text-surface-on mb-1 truncate">{resume.title || 'Untitled Resume'}</h3>
                  <p className="text-sm text-secondary mb-6 line-clamp-2">
                       {resume.summary || 'No summary provided yet.'}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => navigate(`/builder/${resume._id}`)}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-slate-200 text-sm font-bold rounded-lg text-surface-on bg-white hover:bg-surface-dim hover:border-primary-300 transition"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDownloadClick(resume)}
                      disabled={downloadingResumes[resume._id]}
                      className={`p-2 rounded-lg transition ${
                        downloadingResumes[resume._id] 
                          ? 'text-slate-300 cursor-not-allowed bg-slate-50' 
                          : 'text-outline hover:text-primary-600 hover:bg-surface-container'
                      }`}
                      title={downloadingResumes[resume._id] ? "Downloading..." : "Download PDF"}
                    >
                      {downloadingResumes[resume._id] ? (
                        <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                      ) : (
                        <Download className="w-5 h-5"/>
                      )}
                    </button>
                    <button 
                        onClick={() => deleteResume(resume._id)}
                        className="p-2 text-outline hover:text-error hover:bg-error-container rounded-lg transition" title="Delete"
                    >
                         <Trash2 className="w-5 h-5"/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setResumeToDelete(null);
        }}
        title="Delete Resume"
        type="warning"
        footer={
          <>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setResumeToDelete(null);
              }}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Resume
            </button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete this resume? This action cannot be undone and all your data will be permanently lost.
        </p>
      </Modal>

      <Modal
        isOpen={showDownloadModal}
        onClose={() => {
          setShowDownloadModal(false);
          setResumeToDownload(null);
        }}
        title="Download Resume"
        type="info"
        footer={
          <>
            <button
              onClick={() => {
                setShowDownloadModal(false);
                setResumeToDownload(null);
              }}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDownload}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to download this resume as a PDF?
        </p>
      </Modal>

      {/* Google Login Loading Overlay */}
      {isLoggingIn && (
        <div className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md transition-all animate-in fade-in duration-300">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={logo} alt="ALRes Logo" className="w-12 h-12 object-contain" />
            </div>
          </div>
          <div className="mt-8 text-center">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Signing you in...</h4>
            <p className="text-slate-500 text-sm animate-pulse">Connecting your account to ALRes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
