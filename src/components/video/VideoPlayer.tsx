import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoUrl: string;
  onPlayerReady: (player: any) => void;
  isHovering: boolean;
  isMuted: boolean;
  onVideoEnd: () => void;
}

export const VideoPlayer = ({ 
  videoUrl, 
  onPlayerReady, 
  isHovering, 
  isMuted, 
  onVideoEnd 
}: VideoPlayerProps) => {
  return (
    <div className="aspect-video w-full">
      <YouTube
        videoId={videoUrl}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: isHovering ? 1 : 0,
            controls: 0,
            mute: 1,
            showinfo: 0,
            rel: 0,
            playsinline: 1,
          },
        }}
        onReady={onPlayerReady}
        onEnd={onVideoEnd}
        className="w-full h-full"
      />
    </div>
  );
};