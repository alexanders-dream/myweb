
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

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
            <div className="flex-1 overflow-hidden flex flex-col">
              <header className="p-4 border-b border-border flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-primary">
                  Alexander Oguso
                </Link>
                <nav className="flex items-center space-x-4">
                  <Link to="/">
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Home
                    </Button>
                  </Link>
                </nav>
              </header>
              <div className="flex-1 overflow-hidden">
                <ChatInterface />
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};

export default Index;
