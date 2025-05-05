
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className={cn(
      "border-b border-border bg-card py-3 px-4 sticky top-0 z-50",
      "flex items-center justify-between"
    )}>
      <Link to="/" className="flex items-center space-x-2">
        <div className="h-8 w-8 overflow-hidden rounded-md">
          <img 
            src="/lovable-uploads/060b31f6-ea45-490a-89da-eb7c894826d8.png" 
            alt="Alexander Oguso Logo" 
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-semibold text-lg">Alexander Oguso</h1>
          <p className="text-xs text-muted-foreground">Digital Transformation Consultancy</p>
        </div>
      </Link>
      <ThemeToggle />
    </header>
  );
};

export default Header;
