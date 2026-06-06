
import ModernProf from "./Modernproff.png"
import HarvardClass from "./Harvardclassic.png"
import CreativeSide from "./CREATIVESIDEBAR.png"
import ExececutiveMini from "./EXECUTIVEMINIMAL.png"
import ExececutiveSch from "./EXECUTIVESCHOOLAR.png"
import ModernTech from "./MODERNTECH.png"
import Elegantserif from "./ELEGANTSERIF.png"

export const assets={
  ModernProf,
  HarvardClass,
  CreativeSide,
  ExececutiveMini,
  ExececutiveSch,
  ModernTech,
  Elegantserif
}

export const VISUAL_TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean design with bold accents and modern typography. Great for tech and business roles.',
    layoutType: 'single-column',
    thumbnail: ModernProf,
    defaultStyles: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '11px',
      color: '#4F46E5'
    }
  },
  {
    id: 'harvard',
    name: 'Harvard Classic',
    description: 'The standard for high-finance, law, and academia. Serif fonts and rigorous structure.',
    layoutType: 'single-column',
    thumbnail: HarvardClass,
    defaultStyles: {
      fontFamily: 'Merriweather, serif',
      fontSize: '10px',
      color: '#1e293b'
    }
  },
  {
    id: 'creative',
    name: 'Creative Sidebar',
    description: 'A stylish two-column layout that makes your contact info and skills stand out.',
    layoutType: 'two-column',
    thumbnail:CreativeSide,
    defaultStyles: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '10px',
      color: '#0891b2'
    }
  },
  {
    id: 'minimalist',
    name: 'Executive Minimal',
    description: 'High-end minimalist design focusing on clarity and professional presence.',
    layoutType: 'single-column',
    thumbnail:ExececutiveMini,
    defaultStyles: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: '11px',
      color: '#334155'
    }
  },
  {
    id: 'executive-scholar',
    name: 'Executive Scholar',
    description: 'A sophisticated academic-style layout with strong horizontal lines and serif fonts.',
    layoutType: 'single-column',
    thumbnail:ExececutiveSch,
    defaultStyles: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '10px',
      color: '#0f172a'
    }
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    description: 'A clean, accent-heavy layout optimized for software engineers and IT professionals.',
    layoutType: 'two-column',
    thumbnail:ModernTech,
    defaultStyles: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '11px',
      color: '#2563eb'
    }
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    description: 'A beautiful, fashion-forward layout using elegant serif typography and soft accents.',
    layoutType: 'single-column',
    thumbnail:Elegantserif,
    defaultStyles: {
      fontFamily: 'Merriweather, serif',
      fontSize: '11px',
      color: '#be185d'
    }
  }
];
