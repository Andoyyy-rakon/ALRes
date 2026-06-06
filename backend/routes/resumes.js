const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getUserResumes,
  createResume,
  getResumeById,
  updateResume,
  generateAiContent,
  deleteResume,
  downloadPdf,
  generateGuestAi,
  downloadGuestPdf
} = require('../controllers/resumeController');

const router = express.Router();

router.route('/')
  .get(protect, getUserResumes)
  .post(protect, createResume);

router.route('/:id')
  .get(protect, getResumeById)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

router.post('/generate', protect, generateAiContent);
router.get('/:id/download', protect, downloadPdf);

router.post('/generate/guest', generateGuestAi);
router.post('/download/guest', downloadGuestPdf);

module.exports = router;
