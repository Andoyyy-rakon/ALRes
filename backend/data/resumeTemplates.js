const RESUME_TEMPLATES = {
  general: {
    name: "General Resume",
    fields: []
  },
  tech: {
    name: "Software Developer / IT / Tech",
    fields: [
      { id: 'githubUrl', label: 'GitHub Profile', type: 'url', placeholder: 'https://github.com/username' },
      { id: 'portfolioUrl', label: 'Portfolio Website', type: 'url', placeholder: 'https://yourportfolio.com' },
      { id: 'stack', label: 'Tech Stack (Languages, Frameworks, Libraries)', type: 'tags', placeholder: 'React, Node.js, Python...' },
      { id: 'codingPlatforms', label: 'Coding Platforms (LeetCode, etc.)', type: 'text', placeholder: 'LeetCode, HackerRank usernames' }
    ]
  },
  data: {
    name: "Data / AI / Analyst",
    fields: [
      { id: 'dataTools', label: 'Data Tools (Excel, SQL, Power BI)', type: 'tags' },
      { id: 'mlSkills', label: 'Machine Learning Skills', type: 'tags' },
      { id: 'publications', label: 'Publications / Research', type: 'textarea' },
      { id: 'githubUrl', label: 'GitHub / Portfolio', type: 'url' }
    ]
  },
  teacher: {
    name: "Teacher / Education",
    fields: [
      { id: 'subjects', label: 'Subjects Taught', type: 'tags' },
      { id: 'gradeLevel', label: 'Grade Level', type: 'text' },
      { id: 'licenseNumber', label: 'Teaching License Number', type: 'text' },
      { id: 'teachingMethods', label: 'Teaching Methods', type: 'textarea' }
    ]
  },
  healthcare: {
    name: "Healthcare (Nurse, Medical Staff)",
    fields: [
      { id: 'licenseNumber', label: 'License Number', type: 'text' },
      { id: 'specialization', label: 'Specialization', type: 'text' },
      { id: 'certificationsMedical', label: 'Medical Certifications (BLS, ACLS)', type: 'tags' },
      { id: 'equipment', label: 'Equipment Familiarity', type: 'textarea' }
    ]
  },
  business: {
    name: "Business / Admin / Office",
    fields: [
      { id: 'officeTools', label: 'Office Tools (CRM, ERP, etc.)', type: 'tags' },
      { id: 'kpis', label: 'Key Performance Indicators (KPIs)', type: 'textarea' },
      { id: 'leadership', label: 'Leadership Experience', type: 'textarea' }
    ]
  },
  customer: {
    name: "Customer Service / BPO",
    fields: [
      { id: 'metrics', label: 'Metrics (CSAT, AHT)', type: 'text' },
      { id: 'crmTools', label: 'CRM Tools Used', type: 'tags' },
      { id: 'scenarios', label: 'Customer Handling Scenarios', type: 'textarea' }
    ]
  },
  creative: {
    name: "Creative (Designer, Video Editor)",
    fields: [
      { id: 'portfolioUrl', label: 'Portfolio Link (Behance, Dribbble)', type: 'url' },
      { id: 'tools', label: 'Design Tools (Adobe Suite, Figma)', type: 'tags' },
      { id: 'style', label: 'Design Style / Specialization', type: 'text' }
    ]
  },
  marketing: {
    name: "Marketing / Sales",
    fields: [
      { id: 'campaigns', label: 'Campaign Experience', type: 'textarea' },
      { id: 'analyticsTools', label: 'Analytics Tools (Google Analytics, etc.)', type: 'tags' },
      { id: 'socialMedia', label: 'Social Media Platforms Managed', type: 'tags' },
      { id: 'salesMetrics', label: 'Sales Metrics (Conversion, Revenue)', type: 'text' }
    ]
  },
  engineering: {
    name: "Engineering (Civil, Mech, Electrical)",
    fields: [
      { id: 'technicalSkills', label: 'Technical Skills', type: 'tags' },
      { id: 'tools', label: 'Tools (AutoCAD, SolidWorks)', type: 'tags' },
      { id: 'builds', label: 'Major Projects / Builds', type: 'textarea' }
    ]
  },
  hospitality: {
    name: "Hospitality / Tourism",
    fields: [
      { id: 'reservationSystems', label: 'Reservation Systems used', type: 'tags' },
      { id: 'frontDesk', label: 'Front Desk Experience', type: 'textarea' },
      { id: 'eventHandling', label: 'Event Handling Experience', type: 'textarea' }
    ]
  },
  freshGrad: {
    name: "Fresh Graduate / No Experience",
    fields: [
      { id: 'internships', label: 'Internships', type: 'textarea' },
      { id: 'academicProjects', label: 'Academic Projects', type: 'textarea' },
      { id: 'extraActivities', label: 'Extracurricular Activities', type: 'textarea' },
      { id: 'volunteering', label: 'Volunteer Work', type: 'textarea' }
    ]
  }
};

module.exports = { RESUME_TEMPLATES };
