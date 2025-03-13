
import React from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className={cn(
      "border-b border-border bg-card py-3 px-4 sticky top-0 z-50",
      "flex items-center justify-between"
    )}>
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          AO
        </div>
        <div>
          <h1 className="font-semibold text-lg">Alexander Oguso</h1>
          <p className="text-xs text-muted-foreground">Digital Transformation Consultancy</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Services
        </button>
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Case Studies
        </button>
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          About
        </button>
        <button className="text-sm font-medium text-primary hover:text-primary/90 transition-colors">
          Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
