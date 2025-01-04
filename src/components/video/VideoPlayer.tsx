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
            mute: 0,
            showinfo: 0,
            rel: 0, // Prevents showing related videos
            playsinline: 1,
            origin: window.location.origin,
            loop: 1, // Enable looping
            playlist: videoUrl, // Required for looping to work
            endscreen: 0 // Disable end screen
          },
        }}
        onReady={(event) => {
          const player = event.target;
          // Set initial volume
          player.setVolume(100);
          console.log('Player ready, setting initial volume:', player.getVolume());
          onPlayerReady(player);
        }}
        onEnd={onVideoEnd}
        className="w-full h-full"
      />
    </div>
  );
};