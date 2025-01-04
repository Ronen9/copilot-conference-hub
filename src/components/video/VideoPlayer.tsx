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
  console.log('VideoPlayer render for:', videoUrl, 'isMuted:', isMuted);

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
            mute: 1, // Set initial mute state
            showinfo: 0,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
        }}
        onReady={(event) => {
          if (event.target && typeof event.target.setVolume === 'function') {
            // Set initial volume
            event.target.setVolume(100);
            console.log('Player ready, setting initial volume:', event.target.getVolume());
            onPlayerReady(event.target);
          } else {
            console.error('Player not properly initialized');
          }
        }}
        onEnd={onVideoEnd}
        className="w-full h-full"
      />
    </div>
  );
};