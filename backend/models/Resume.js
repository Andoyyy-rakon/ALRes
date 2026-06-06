const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      default: 'Untitled Resume',
    },
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      portfolioUrl: String,
      linkedInUrl: String,
      githubUrl: String,
      photoUrl: String,
    },
    summary: String,
    experience: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
      },
    ],
    skills: [String],
    projects: [
      {
        name: String,
        description: String,
        url: String,
      },
    ],
    certifications: [String],
    languages: [String],
    jobRole: { type: String, default: 'General Resume' },
    style: { type: String, default: 'Modern' },
    fontFamily: { type: String, default: 'Inter, sans-serif' },
    fontSize: { type: String, default: '11px' },
    fontWeight: { type: String, default: '400' },
    templateId: { type: String, default: 'modern' },
    styleColor: { type: String, default: '#4F46E5' },

    availability: String,
    preferredJobType: String,
    keywords: [String],
    achievements: [String],

    jobSpecificFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    },
    
    enabledSections: {
      photo: { type: Boolean, default: false },
      summary: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      education: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      projects: { type: Boolean, default: false },
      certifications: { type: Boolean, default: false },
      languages: { type: Boolean, default: false },
      achievements: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
