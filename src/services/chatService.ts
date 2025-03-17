
import { supabase } from "@/integrations/supabase/client";
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

// Get AI settings from Supabase
export const getAiSettings = async (): Promise<AiSettings> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return getDefaultAiSettings();
    }
    
    const { data, error } = await supabase
      .from('ai_settings')
      .select('*')
      .eq('user_id', session.user.id)
      .single();
    
    if (error || !data) {
      console.error('Error loading AI settings:', error);
      return getDefaultAiSettings();
    }
    
    return {
      provider: data.provider as AiProvider,
      model: data.model,
      apiKey: data.api_key || '',
      temperature: data.temperature,
      maxTokens: data.max_tokens,
      ragEnabled: data.rag_enabled,
      systemPrompt: data.system_prompt
    };
  } catch (error) {
    console.error('Error loading AI settings:', error);
    return getDefaultAiSettings();
  }
};

// Set AI settings to Supabase
export const saveAiSettings = async (settings: AiSettings): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Not authenticated",
        description: "Please log in to save settings",
        variant: "destructive"
      });
      return false;
    }
    
    const { error } = await supabase
      .from('ai_settings')
      .update({
        provider: settings.provider,
        model: settings.model,
        api_key: settings.apiKey,
        temperature: settings.temperature,
        max_tokens: settings.maxTokens,
        rag_enabled: settings.ragEnabled,
        system_prompt: settings.systemPrompt
      })
      .eq('user_id', session.user.id);
    
    if (error) {
      console.error('Error saving AI settings:', error);
      toast({
        title: "Error",
        description: "Failed to save AI settings",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving AI settings:', error);
    return false;
  }
};

// Get documents from Supabase
export const getDocuments = async (): Promise<Document[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('knowledge_base_docs')
      .select('id, name, content, created_at')
      .eq('user_id', session.user.id);
    
    if (error) {
      console.error('Error loading documents:', error);
      return [];
    }
    
    return data.map(doc => ({
      id: doc.id,
      name: doc.name,
      size: doc.content.length,
      date: doc.created_at,
      type: getDocumentType(doc.name)
    }));
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

// Delete document from Supabase
export const deleteDocument = async (id: string): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Not authenticated",
        description: "Please log in to delete documents",
        variant: "destructive"
      });
      return false;
    }
    
    const { error } = await supabase
      .from('knowledge_base_docs')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);
    
    if (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};

// Upload document to Supabase via edge function
export const uploadDocument = async (name: string, content: string): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Not authenticated",
        description: "Please log in to upload documents",
        variant: "destructive"
      });
      return false;
    }
    
    const { data, error } = await supabase.functions.invoke('process-document', {
      body: {
        name,
        content
      }
    });
    
    if (error || !data.success) {
      console.error('Error uploading document:', error || data.error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error uploading document:', error);
    return false;
  }
};

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

// Helper functions
const getDefaultAiSettings = (): AiSettings => {
  return {
    provider: 'openai',
    model: 'gpt-4o-mini',
    apiKey: '',
    temperature: 0.7,
    maxTokens: 1000,
    ragEnabled: true,
    systemPrompt: "You are a helpful assistant for Alexander Oguso Digital Transformation Consultancy."
  };
};

const getDocumentType = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  const extensionMap: Record<string, string> = {
    'pdf': 'application/pdf',
    'txt': 'text/plain',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  
  return extensionMap[extension] || 'application/octet-stream';
};
