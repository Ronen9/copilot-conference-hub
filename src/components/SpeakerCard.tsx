import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

interface SpeakerCardProps {
  name: string;
  title: string;
  topic: string;
  company: string;
  videoUrl: string;
}

// Create a simple event system to coordinate between cards
const videoEvents = new EventTarget();

const SpeakerCard = ({ name, title, topic, company, videoUrl }: SpeakerCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Listen for other cards being played
    const handleOtherCardPlay = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.videoUrl !== videoUrl && player) {
        player.pauseVideo();
        player.mute();
        setIsMuted(true);
        setIsPlaying(false);
      }
    };

    videoEvents.addEventListener('cardPlayed', handleOtherCardPlay);
    return () => {
      videoEvents.removeEventListener('cardPlayed', handleOtherCardPlay);
    };
  }, [player, videoUrl]);

  const handleReady = (event: any) => {
    setPlayer(event.target);
    event.target.mute();
  };

  const handleVideoEnd = () => {
    if (player) {
      player.seekTo(0);
      if (!isMuted) {
        player.playVideo();
      }
    }
  };

  const handleClick = () => {
    if (player) {
      // Notify other cards to stop
      videoEvents.dispatchEvent(
        new CustomEvent('cardPlayed', { detail: { videoUrl } })
      );
      
      // Always unmute and play when clicked
      player.unMute();
      player.setVolume(100);
      player.playVideo();
      setIsMuted(false);
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        if (player && isMuted) {
          player.pauseVideo();
          setIsPlaying(false);
        }
      }}
      onClick={handleClick}
    >
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
          onReady={handleReady}
          onEnd={handleVideoEnd}
          className="w-full h-full"
        />
      </div>
      <div className="p-4 text-right">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-[#9b87f5] mb-1">{title}</p>
        <p className="text-gray-300 mb-1">{company}</p>
        <p className="text-sm text-gray-400">{topic}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;