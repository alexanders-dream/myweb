
import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a short loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background noise-bg">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-primary text-2xl font-bold">
            Alexander Oguso Digital Transformation
          </div>
        </div>
      ) : (
        <ChatInterface />
      )}
    </div>
  );
};

export default Index;
