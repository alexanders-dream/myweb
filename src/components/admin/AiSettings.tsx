
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Info } from 'lucide-react';

type AiProvider = 'openai' | 'anthropic' | 'perplexity' | 'groq' | 'deepseek' | 'openrouter';

type AiSettings = {
  provider: AiProvider;
  model: string;
  apiKey: string;
  temperature: number;
  maxTokens: number;
  ragEnabled: boolean;
  systemPrompt: string;
};

// Model options for different providers
const modelOptions: Record<AiProvider, { value: string; label: string }[]> = {
  openai: [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'gpt-4o', label: 'GPT-4o' }
  ],
  anthropic: [
    { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
    { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
    { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' }
  ],
  perplexity: [
    { value: 'mixtral-8x7b-instruct', label: 'Mixtral 8x7B' },
    { value: 'llama-3-sonar-small-128k', label: 'Llama 3 Sonar Small' },
    { value: 'llama-3-sonar-large-128k', label: 'Llama 3 Sonar Large' }
  ],
  groq: [
    { value: 'llama-3-8b-8192', label: 'Llama 3 8B' },
    { value: 'llama-3-70b-8192', label: 'Llama 3 70B' },
    { value: 'gemma-7b-it', label: 'Gemma 7B IT' }
  ],
  deepseek: [
    { value: 'deepseek-coder', label: 'DeepSeek Coder' },
    { value: 'deepseek-llm-67b-chat', label: 'DeepSeek LLM 67B' }
  ],
  openrouter: [
    { value: 'openai/gpt-4o', label: 'OpenAI GPT-4o' },
    { value: 'anthropic/claude-3-opus', label: 'Anthropic Claude 3 Opus' },
    { value: 'meta-llama/llama-3-70b-instruct', label: 'Meta Llama 3 70B' },
    { value: 'mistralai/mistral-large', label: 'Mistral Large' }
  ]
};

// Default system prompt
const DEFAULT_SYSTEM_PROMPT = "You are a helpful assistant for Alexander Oguso Digital Transformation Consultancy. Provide accurate, concise information about our AI, XR, and multimedia services. Use the knowledge base to answer specific questions about our offerings, case studies, and expertise.";

const AiSettings = () => {
  const [settings, setSettings] = useState<AiSettings>(() => {
    const savedSettings = localStorage.getItem('aiSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      provider: 'openai',
      model: 'gpt-4o-mini',
      apiKey: '',
      temperature: 0.7,
      maxTokens: 1000,
      ragEnabled: true,
      systemPrompt: DEFAULT_SYSTEM_PROMPT
    };
  });
  
  const { toast } = useToast();

  const handleChange = (field: keyof AiSettings, value: string | number | boolean) => {
    if (field === 'provider') {
      // When provider changes, update the model to the first model of the new provider
      const newProvider = value as AiProvider;
      setSettings({
        ...settings,
        provider: newProvider,
        model: modelOptions[newProvider][0].value
      });
    } else {
      setSettings({ ...settings, [field]: value });
    }
  };

  const handleSave = () => {
    if (!settings.apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key for the selected provider.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would validate the API key with the provider
    localStorage.setItem('aiSettings', JSON.stringify(settings));
    
    toast({
      title: "Settings saved",
      description: "Your AI settings have been saved successfully."
    });
  };

  const handleResetSystemPrompt = () => {
    setSettings({
      ...settings,
      systemPrompt: DEFAULT_SYSTEM_PROMPT
    });
    
    toast({
      title: "System prompt reset",
      description: "The system prompt has been reset to the default."
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">AI Provider Settings</h2>
      
      <div className="p-4 border rounded-lg bg-muted/30 flex items-start space-x-3">
        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium">How this works:</p>
          <p className="text-muted-foreground mt-1">
            These settings control the AI that powers the chatbot on your website. The chatbot will use
            your knowledge base documents to provide relevant responses to user queries.
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider</Label>
            <Select
              value={settings.provider}
              onValueChange={(value) => handleChange('provider', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="perplexity">Perplexity</SelectItem>
                <SelectItem value="groq">Groq</SelectItem>
                <SelectItem value="deepseek">DeepSeek</SelectItem>
                <SelectItem value="openrouter">OpenRouter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select
              value={settings.model}
              onValueChange={(value) => handleChange('model', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions[settings.provider].map(model => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={settings.apiKey}
              onChange={(e) => handleChange('apiKey', e.target.value)}
              placeholder={`Enter your ${settings.provider} API key`}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              This API key will be stored in your browser's local storage.
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature">Temperature: {settings.temperature.toFixed(1)}</Label>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[settings.temperature]}
              onValueChange={(value) => handleChange('temperature', value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>More Precise</span>
              <span>More Creative</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="maxTokens">Max Response Length: {settings.maxTokens}</Label>
            </div>
            <Slider
              id="maxTokens"
              min={100}
              max={2000}
              step={100}
              value={[settings.maxTokens]}
              onValueChange={(value) => handleChange('maxTokens', value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Shorter</span>
              <span>Longer</span>
            </div>
          </div>
          
          <div className="pt-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ragEnabled"
                checked={settings.ragEnabled}
                onChange={(e) => handleChange('ragEnabled', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="ragEnabled" className="text-sm font-medium cursor-pointer">
                Enable document-based responses (RAG)
              </Label>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-6">
              When enabled, the AI will use your uploaded documents to provide more accurate and relevant responses.
            </p>
          </div>
        </div>
      </div>
      
      {/* System Prompt Section */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="systemPrompt">System Prompt</Label>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetSystemPrompt}
          >
            Reset to Default
          </Button>
        </div>
        <Textarea
          id="systemPrompt"
          value={settings.systemPrompt}
          onChange={(e) => handleChange('systemPrompt', e.target.value)}
          placeholder="Enter system instructions for the AI"
          className="min-h-[120px] font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground">
          The system prompt provides instructions to the AI about how it should respond. 
          This sets the tone and behavior of the chatbot.
        </p>
      </div>
      
      {!settings.apiKey && (
        <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900 rounded-lg flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-700 dark:text-yellow-400">API Key Required</p>
            <p className="text-yellow-600 dark:text-yellow-500 mt-1">
              Your chatbot won't be able to use the AI provider without a valid API key. In a real implementation, 
              this should be securely stored on the server-side.
            </p>
          </div>
        </div>
      )}
      
      <Button
        onClick={handleSave}
        className="mt-4"
      >
        Save Settings
      </Button>
    </div>
  );
};

export default AiSettings;
