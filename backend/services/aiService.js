require('dotenv').config();
const Groq = require('groq-sdk');

class AIService {
  constructor() {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.warn('GROQ_API_KEY is missing!');
      this.client = null;
      return;
    }

    this.client = new Groq({
      apiKey: apiKey,
    });
  }

  async generateContent(prompt) {
    if (!this.client) throw new Error('AI service not initialized');

    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          { role: "user", content: prompt }
        ],
        model: "llama-3.1-8b-instant", 
      });

      return completion.choices[0]?.message?.content || "";
    } catch (error) {
      console.error('Error generating AI content:', error);
      throw new Error('Failed to generate AI content');
    }
  }

  async generateSummary(rawData) {
    const prompt = `Write a professional resume summary (3-4 sentences) based on the following details:\n${rawData}\nMake it impactful and professional. Return ONLY the summary paragraph itself. No preamble, no headings, no intro sentences like "Here is" or "Here's a".`;
    return this.generateContent(prompt);
  }

  async suggestSkills(experience, targetRole) {
    const prompt = `List exactly 10 relevant hard and soft skills for the role "${targetRole}" based on this experience:\n${experience}\n\nRULES:\n- Return ONLY a comma-separated list of skills\n- No numbering, no bullet points, no intro text, no headings\n- Example format: Skill One, Skill Two, Skill Three`;
    
    const response = await this.generateContent(prompt);
    
    const lines = response.split('\n').map(l => l.trim()).filter(Boolean);
    
    const skillsLine = lines.reduce((best, line) => {
      return (line.split(',').length > (best.split(',').length)) ? line : best;
    }, lines[0] || '');
    return skillsLine.split(',').map(s => s.replace(/^[\d.\-*•]+\s*/, '').trim()).filter(s => s.length > 0 && s.length < 60);
  }

  async generateFullResume(userData, enabledSections) {
    const prompt = `
You are a professional resume writer.

Your task is to generate a clean, modern, and ATS-friendly resume based on the user's data and selected sections.

IMPORTANT RULES:
- ONLY include sections that are enabled
- DO NOT include sections that are disabled or have no data
- Keep the resume concise and professional
- Use bullet points for Experience and Projects
- Make the Professional Summary short (2–3 sentences only)
- Highlight key skills clearly
- Use simple and readable formatting

PHOTO HANDLING:
- If "withPhoto" is true, assume a professional profile photo is included at the top
- If false, format the resume cleanly without mentioning any photo

ENABLED SECTIONS:
${JSON.stringify(enabledSections, null, 2)}

USER DATA:
${JSON.stringify(userData, null, 2)}

OUTPUT FORMAT:
- Name (at the top)
- Professional Summary (if enabled)
- Skills (if enabled)
- Experience (if enabled)
- Education (if enabled)
- Projects (if enabled)
- Certifications (if enabled)
- Languages (if enabled)

Generate the final resume now.`;

    return this.generateContent(prompt);
  }

  async enhanceContent(type, content) {
    const prompts = {
      description: `Enhance the following job description for a resume to make it more impactful, results-oriented, and professional. Use action verbs and include metrics if possible. Return ONLY the enhanced description text. No preamble, no intro like "Here is" or "Here's an enhanced": \n\n${content}`,
      certificates: `Format and professionally rephrase the following certifications for a resume. Return ONLY the plain text content without any preamble, headings, or conversational filler like "Here is": \n\n${content}`,
      languages: `Professionally format the following languages and proficiency levels for a resume. Return ONLY the plain text content without any preamble, headings, or conversational filler like "Here is": \n\n${content}`,
      achievements: `Enhance the following achievements for a resume to make them more impressive and professional. Return ONLY the plain text content without any preamble, headings, or conversational filler like "Here is": \n\n${content}`,
      summary: `Rewrite the following into a professional resume summary (3-4 sentences). Return ONLY the summary paragraph itself with NO preamble, NO intro like "Here's a rewritten" or "Here is", NO headings. Just the summary text: \n\n${content}`
    };

    const prompt = prompts[type] || prompts.description;
    return this.generateContent(prompt);
  }

  async checkGrammar(content) {
    const prompt = `Check the following text for grammar, spelling, and punctuation errors. If there are any errors, provide the corrected version. If the text is already correct, return it as is. ONLY return the corrected/original text, nothing else: \n\n${content}`;
    return this.generateContent(prompt);
  }
}

module.exports = new AIService();