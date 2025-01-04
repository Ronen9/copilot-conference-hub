import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Slider } from "@/components/ui/slider";

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
  const [localPlayer, setLocalPlayer] = useState<any>(null);

  useEffect(() => {
    if (localPlayer) {
      // Update progress every second while video is playing
      const interval = setInterval(() => {
        const currentTime = localPlayer.getCurrentTime();
        const videoDuration = localPlayer.getDuration();
        const progressPercentage = (currentTime / videoDuration) * 100;
        setProgress(progressPercentage);
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

  return (
    <div className="relative w-full pt-[56.25%]">
      <div className="absolute inset-0">
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
            setLocalPlayer(player);
            setDuration(player.getDuration());
            player.setVolume(100);
            console.log('Player ready, setting initial volume:', player.getVolume());
            onPlayerReady(player);
          }}
          onEnd={(event) => {
            console.log('Video ended, rewinding and pausing');
            const player = event.target;
            player.seekTo(0);
            player.pauseVideo();
            setProgress(0);
            onVideoEnd();
          }}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-black/50">
        <Slider
          value={[progress]}
          onValueChange={handleSliderChange}
          max={100}
          step={0.1}
          className="w-full"
        />
      </div>
    </div>
  );
};