
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  videoUrl: string;
  title?: string;
  className?: string;
  overlay?: boolean;
  children?: React.ReactNode;
}

const VideoBackground = ({ 
  videoUrl, 
  title, 
  className, 
  overlay = true, 
  children 
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Attempt to autoplay video
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
    
    // Handle visibility change to pause/play video when tab is hidden/visible
    const handleVisibilityChange = () => {
      if (videoRef.current) {
        if (document.hidden) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {overlay && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          {title && <h1 className="text-3xl md:text-5xl font-bold text-white">{title}</h1>}
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
