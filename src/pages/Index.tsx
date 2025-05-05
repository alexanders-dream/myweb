
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import ImmersiveHero from '@/components/ImmersiveHero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import CaseStudies from '@/components/CaseStudies';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

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
            <div className="flex-1 overflow-auto">
              <header className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-md bg-background/70 border-b border-border flex items-center justify-between">
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
              <div>
                <ImmersiveHero />
                
                <ScrollReveal>
                  <Services />
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                  <Portfolio />
                </ScrollReveal>
                
                <ScrollReveal delay={300}>
                  <CaseStudies />
                </ScrollReveal>
                
                <ScrollReveal delay={400}>
                  <Contact />
                </ScrollReveal>
                
                <Footer />
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};

export default Index;
