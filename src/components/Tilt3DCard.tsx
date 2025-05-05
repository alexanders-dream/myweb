
import { useState, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
  tiltMaxAngle?: number;
  glareMaxOpacity?: number;
  glareEnable?: boolean;
  transitionSpeed?: number;
  scale?: number;
}

const Tilt3DCard = ({
  children,
  className,
  perspective = 1000,
  tiltMaxAngle = 15,
  glareMaxOpacity = 0.2,
  glareEnable = true,
  transitionSpeed = 400,
  scale = 1.05,
}: Tilt3DCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glarePos: { x: 0, y: 0 } });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate tilt based on mouse position relative to center
    const tiltX = (mouseY / (rect.height / 2)) * tiltMaxAngle;
    const tiltY = -((mouseX / (rect.width / 2)) * tiltMaxAngle);
    
    // Calculate glare position
    const glareX = (mouseX / rect.width) * 100;
    const glareY = (mouseY / rect.height) * 100;
    
    setTilt({
      x: tiltX,
      y: tiltY,
      glarePos: { x: glareX, y: glareY },
    });
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0, glarePos: { x: 0, y: 0 } });
  };
  
  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          transform: isHovering
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${scale}, ${scale}, ${scale})`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovering
            ? `transform ${transitionSpeed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
            : `transform ${transitionSpeed}ms ease-out`,
        }}
      >
        {children}
      </div>
      
      {glareEnable && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${tilt.glarePos.x}% ${tilt.glarePos.y}%, rgba(255,255,255,${glareMaxOpacity}), transparent)`
              : 'none',
            transition: `background ${transitionSpeed}ms ease-out`,
          }}
        />
      )}
    </div>
  );
};

export default Tilt3DCard;
