const puppeteer = require('puppeteer');
const { RESUME_TEMPLATES } = require('../data/resumeTemplates');

const getBrowser = async () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            // These flags are Linux/production only - they crash on Windows
            ...(isProduction ? ['--no-zygote', '--single-process'] : [])
        ]
    });
};

const generatePDF = async (resume) => {
    if (!resume) resume = {};
    resume.personalInfo = resume.personalInfo || {};
    resume.experience = resume.experience || [];
    resume.education = resume.education || [];
    resume.skills = resume.skills || [];
    resume.projects = resume.projects || [];
    resume.certifications = resume.certifications || [];
    resume.languages = resume.languages || [];
    resume.achievements = resume.achievements || [];
    resume.enabledSections = resume.enabledSections || {};
    resume.jobSpecificFields = resume.jobSpecificFields || {};

    let page;
    try {
        console.log('Getting browser instance...');
        const browser = await getBrowser();
        
        console.log('Creating new browser page...');
        page = await browser.newPage();

        const templateId = resume.templateId || 'modern';
        const fontFamily = resume.fontFamily || 'Inter';
        const fontSize = resume.fontSize || '11px';
        const fontWeight = resume.fontWeight || '400';

        const accentColors = {
            'modern': '#4F46E5',
            'harvard': '#1e293b',
            'creative': '#0891b2',
            'minimalist': '#334155',
            'executive-scholar': '#0f172a',
            'modern-tech': '#2563eb',
            'elegant-serif': '#be185d'
        };
        const accentColor = accentColors[templateId] || '#1d4ed8';

        const fontMap = {
            'Inter': 'family=Inter:wght@300;400;500;600;700',
            'Roboto': 'family=Roboto:wght@300;400;500;700',
            'Open Sans': 'family=Open+Sans:wght@300;400;600;700',
            'Lato': 'family=Lato:wght@300;400;700',
            'Montserrat': 'family=Montserrat:wght@300;400;600;700',
            'Poppins': 'family=Poppins:wght@300;400;500;600;700',
            'Merriweather': 'family=Merriweather:wght@300;400;700',
            'Playfair Display': 'family=Playfair+Display:wght@400;700',
            'Source Code Pro': 'family=Source+Code+Pro:wght@300;400;500;700'
        };
        const fontParam = fontMap[fontFamily] || 'family=Inter:wght@300;400;500;600;700';

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${resume.title || 'Resume'}</title>
            <link href="https://fonts.googleapis.com/css2?${fontParam}&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: ${fontFamily.includes(',') ? fontFamily : `'${fontFamily}', sans-serif`};
                    font-size: ${fontSize};
                    font-weight: ${fontWeight};
                    margin: 0;
                    padding: 0;
                    color: #1e293b;
                    line-height: 1.5;
                }
                .page {
                    width: 210mm;
                    min-height: 297mm;
                    padding: 15mm;
                    margin: auto;
                    background: white;
                    box-sizing: border-box;
                }
                
                /* Layout Utilities */
                .grid-cols-12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: 30px; }
                .col-span-8 { grid-column: span 8; }
                .col-span-4 { grid-column: span 4; }
                
                /* Section Titles */
                .section-title {
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-top: 20px;
                    margin-bottom: 12px;
                    padding-bottom: 4px;
                }
                .section-title-default {
                    color: ${accentColor};
                    border-bottom: 2px solid #f1f5f9;
                }
                .section-title-harvard {
                    color: #0f172a;
                    border-bottom: 1px solid #0f172a;
                }

                /* Items */
                .item { margin-bottom: 16px; }
                .item-header { display: flex; justify-content: space-between; align-items: baseline; }
                .item-title { font-weight: 700; color: #0f172a; font-size: 11.5px; }
                .item-subtitle { font-weight: 600; font-style: italic; color: #475569; }
                .item-date { font-size: 10px; color: #64748b; font-weight: 500; }
                .item-desc { color: #334155; margin-top: 4px; text-align: justify; white-space: pre-line; }
                
                /* Bullet Lists */
                .bullet-list { margin: 4px 0 0 15px; padding: 0; list-style-type: disc; }
                .bullet-list li { margin-bottom: 2px; color: #334155; }

                /* Header Styles */
                .header-harvard { text-align: center; margin-bottom: 20px; }
                .header-modern { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${accentColor}; padding-bottom: 15px; margin-bottom: 20px; }
                .header-elegant { border-bottom: 2px solid ${accentColor}; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; }
            </style>
        </head>
        <body>
            <div class="page">
                <!-- HEADER -->
                ${(() => {
                    const info = resume.personalInfo;
                    const contactItems = [
                        info.email,
                        info.phone,
                        info.location,
                        info.linkedInUrl ? info.linkedInUrl.replace(/^https?:\/\/(www\.)?/, '') : null
                    ].filter(Boolean);

                    if (templateId === 'modern') {
                        return `
                        <header style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 25px;">
                            <div style="flex: 1;">
                                <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin-bottom: 5px; letter-spacing: -0.02em;">${info.fullName || 'YOUR NAME'}</h1>
                                ${resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) ? `
                                <p style="font-size: 14px; font-weight: 700; color: ${accentColor}; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 15px;">${resume.title}</p>
                                ` : ''}
                                <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 10px; color: #64748b; font-weight: 500;">
                                    ${contactItems.map(item => `<span>${item}</span>`).join('')}
                                </div>
                            </div>
                            ${resume.enabledSections?.photo !== false && info.photoUrl ? `
                            <img src="${info.photoUrl}" style="width: 90px; height: 90px; border-radius: 12px; object-fit: cover; border: 4px solid white;">` : ''}
                        </header>`;
                    }

                    if (templateId === 'modern-tech') {
                        return `
                        <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                ${resume.enabledSections?.photo !== false && info.photoUrl ? `
                                <img src="${info.photoUrl}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid ${accentColor}20;">` : ''}
                                <div>
                                    <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; letter-spacing: -0.04em;">${info.fullName || 'YOUR NAME'}</h1>
                                    ${resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) ? `
                                    <p style="color: ${accentColor}; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em; margin-top: 5px;">${resume.title}</p>
                                    ` : ''}
                                </div>
                            </div>
                            <div style="text-align: right; font-size: 10px; color: #64748b; line-height: 1.6;">
                                ${contactItems.map(item => `<div>${item}</div>`).join('')}
                            </div>
                        </header>`;
                    }

                    if (templateId === 'harvard') {
                        return `
                        <header class="header-harvard" style="text-align: center; margin-bottom: 25px;">
                            <h1 style="font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">${info.fullName?.toUpperCase() || 'YOUR NAME'}</h1>
                            <div style="font-size: 10px; color: #334155; font-weight: 500;">
                                ${contactItems.join(' | ')}
                            </div>
                        </header>`;
                    }

                    if (templateId === 'executive-scholar') {
                        return `
                        <header style="text-align: center; border-bottom: 4px solid #0f172a; padding-bottom: 15px; margin-bottom: 25px;">
                            <h1 style="font-size: 28px; font-weight: 900; color: #0f172a; margin-bottom: 4px; letter-spacing: -0.02em;">${info.fullName || 'YOUR NAME'}</h1>
                            ${resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) ? `<p style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 12px;">${resume.title}</p>` : ''}
                            <div style="display: flex; justify-content: center; gap: 20px; font-size: 10px; color: #475569; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
                                ${contactItems.map(item => `<span>${item}</span>`).join('')}
                            </div>
                        </header>`;
                    }

                    if (templateId === 'elegant-serif') {
                        return `
                        <header style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid ${accentColor}; padding-bottom: 20px; margin-bottom: 25px;">
                            <div style="flex: 1;">
                                <h1 style="font-size: 28px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${info.fullName || 'YOUR NAME'}</h1>
                                ${resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) ? `<p style="font-size: 12px; font-weight: 700; color: ${accentColor}; font-style: italic; margin-bottom: 10px; letter-spacing: 0.02em;">${resume.title}</p>` : ''}
                                <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 10px; color: #64748b; font-weight: 500;">
                                    ${contactItems.map(item => `<span>${item}</span>`).join(' • ')}
                                </div>
                            </div>
                            ${resume.enabledSections?.photo !== false && info.photoUrl ? `
                            <img src="${info.photoUrl}" style="width: 85px; height: 85px; border-radius: 8px; object-fit: cover; border: 2px solid #f1f5f9;">` : ''}
                        </header>`;
                    }

                    // Default
                    return `
                    <header style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px;">
                        <div style="flex: 1;">
                            <h1 style="font-size: 28px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 4px;">${info.fullName || 'YOUR NAME'}</h1>
                            ${resume.title && !['New Untitled Resume', 'Untitled Resume'].includes(resume.title) ? `<p style="font-size: 14px; font-weight: 700; color: ${accentColor}; margin-bottom: 10px;">${resume.title}</p>` : ''}
                            <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 10px; color: #64748b; font-weight: 500;">
                                ${contactItems.map(item => `<span>${item}</span>`).join('')}
                            </div>
                        </div>
                        ${resume.enabledSections?.photo !== false && info.photoUrl ? `
                        <img src="${info.photoUrl}" style="width: 80px; height: 80px; border-radius: 8px; object-fit: cover; border: 2px solid #f1f5f9; margin-left: 20px;">` : ''}
                    </header>`;
                })()}

                <!-- CONTENT -->
                ${(() => {
                    const renderSectionTitle = (title) => {
                        const className = templateId === 'harvard' ? 'section-title-harvard' : 'section-title-default';
                        return `<h2 class="section-title ${className}">${title}</h2>`;
                    };

                    const renderExperience = () => {
                        if (!resume.experience?.length || resume.enabledSections?.experience === false) return '';
                        return `
                        <section>
                            ${renderSectionTitle('Professional Experience')}
                            ${resume.experience.map(exp => {
                                if (templateId === 'harvard') {
                                    return `
                                    <div class="item">
                                        <div class="item-header">
                                            <span class="item-title" style="text-transform: uppercase;">${exp.company || 'Company'}</span>
                                            <span class="item-date" style="font-style: italic; color: #0f172a;">${exp.location || ''}</span>
                                        </div>
                                        <div class="item-header" style="margin-top: 2px;">
                                            <span class="item-subtitle">${exp.position || 'Position'}</span>
                                            <span class="item-date" style="font-style: italic; color: #0f172a;">${exp.startDate} – ${exp.endDate}</span>
                                        </div>
                                        <ul class="bullet-list">
                                            ${exp.description?.split('\n').map(b => b.trim() ? `<li>${b.replace(/^[•\-\*]\s*/, '')}</li>` : '').join('')}
                                        </ul>
                                    </div>`;
                                }
                                return `
                                <div class="item">
                                    <div class="item-header">
                                        <span class="item-title">${exp.position || 'Position'}</span>
                                        <span class="item-date">${exp.startDate} – ${exp.endDate}</span>
                                    </div>
                                    <div class="item-subtitle" style="color: ${accentColor};">${exp.company || 'Company'}</div>
                                    <div class="item-desc">${exp.description}</div>
                                </div>`;
                            }).join('')}
                        </section>`;
                    };

                    const renderEducation = () => {
                        if (!resume.education?.length || resume.enabledSections?.education === false) return '';
                        return `
                        <section>
                            ${renderSectionTitle('Education')}
                            ${resume.education.map(edu => {
                                if (templateId === 'harvard') {
                                    return `
                                    <div class="item">
                                        <div class="item-header">
                                            <span class="item-title" style="text-transform: uppercase;">${edu.institution || 'University'}</span>
                                            <span class="item-date" style="font-style: italic; color: #0f172a;">${edu.location || ''}</span>
                                        </div>
                                        <div class="item-header" style="margin-top: 2px;">
                                            <span class="item-subtitle">${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</span>
                                            <span class="item-date" style="font-style: italic; color: #0f172a;">${edu.endDate}</span>
                                        </div>
                                    </div>`;
                                }
                                return `
                                <div class="item">
                                    <div class="item-header">
                                        <span class="item-title">${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</span>
                                        <span class="item-date">${edu.startDate} – ${edu.endDate}</span>
                                    </div>
                                    <div class="item-subtitle">${edu.institution}</div>
                                </div>`;
                            }).join('')}
                        </section>`;
                    };

                    const renderSkills = () => {
                        if (!resume.skills?.length || resume.enabledSections?.skills === false) return '';
                        return `
                        <section>
                            ${renderSectionTitle('Skills & Expertise')}
                            <div style="display: flex; flex-wrap: wrap; gap: 10px 20px;">
                                ${resume.skills.map(skill => `
                                    <div style="display: flex; align-items: center; gap: 6px; font-size: 10.5px;">
                                        <span style="color: #cbd5e1;">•</span>
                                        <span>${skill}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>`;
                    };

                    const renderProjects = () => {
                        if (!resume.projects?.length || resume.enabledSections?.projects === false) return '';
                        return `
                        <section>
                            ${renderSectionTitle('Projects')}
                            ${resume.projects.map(proj => `
                                <div class="item">
                                    <div class="item-header">
                                        <span class="item-title">${proj.name}</span>
                                        ${proj.url ? `<span class="item-date" style="color: ${accentColor};">${proj.url.replace(/^https?:\/\/(www\.)?/, '')}</span>` : ''}
                                    </div>
                                    <div class="item-desc">${proj.description}</div>
                                </div>
                            `).join('')}
                        </section>`;
                    };

                    const renderOtherSections = () => {
                        const hasCerts = resume.certifications?.length && resume.enabledSections?.certifications !== false;
                        const hasLangs = resume.languages?.length && resume.enabledSections?.languages !== false;
                        const hasAchieve = resume.achievements?.length && resume.enabledSections?.achievements !== false;
                        
                        return `
                            ${hasCerts ? `
                            <section>
                                ${renderSectionTitle('Certifications')}
                                <ul class="bullet-list">
                                    ${resume.certifications.map(cert => `<li>${cert}</li>`).join('')}
                                </ul>
                            </section>` : ''}
                            
                            ${hasLangs ? `
                            <section>
                                ${renderSectionTitle('Languages')}
                                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                    ${resume.languages.map(lang => `<span style="font-size: 9px; font-weight: 700; background: #f1f5f9; padding: 2px 6px; border-radius: 3px; color: #475569;">${lang.toUpperCase()}</span>`).join('')}
                                </div>
                            </section>` : ''}
                            
                            ${hasAchieve ? `
                            <section>
                                ${renderSectionTitle('Achievements')}
                                <ul class="bullet-list">
                                    ${resume.achievements.map(ach => `<li>${ach}</li>`).join('')}
                                </ul>
                            </section>` : ''}
                        `;
                    };

                    const renderJobSpecificFields = (isSidebar = false) => {
                        const jobTemplate = RESUME_TEMPLATES[resume.jobRole];
                        if (!jobTemplate || !resume.jobSpecificFields) return '';

                        const fieldsToRender = jobTemplate.fields.filter(field => resume.jobSpecificFields[field.id]);
                        if (fieldsToRender.length === 0) return '';

                        const isHarvard = templateId === 'harvard';
                        if (isSidebar) {
                            return fieldsToRender.map(field => {
                                const value = resume.jobSpecificFields[field.id];
                                return `
                                <div style="margin-bottom: 20px;">
                                    <h3 style="font-size: 9px; font-weight: 800; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.1em; margin-bottom: 8px;">${field.label}</h3>
                                    ${field.type === 'tags' ? `
                                        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                            ${value.split(',').map(tag => `<span style="font-size: 8px; font-weight: 700; color: #475569; background: #f1f5f9; padding: 2px 5px; border-radius: 3px; border: 1px solid #e2e8f0;">${tag.trim()}</span>`).join('')}
                                        </div>` : 
                                    field.type === 'url' ? `<div style="font-size: 9px; font-weight: 700; color: ${accentColor};">${value.replace(/^https?:\/\/(www\.)?/, '')}</div>` :
                                    `<div style="font-size: 9px; color: #475569; font-weight: 500; line-height: 1.4;">${value}</div>`}
                                </div>`;
                            }).join('');
                        }

                        return `
                        <section>
                            ${renderSectionTitle('Professional Details')}
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                ${fieldsToRender.map(field => {
                                    const value = resume.jobSpecificFields[field.id];
                                    return `
                                    <div style="margin-bottom: 10px;">
                                        <div style="font-size: ${isHarvard ? '10px' : '8px'}; font-weight: 800; color: ${isHarvard ? '#0f172a' : '#94a3b8'}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${field.label}</div>
                                        ${field.type === 'tags' ? `
                                            <div style="display: flex; flex-wrap: wrap; gap: 5px; font-size: 10px; color: #334155;">
                                                ${isHarvard 
                                                    ? value.split(',').map((tag, i) => i === 0 ? tag.trim() : `, ${tag.trim()}`).join('')
                                                    : value.split(',').map(tag => `<span style="font-size: 9px; font-weight: 700; color: ${accentColor}; background: ${accentColor}10; padding: 2px 6px; border-radius: 3px; border: 1px solid ${accentColor}20;">${tag.trim()}</span>`).join('')}
                                            </div>` : 
                                        field.type === 'url' ? `<div style="font-size: 10px; font-weight: 700; color: ${isHarvard ? '#334155' : accentColor}; ${isHarvard ? '' : 'text-decoration: underline;'}">${value.replace(/^https?:\/\/(www\.)?/, '')}</div>` :
                                        `<div style="font-size: 10px; color: #334155; line-height: 1.5;">${value}</div>`}
                                    </div>`;
                                }).join('')}
                            </div>
                        </section>`;
                    };

                    const sectionsHtml = `
                        ${resume.summary && resume.enabledSections?.summary !== false ? `
                        <section>
                            ${renderSectionTitle('Summary')}
                            <div class="item-desc">${resume.summary}</div>
                        </section>` : ''}
                        
                        ${templateId !== 'modern-tech' && templateId !== 'creative' ? renderJobSpecificFields() : ''}
                        
                        ${renderExperience()}
                        ${renderEducation()}
                        ${renderProjects()}
                        ${renderSkills()}
                        ${renderOtherSections()}
                    `;

                    if (templateId === 'modern-tech' || templateId === 'creative') {
                        return `
                        <div class="grid-cols-12">
                            <div class="col-span-8">${sectionsHtml}</div>
                            <div class="col-span-4">
                                ${renderJobSpecificFields(true)}
                                ${resume.skills?.length ? `
                                <section>
                                    <h3 style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.1em; margin-bottom: 12px;">Core Skills</h3>
                                    <div style="display: flex; flex-direction: column; gap: 6px;">
                                        ${resume.skills.map(skill => `
                                            <div style="padding: 6px; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 4px; font-size: 9px; font-weight: 700; color: #475569;">${skill}</div>
                                        `).join('')}
                                    </div>
                                </section>` : ''}
                            </div>
                        </div>`;
                    }

                    return sectionsHtml;
                })()}
            </div>
        </body>
        </html>
        `;

        await page.setContent(htmlContent, { 
            waitUntil: 'load',
            timeout: 30000 
        });

        try {
            await page.evaluate(() => {
                return Promise.race([
                    document.fonts.ready,
                    new Promise(resolve => setTimeout(resolve, 2500))
                ]);
            });
        } catch (e) {
            console.log('Warning: document.fonts.ready timed out or failed:', e);
        }

        await new Promise(r => setTimeout(r, 200));

        const pdfSize = resume.paperSize === 'Letter' ? 'Letter' : resume.paperSize === 'Long' ? 'Legal' : 'A4';
        
        console.log(`Generating ${pdfSize} PDF...`);
        const buffer = await page.pdf({
            format: pdfSize,
            printBackground: true,
            displayHeaderFooter: false,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });

        console.log('PDF generation complete.');
        return buffer;
    } catch (error) {
        console.error('Error in generatePDF:', error);
        throw error;
    } finally {
        if (page) {
            try {
                const browser = page.browser();
                await page.close();
                await browser.close();
            } catch (err) {
                console.error('Error closing browser:', err);
            }
        }
    }
};

module.exports = { generatePDF };
