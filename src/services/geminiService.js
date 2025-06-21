import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from '../config';

const genAI = new GoogleGenerativeAI(GEMINI_CONFIG.apiKey);

const NUTRITION_CONTEXT = `You are a professional nutritionist and dietitian AI assistant. You provide evidence-based advice on nutrition, diet, and healthy eating habits. Always:
- Give practical, actionable advice
- Consider individual needs and preferences
- Recommend consulting healthcare professionals for medical conditions
- Provide balanced, scientific information
- Be encouraging and supportive
- Suggest healthy alternatives when appropriate

Keep responses concise but informative.`;

export const generateNutritionResponse = async (userMessage) => {
  try {
    if (GEMINI_CONFIG.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      throw new Error('Please add your Gemini API key in src/config.js');
    }

    const model = genAI.getGenerativeModel({ 
      model: GEMINI_CONFIG.model,
      generationConfig: {
        temperature: GEMINI_CONFIG.temperature,
        maxOutputTokens: GEMINI_CONFIG.maxOutputTokens,
      }
    });

    const prompt = `${NUTRITION_CONTEXT}\n\nUser: ${userMessage}\n\nAI Nutritionist:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error.message.includes('API key')) {
      return 'Please configure your Gemini API key in src/config.js to use the AI features.';
    }
    return 'Sorry, I encountered an error. Please try again or check your internet connection.';
  }
}; 