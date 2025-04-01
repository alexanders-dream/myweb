
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Plus, Mic, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const { user } = useAuth();

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
  );
};

export default ChatInput;
