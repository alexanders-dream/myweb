
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-md',
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-black/60 shadow-sm border-b border-gray-200/20' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 z-50">
          <span className="text-xl md:text-2xl font-bold tracking-tighter">
            Alexander Oguso
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="link-hover-effect text-sm font-medium py-2">Services</a>
          <a href="#case-studies" className="link-hover-effect text-sm font-medium py-2">Case Studies</a>
          <a href="#about" className="link-hover-effect text-sm font-medium py-2">About</a>
          <a href="#contact" className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-full text-sm font-medium transition-colors">
            Connect
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span 
              className={cn(
                "absolute w-full h-0.5 bg-foreground transition-all duration-300 ease-out",
                isMobileMenuOpen ? "top-2 -rotate-45" : "top-0"
              )}
            />
            <span 
              className={cn(
                "absolute w-full h-0.5 bg-foreground top-2 transition-all duration-300 ease-out",
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span 
              className={cn(
                "absolute w-full h-0.5 bg-foreground transition-all duration-300 ease-out",
                isMobileMenuOpen ? "top-2 rotate-45" : "top-4"
              )}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed inset-0 flex flex-col items-center justify-center bg-background backdrop-blur-lg transition-all duration-500 ease-in-out z-40",
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          <nav className="flex flex-col items-center space-y-8 py-8">
            <a 
              href="#services" 
              className="text-2xl font-medium" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#case-studies" 
              className="text-2xl font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Case Studies
            </a>
            <a 
              href="#about" 
              className="text-2xl font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-2xl font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
