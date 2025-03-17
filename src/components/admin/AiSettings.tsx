
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { AiSettings as AiSettingsType, getAiSettings, saveAiSettings } from '@/services/chatService';

const AiSettings = () => {
  const [settings, setSettings] = useState<AiSettingsType>({
    provider: 'openai',
    model: 'gpt-4o-mini',
    apiKey: '',
    temperature: 0.7,
    maxTokens: 1000,
    ragEnabled: true,
    systemPrompt: "You are a helpful assistant for Alexander Oguso Digital Transformation Consultancy."
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const loadedSettings = await getAiSettings();
        setSettings(loadedSettings);
      } catch (error) {
        console.error('Error loading AI settings:', error);
        toast({
          title: 'Error loading settings',
          description: 'Failed to load your AI settings.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, [toast]);
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await saveAiSettings(settings);
      
      if (success) {
        toast({
          title: 'Settings saved',
          description: 'Your AI settings have been updated.',
        });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleChange = (field: keyof AiSettingsType, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Map of available models by provider
  const modelsByProvider: Record<string, string[]> = {
    openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'],
    anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    perplexity: ['perplexity-online', 'perplexity-7b'],
    groq: ['llama-3-8b', 'mixtral-8x7b'],
    deepseek: ['deepseek-coder', 'deepseek-llm'],
    openrouter: ['openrouter-mix', 'openrouter-openai', 'openrouter-anthropic'],
  };
  
  // If not authenticated, show message
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Please log in to manage your AI settings.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Settings</CardTitle>
          <CardDescription>
            Please wait while we load your AI settings...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">AI Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>LLM Configuration</CardTitle>
          <CardDescription>
            Configure the Large Language Model (LLM) for your AI assistant.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider</Label>
            <Select 
              value={settings.provider} 
              onValueChange={(value) => {
                handleChange('provider', value);
                // Reset model to first available model when provider changes
                handleChange('model', modelsByProvider[value][0]);
              }}
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
                {modelsByProvider[settings.provider]?.map(model => (
                  <SelectItem key={model} value={model}>
                    {model}
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
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored securely and never shared.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Response Settings</CardTitle>
          <CardDescription>
            Configure how the AI generates responses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="temperature">Temperature: {settings.temperature.toFixed(1)}</Label>
                <p className="text-xs text-muted-foreground">
                  Higher values make responses more creative, lower values make them more predictable.
                </p>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={(value) => handleChange('temperature', value[0])}
                className="w-1/2"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maxTokens">Max Tokens: {settings.maxTokens}</Label>
                <p className="text-xs text-muted-foreground">
                  Maximum number of tokens to generate in a response.
                </p>
              </div>
              <Slider
                id="maxTokens"
                min={100}
                max={4000}
                step={100}
                value={[settings.maxTokens]}
                onValueChange={(value) => handleChange('maxTokens', value[0])}
                className="w-1/2"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="ragEnabled"
                checked={settings.ragEnabled}
                onCheckedChange={(value) => handleChange('ragEnabled', value)}
              />
              <Label htmlFor="ragEnabled">Enable Retrieval Augmented Generation (RAG)</Label>
            </div>
            <p className="text-xs text-muted-foreground">
              When enabled, the AI will reference your knowledge base documents to provide more accurate responses.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>System Prompt</CardTitle>
          <CardDescription>
            Define the AI's personality and behavior through the system prompt.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={settings.systemPrompt}
            onChange={(e) => handleChange('systemPrompt', e.target.value)}
            rows={5}
            placeholder="Enter a system prompt to guide the AI's behavior"
          />
          <p className="text-xs text-muted-foreground mt-2">
            The system prompt sets the context and behavior for the AI. Be specific about your brand voice and how you want it to respond.
          </p>
        </CardContent>
      </Card>
      
      <Button 
        onClick={handleSave} 
        className="w-full" 
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
};

export default AiSettings;
