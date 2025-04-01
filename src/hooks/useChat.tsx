
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateResponse } from '@/services/chatService';
import { Message } from '@/components/chat/MessageItem';
import { Loader2 } from 'lucide-react';

// Sample messages that appear at the start of the chat
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

import { Button } from '@/components/ui/button';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: messageText
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
    
    setIsLoading(true);
    
    try {
      // Call the backend function to generate a response
      const responseText = await generateResponse(messageText);
      
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
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};
