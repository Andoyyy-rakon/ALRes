const { generatePDF } = require('./services/pdfService');
const fs = require('fs');
const Resume = require('./models/Resume');
const mongoose = require('mongoose');
require('dotenv').config();

async function test() {
    console.log('Starting mock PDF test...');
    const mockResume = {};
    
    console.log('Generating PDF...');
    const buffer = await generatePDF(mockResume);
    fs.writeFileSync('test_output.pdf', buffer);
    
    const stats = fs.statSync('test_output.pdf');
    console.log(`PDF saved. Size: ${stats.size} bytes`);
    
    process.exit(0);
}

test().catch(err => {
    console.error('Test Failed:', err);
    process.exit(1);
});
