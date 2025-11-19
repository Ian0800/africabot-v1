import { GoogleGenAI, Type } from "@google/genai";
import { BotConfig } from '../types';

// Helper to pause execution
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateBotScript = async (businessName: string, businessType: string, language: string = "English"): Promise<BotConfig> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing. Please create a .env file in your project root with API_KEY=your_key_here and restart the server.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are an expert WhatsApp chatbot designer for small businesses in Africa.
  Create a friendly, professional, and culturally appropriate welcome script for a ${businessType} named "${businessName}".
  
  STRICT REQUIREMENTS:
  1. Language: Generate all text in ${language}.
  2. Currency: Use USD ($) for any general price examples, as this is for a pan-African audience.
  3. Context: Ensure the tone suits the African market (polite, relational, efficient).
  
  Include a welcome message and 4 concise menu options that customers would likely need (e.g., 'View Prices', 'Book Appointment', 'Location', 'Contact Us').
  `;

  let lastError: any = null;

  // Retry logic: Attempt up to 3 times if the server is overloaded (503)
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              welcomeMessage: { type: Type.STRING },
              menuOptions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["welcomeMessage", "menuOptions"],
            propertyOrdering: ["welcomeMessage", "menuOptions"]
          }
        }
      });

      let jsonText = response.text || "";
      // Remove markdown code blocks if present
      jsonText = jsonText.replace(/```json/g, "").replace(/```/g, "").trim();

      if (jsonText) {
        const data = JSON.parse(jsonText);
        return {
          businessName,
          businessType,
          welcomeMessage: data.welcomeMessage,
          menuOptions: data.menuOptions
        };
      }
    } catch (error: any) {
      console.warn(`Attempt ${attempt + 1} failed:`, error);
      lastError = error;

      // Check if error is 503 (Service Unavailable/Overloaded)
      const isOverloaded = error.message?.includes('503') || error.message?.includes('overloaded') || error.status === 503;
      
      // If overloaded and we have retries left, wait and try again
      if (isOverloaded && attempt < 2) {
        await wait(1000 * Math.pow(2, attempt)); // Wait 1s, then 2s
        continue;
      }
      
      // If it's a permission error (API key), stop immediately
      if (error.message?.includes('API key') || error.message?.includes('403')) {
        break;
      }
    }
  }

  // If we exit the loop, all attempts failed. Throw a user-friendly error.
  const errorMessage = lastError?.message || "Unknown error";

  if (errorMessage.includes("API key") || errorMessage.includes("403")) {
      throw new Error("Invalid API Key. Please check your .env file.");
  }
  
  if (errorMessage.includes("503") || errorMessage.includes("overloaded")) {
      throw new Error("Google AI services are currently overloaded. Please try again in a few moments.");
  }

  // Clean up raw JSON error dumps if possible
  try {
      if (errorMessage.startsWith('{')) {
        const parsed = JSON.parse(errorMessage);
        if (parsed.error && parsed.error.message) {
           throw new Error(parsed.error.message);
        }
      }
  } catch (e) {
      // If parsing fails, just throw the original string
  }

  throw new Error(`Generation failed: ${errorMessage}`);
};