
import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

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
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background noise-bg">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse text-primary text-2xl font-bold">
              Alexander Oguso Digital Transformation
            </div>
          </div>
        ) : (
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};

export default Index;
