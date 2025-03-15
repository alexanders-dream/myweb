
import { toast } from "@/hooks/use-toast";

export type AiProvider = 'openai' | 'anthropic' | 'perplexity' | 'groq' | 'deepseek' | 'openrouter';

export type AiSettings = {
  provider: AiProvider;
  model: string;
  apiKey: string;
  temperature: number;
  maxTokens: number;
  ragEnabled: boolean;
  systemPrompt: string;
};

export type Document = {
  id: string;
  name: string;
  size: number;
  date: string;
  type: string;
};

export const getAiSettings = (): AiSettings => {
  try {
    const aiSettings = localStorage.getItem('aiSettings');
    return aiSettings ? JSON.parse(aiSettings) : {
      provider: 'openai',
      model: 'gpt-4o-mini',
      apiKey: '',
      temperature: 0.7,
      maxTokens: 1000,
      ragEnabled: true,
      systemPrompt: "You are a helpful assistant for Alexander Oguso Digital Transformation Consultancy."
    };
  } catch (error) {
    console.error('Error loading AI settings:', error);
    return {
      provider: 'openai',
      model: 'gpt-4o-mini',
      apiKey: '',
      temperature: 0.7,
      maxTokens: 1000,
      ragEnabled: true,
      systemPrompt: "You are a helpful assistant for Alexander Oguso Digital Transformation Consultancy."
    };
  }
};

export const getDocuments = (): Document[] => {
  try {
    const documents = localStorage.getItem('knowledgeBaseDocs');
    return documents ? JSON.parse(documents) : [];
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

// This function would be implemented to make actual API calls in production
export const callAiProvider = async (provider: AiProvider, model: string, apiKey: string, messages: any[], temperature: number, maxTokens: number) => {
  // This is a placeholder for real API calls
  // In a production environment, this would call different provider APIs
  
  console.log(`Calling ${provider} API with model ${model}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demonstration purposes, return a simulated response
  return {
    content: "This is a simulated response. In production, this would come from the AI provider API."
  };
};

export const generateResponse = async (query: string): Promise<string> => {
  const settings = getAiSettings();
  const documents = getDocuments();
  
  if (!settings.apiKey) {
    // If no API key is set, return a simulated response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `I'd provide information based on the company documents, but the AI service needs to be configured in the admin panel first. (This is a simulated response - in production, this would use ${settings.provider} with the ${settings.model} model)`;
  }
  
  if (documents.length === 0 && settings.ragEnabled) {
    // If RAG is enabled but no documents are uploaded
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "I don't have any knowledge base documents to reference. Please upload documents in the admin panel to enable more accurate responses.";
  }

  try {
    // Prepare the message history
    const messages = [
      { role: "system", content: settings.systemPrompt },
      { role: "user", content: query }
    ];
    
    // Simulate RAG by adding context from "documents"
    let context = "";
    if (settings.ragEnabled && documents.length > 0) {
      // In a real implementation, this would perform document similarity search
      // For now, we'll just add document names as context
      context = "I've analyzed these documents from your knowledge base: " + 
        documents.map((doc: Document) => doc.name).join(", ");
    }
    
    if (context) {
      messages.splice(1, 0, { role: "system", content: context });
    }
    
    // For demonstration, return a simulated response
    // In production, this would call the actual provider API
    return `Based on my analysis ${settings.ragEnabled ? 'of your knowledge base' : ''}, Alexander Oguso offers comprehensive digital transformation services including AI solutions, XR experiences, and multimedia content creation. ${query.toLowerCase().includes('ai') ? 'Our AI solutions include custom models, predictive analytics, and machine learning implementations.' : ''}${query.toLowerCase().includes('xr') ? 'Our XR experiences provide immersive AR and VR applications for customer engagement and employee training.' : ''}${query.toLowerCase().includes('multimedia') ? 'Our multimedia content includes interactive presentations, data visualizations, and engaging digital storytelling.' : ''} Would you like more specific information about any of these services?`;
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response. Please check your API settings and try again.");
  }
};
