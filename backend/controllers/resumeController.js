const Resume = require('../models/Resume');
const aiService = require('../services/aiService');
const { generatePDF } = require('../services/pdfService');

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user._id,
      ...req.body,
    });
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateAiContent = async (req, res) => {
  const { type, content, data } = req.body;
  
  try {
    let result;
    if (type === 'summary') {
      result = await aiService.generateSummary(content);
    } else if (type === 'skills') {
      result = await aiService.suggestSkills(data.experience, data.targetRole);
    } else if (type === 'full-resume') {
      result = await aiService.generateFullResume(data.userData, data.enabledSections);
    } else if (type === 'enhance') {
      result = await aiService.enhanceContent(data.enhanceType, content);
    } else if (type === 'grammar-check') {
      result = await aiService.checkGrammar(content);
    } else {
      return res.status(400).json({ message: 'Invalid generation type' });
    }
    
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await resume.deleteOne();
    res.json({ message: 'Resume removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadPdf = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).lean();
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    const buffer = await generatePDF(resume);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${resume.title || 'resume'}.pdf"`,
      'Content-Length': buffer.length
    });
    
    res.end(Buffer.from(buffer), 'binary');
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ message: 'Failed to generate PDF. ' + error.message });
  }
};

const generateGuestAi = async (req, res) => {
  const { type, content, data } = req.body;
  
  try {
    let result;
    if (type === 'summary') {
      result = await aiService.generateSummary(content);
    } else if (type === 'skills') {
      result = await aiService.suggestSkills(data.experience, data.targetRole);
    } else if (type === 'full-resume') {
      result = await aiService.generateFullResume(data.userData, data.enabledSections);
    } else if (type === 'enhance') {
      result = await aiService.enhanceContent(data.enhanceType, content);
    } else if (type === 'grammar-check') {
      result = await aiService.checkGrammar(content);
    } else {
      return res.status(400).json({ message: 'Invalid generation type' });
    }
    
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadGuestPdf = async (req, res) => {
  try {
    const resume = req.body;
    if (!resume) return res.status(400).json({ message: 'Resume data is required' });
    
    const buffer = await generatePDF(resume);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${resume.title || 'resume'}.pdf"`,
      'Content-Length': buffer.length
    });
    
    res.end(Buffer.from(buffer), 'binary');
  } catch (error) {
    console.error('Guest PDF Generation Error:', error);
    res.status(500).json({ message: 'Failed to generate PDF. ' + error.message });
  }
};

module.exports = {
  getUserResumes,
  createResume,
  getResumeById,
  updateResume,
  generateAiContent,
  deleteResume,
  downloadPdf,
  generateGuestAi,
  downloadGuestPdf
};
