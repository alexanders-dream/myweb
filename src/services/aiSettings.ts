
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

// Helper functions
export const getDefaultAiSettings = (): AiSettings => {
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
