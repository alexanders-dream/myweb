
import React, { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, Plus, Mic, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'system';
  content: React.ReactNode;
  isLoading?: boolean;
}

const sampleMessages: Message[] = [
  {
    id: '1',
    type: 'system',
    content: (
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold">Welcome to Alexander Oguso Digital Transformation</h2>
        <p>We leverage cutting-edge AI, XR, and multimedia solutions to help businesses innovate, adapt, and thrive in an increasingly digital world.</p>
        <ul className="list-disc list-inside space-y-4 pl-5">
          <li className="pl-2">
            <strong>AI Solutions:</strong> Custom AI models, predictive analytics, and machine learning implementations tailored to your business needs.
          </li>
          <li className="pl-2">
            <strong>XR Experiences:</strong> Immersive AR and VR applications that transform how you engage with customers and train employees.
          </li>
          <li className="pl-2">
            <strong>Multimedia Content:</strong> Interactive presentations, data visualizations, and engaging digital content that tells your story.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: '2',
    type: 'system',
    content: (
      <div>
        <h3 className="text-lg font-semibold mb-3">How can I help you today?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
            Tell me about your services
          </Button>
          <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
            Show me your case studies
          </Button>
          <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
            How do we get started?
          </Button>
          <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
            Book a consultation call
          </Button>
        </div>
      </div>
    )
  }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Get AI settings from localStorage (will be set in admin panel)
  const getAiSettings = () => {
    try {
      const aiSettings = localStorage.getItem('aiSettings');
      return aiSettings ? JSON.parse(aiSettings) : {
        provider: 'openai',
        model: 'gpt-4o-mini',
        apiKey: '',
        temperature: 0.7,
        maxTokens: 1000
      };
    } catch (error) {
      console.error('Error loading AI settings:', error);
      return {
        provider: 'openai',
        model: 'gpt-4o-mini',
        apiKey: '',
        temperature: 0.7,
        maxTokens: 1000
      };
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = async (query: string) => {
    // This is a simulated RAG response for now
    // In a real implementation, this would connect to an API
    // that would perform RAG using the admin-uploaded documents
    
    const aiSettings = getAiSettings();
    
    if (!aiSettings.apiKey) {
      // For demonstration - in a real app, this would connect to a backend API
      return `I'd provide information based on the company documents, but the AI service needs to be configured in the admin panel first. (This is a simulated response - in production, this would use ${aiSettings.provider} with the ${aiSettings.model} model to analyze documents uploaded by the admin.)`;
    }
    
    // Simulate RAG processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Sample responses based on common queries
    const responses: Record<string, string> = {
      "services": "Based on our documentation, we offer AI Solutions, XR Development, and Multimedia Production services. Our AI Solutions include custom machine learning models and predictive analytics tailored to your business needs.",
      "portfolio": "Our portfolio includes several case studies across different industries. For example, we developed an AR training solution for a manufacturing company that reduced training time by 40%.",
      "contact": "You can contact our team via email at contact@alexanderoguso.com or schedule a consultation call through our contact page.",
      "pricing": "Our pricing is customized based on project requirements. We offer tailored solutions with flexible engagement models including project-based, retainer, and outcome-based pricing.",
      "default": "I've searched our knowledge base for information related to your query. Our team would be happy to provide more specific details. Would you like to schedule a consultation call to discuss your needs in detail?"
    };
    
    // Find the most relevant response or use default
    for (const [key, response] of Object.entries(responses)) {
      if (query.toLowerCase().includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  };

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        type: 'user' as const,
        content: inputValue
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Add a loading message
      const loadingMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: loadingMessageId,
        type: 'system',
        content: (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Searching knowledge base...</span>
          </div>
        ),
        isLoading: true
      }]);
      
      setInputValue('');
      setIsLoading(true);
      
      try {
        // Generate RAG response
        const responseText = await generateResponse(inputValue);
        
        // Replace the loading message with the actual response
        setMessages(prev => prev.map(msg => 
          msg.id === loadingMessageId 
            ? {
                id: loadingMessageId,
                type: 'system',
                content: responseText
              } 
            : msg
        ));
      } catch (error) {
        console.error('Error generating response:', error);
        
        // Replace loading message with error
        setMessages(prev => prev.map(msg => 
          msg.id === loadingMessageId 
            ? {
                id: loadingMessageId,
                type: 'system',
                content: "I'm sorry, I couldn't process your request. Please try again."
              } 
            : msg
        ));
        
        toast({
          title: "Error",
          description: "Failed to generate a response. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-3xl mx-auto",
              message.type === 'user' 
                ? "ml-auto mr-4 bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none" 
                : "mr-auto ml-4 p-4"
            )}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-3xl mx-auto flex flex-col space-y-2">
          <div className="relative">
            <div className="absolute left-3 top-3">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our digital transformation services..."
              className="pl-12 pr-12 py-6 bg-background"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-3 flex space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Alexander Oguso Digital Transformation Consultancy • Powering the future through innovation
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
