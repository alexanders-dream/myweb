
import React from 'react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  type: 'user' | 'system';
  content: React.ReactNode;
  isLoading?: boolean;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div
      className={cn(
        "max-w-3xl mx-auto",
        message.type === 'user' 
          ? "ml-auto mr-4 bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none" 
          : "mr-auto ml-4 p-4"
      )}
    >
      {message.content}
    </div>
  );
};

export default MessageItem;
