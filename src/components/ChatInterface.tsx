
import React, { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send, Plus, Mic, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { generateResponse } from '@/services/chatService';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        // Call the backend function to generate a response
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
            {!user && (
              <div className="mt-1">
                <Button variant="link" asChild className="text-xs p-0 h-auto">
                  <a href="/login">Login</a>
                </Button>
                {' '}to enable full AI capabilities
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
