
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';

const PortfolioPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1">
            <Portfolio />
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PortfolioPage;
