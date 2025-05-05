
import { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 800,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const alreadyRevealed = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !alreadyRevealed.current)) {
          if (elementRef.current) {
            elementRef.current.style.opacity = '1';
            elementRef.current.style.transform = 'translate3d(0, 0, 0)';
            alreadyRevealed.current = true;
          }
        } else if (!entry.isIntersecting && !once && alreadyRevealed.current) {
          if (elementRef.current) {
            elementRef.current.style.opacity = '0';
            
            switch (direction) {
              case 'up':
                elementRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
                break;
              case 'down':
                elementRef.current.style.transform = `translate3d(0, -${distance}px, 0)`;
                break;
              case 'left':
                elementRef.current.style.transform = `translate3d(${distance}px, 0, 0)`;
                break;
              case 'right':
                elementRef.current.style.transform = `translate3d(-${distance}px, 0, 0)`;
                break;
              case 'none':
                elementRef.current.style.transform = 'translate3d(0, 0, 0)';
                break;
            }
            
            alreadyRevealed.current = false;
          }
        }
      },
      { threshold }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [direction, distance, once, threshold]);
  
  // Set initial styles
  let initialTransform = 'translate3d(0, 0, 0)';
  switch (direction) {
    case 'up':
      initialTransform = `translate3d(0, ${distance}px, 0)`;
      break;
    case 'down':
      initialTransform = `translate3d(0, -${distance}px, 0)`;
      break;
    case 'left':
      initialTransform = `translate3d(${distance}px, 0, 0)`;
      break;
    case 'right':
      initialTransform = `translate3d(-${distance}px, 0, 0)`;
      break;
  }
  
  const styles = {
    opacity: 0,
    transform: initialTransform,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  };
  
  return (
    <div ref={elementRef} style={styles} className={cn("", className)}>
      {children}
    </div>
  );
};

export default ScrollReveal;
