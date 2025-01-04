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
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
            endscreen: 0,
            iv_load_policy: 3,
            fs: 0,
            disablekb: 1,
            enablejsapi: 1,
            loop: 0,
            showsearch: 0,
            ecver: 2,
            playlist: videoUrl,
            related: 0,
            annotations: 0
          },
        }}
        onReady={(event) => {
          const player = event.target;
          // Set initial volume
          player.setVolume(100);
          console.log('Player ready, setting initial volume:', player.getVolume());
          onPlayerReady(player);
        }}
        onEnd={(event) => {
          console.log('Video ended, rewinding and pausing');
          const player = event.target;
          player.seekTo(0);
          player.pauseVideo();
          onVideoEnd();
        }}
        className="w-full h-full"
      />
    </div>
  );
};