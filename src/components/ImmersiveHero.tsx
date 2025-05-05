
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import VideoBackground from './VideoBackground';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const ImmersiveHero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const heroRef = useRef<HTMLElement>(null);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      
      // Calculate opacity based on scroll - fade out as user scrolls
      if (position < heroHeight) {
        const opacity = 1 - (position / (heroHeight * 0.8));
        setVideoOpacity(Math.max(opacity, 0));
        setScrollPosition(position);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.3}px)`,
  };
  
  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      <VideoBackground 
        videoUrl="https://player.vimeo.com/external/517090787.hd.mp4?s=6cf26404a799e457a5668b5b327d030745d41432&profile_id=175" 
        className="h-screen"
        overlay={false}
      >
        {/* Video overlay with adjustable opacity */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" 
          style={{ opacity: videoOpacity }}
        ></div>
      </VideoBackground>
      
      {/* Content */}
      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto text-center" style={parallaxStyle}>
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-sm font-medium animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Digital Transformation Consultancy
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 text-white animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <span className="block">Transform Your Business</span>
            <span className="block mt-2 gradient-text from-primary to-white">
              For The Digital Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            We leverage cutting-edge AI, XR, and multimedia solutions to help businesses innovate, adapt, and thrive in an increasingly digital world.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            <a href="#contact" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-lg">
              Start Your Transformation
            </a>
            <a href="#services" className="w-full sm:w-auto text-white hover:text-primary flex items-center justify-center px-8 py-3 space-x-2 transition-colors">
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity text-white">
          <span className="sr-only">Scroll down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
      
      {/* Scroll progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 z-50">
        <Slider
          defaultValue={[0]}
          max={100}
          step={1}
          value={[scrollPosition / (document.body.scrollHeight - window.innerHeight) * 100 || 0]}
          className="cursor-default pointer-events-none"
        />
      </div>
    </section>
  );
};

export default ImmersiveHero;
