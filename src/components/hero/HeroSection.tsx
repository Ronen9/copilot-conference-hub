import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Initialize YouTube Player API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube API Ready');
      new window.YT.Player(iframeRef.current!, {
        events: {
          onReady: (event) => {
            console.log('Player ready');
            event.target.playVideo();
            event.target.mute();
          }
        }
      });
    };
  }, []);

  const toggleMute = () => {
    if (iframeRef.current) {
      const message = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: message }), 
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (iframeRef.current) {
      const message = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: message }), 
        '*'
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-[60vh] w-full">
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/SaCVSUbYpVc?si=pZN0oEiKA8JMI-J1&enablejsapi=1&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=SaCVSUbYpVc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 w-full h-full"
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