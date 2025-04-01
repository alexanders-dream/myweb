
import React from 'react';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import { useChat } from '@/hooks/useChat';

const ChatInterface = () => {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden bg-background">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
