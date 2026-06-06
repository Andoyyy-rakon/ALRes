require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const Groq = require('groq-sdk');

async function testAI() {
  const apiKey = process.env.GROQ_API_KEY;
  console.log('API KEY:', apiKey ? apiKey.substring(0, 10) + '...' : 'undefined');

  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    console.error('ERROR: GROQ_API_KEY is missing or is the placeholder.');
    process.exit(1);
  }

  const groq = new Groq({ apiKey });

  const modelsToTest = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'mixtral-8x7b-32768'];

  for (const modelName of modelsToTest) {
    console.log(`\n--- Testing model: ${modelName} ---`);
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: 'Say "Hello Groq!"' }
        ],
        model: modelName,
      });

      console.log(`SUCCESS: ${modelName} responded:`, completion.choices[0]?.message?.content);
      break; 
    } catch (error) {
      console.error(`FAILED: ${modelName}`);
      console.error('Message:', error.message);
      if (error.status) console.error('Status:', error.status);
    }
  }
}

testAI();
