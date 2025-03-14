
import React from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  title: string;
}

const VideoBackground = ({ videoUrl, title }: VideoBackgroundProps) => {
  return (
    <div className="relative w-full h-[250px] md:h-[400px] mb-8 rounded-xl overflow-hidden">
      <iframe
        src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoUrl.split('/').pop()}&controls=0&showinfo=0&rel=0`}
        title={title}
        className="absolute top-0 left-0 w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">{title}</h1>
      </div>
    </div>
  );
};

export default VideoBackground;
