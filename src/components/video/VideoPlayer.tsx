import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { VideoProgress } from './VideoProgress';
import { extractVideoId } from '@/utils/videoUtils';
import { Button } from '../ui/button';
import { Maximize2 } from 'lucide-react';

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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [localPlayer, setLocalPlayer] = useState<any>(null);

  useEffect(() => {
    if (localPlayer) {
      const interval = setInterval(() => {
        const current = localPlayer.getCurrentTime();
        const videoDuration = localPlayer.getDuration();
        const progressPercentage = (current / videoDuration) * 100;
        setProgress(progressPercentage);
        setCurrentTime(current);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [localPlayer]);

  const handleSliderChange = (value: number[]) => {
    if (localPlayer && duration) {
      const newTime = (value[0] / 100) * duration;
      localPlayer.seekTo(newTime);
      setProgress(value[0]);
    }
  };

  const handleFullscreen = () => {
    if (localPlayer) {
      localPlayer.playVideo();
      const iframe = document.querySelector(`iframe[src*="${videoId}"]`);
      if (iframe) {
        // @ts-ignore
        iframe.requestFullscreen?.() || iframe.webkitRequestFullscreen?.() || iframe.mozRequestFullScreen?.() || iframe.msRequestFullscreen?.();
      }
    }
  };

  const videoId = extractVideoId(videoUrl);
  console.log('Video URL:', videoUrl);
  console.log('Video ID extracted:', videoId);

  return (
    <div className="relative w-full pt-[56.25%]">
      <div className="absolute inset-0">
        <YouTube
          videoId={videoId}
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
              fs: 1,
              disablekb: 1,
              enablejsapi: 1,
              loop: 0,
              showsearch: 0,
              ecver: 2,
              playlist: videoId,
              related: 0,
              annotations: 0,
              cc_load_policy: 0,
              color: 'white',
              autohide: 1,
              widget_referrer: window.location.origin
            },
          }}
          onReady={(event) => {
            const player = event.target;
            setLocalPlayer(player);
            setDuration(player.getDuration());
            player.setVolume(100);
            console.log('Player ready, setting initial volume:', player.getVolume());
            onPlayerReady(player);
          }}
          onError={(error) => {
            console.error('YouTube Player Error:', error);
          }}
          onEnd={(event) => {
            console.log('Video ended, rewinding and pausing');
            const player = event.target;
            player.seekTo(0);
            player.pauseVideo();
            setProgress(0);
            onVideoEnd();
          }}
          className="absolute inset-0 w-full h-full !rounded-lg"
          iframeClassName="!rounded-lg"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-2 left-2 bg-black/50 hover:bg-black/70 text-white z-10"
        onClick={handleFullscreen}
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
      <VideoProgress
        duration={duration}
        currentTime={currentTime}
        progress={progress}
        onProgressChange={handleSliderChange}
      />
    </div>
  );
};