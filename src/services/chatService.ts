
import { supabase } from "@/integrations/supabase/client";
import { AiProvider } from "./aiSettings";

// Generate response from AI via edge function
export const generateResponse = async (query: string): Promise<string> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // If not logged in, return a simulated response
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `I'd provide information based on the company documents, but you need to be logged in first.`;
    }
    
    // Generate a session ID if there isn't one already
    const sessionId = localStorage.getItem('chatSessionId') || `session-${Date.now()}`;
    localStorage.setItem('chatSessionId', sessionId);
    
    const { data, error } = await supabase.functions.invoke('generate-chat-response', {
      body: {
        query,
        sessionId
      }
    });
    
    if (error) {
      console.error('Error generating response:', error);
      throw new Error("Failed to generate response. Please check your API settings and try again.");
    }
    
    return data.response || "Sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response. Please check your API settings and try again.");
  }
};

// Re-export types from other modules for backward compatibility
export type { AiSettings } from "./aiSettings";
export type { Document } from "./documentService";
export type { AiProvider };

// Re-export functions from other modules for backward compatibility
export { getAiSettings, saveAiSettings, getDefaultAiSettings } from "./aiSettings";
export { getDocuments, deleteDocument, uploadDocument } from "./documentService";
