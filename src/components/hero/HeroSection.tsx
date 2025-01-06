import { useState } from 'react';
import YouTube from 'react-youtube';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [player, setPlayer] = useState<any>(null);

  const handleReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <YouTube
          videoId="SaCVSUbYpVc"
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              showinfo: 0,
              rel: 0,
              loop: 1,
              playlist: 'SaCVSUbYpVc',
              endscreen: 0,
              modestbranding: 1,
              iv_load_policy: 3,
              fs: 0,
              related: 0,
              annotations: 0,
              cc_load_policy: 0,
              color: 'white',
              autohide: 1,
              widget_referrer: window.location.origin,
              showsearch: 0,
              ecver: 2
            },
          }}
          onReady={handleReady}
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 scale-[1.5] object-cover"
        />
        <div className="absolute bottom-16 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="bg-black/50 hover:bg-black/70"
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="bg-black/50 hover:bg-black/70"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
        </div>
      </div>
    </div>
  );
};