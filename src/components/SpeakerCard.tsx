import { VideoPlayer } from './video/VideoPlayer';
import { SpeakerInfo } from './speaker/SpeakerInfo';
import { useVideoControl } from '../hooks/useVideoControl';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface SpeakerCardProps {
  name: string;
  title: string;
  topic: string;
  company: string;
  videoUrl: string;
}

const SpeakerCard = ({ name, title, topic, company, videoUrl }: SpeakerCardProps) => {
  const {
    isHovering,
    setIsHovering,
    isMuted,
    player,
    isPlaying,
    volume,
    handleClick,
    handleVideoEnd,
    handleVolumeChange,
    toggleMute,
    setPlayer
  } = useVideoControl(videoUrl);

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        if (player) {
          player.pauseVideo();
          player.mute();
        }
      }}
      onClick={handleClick}
    >
      <VideoPlayer
        videoUrl={videoUrl}
        onPlayerReady={(event) => setPlayer(event.target)}
        isHovering={isHovering}
        isMuted={isMuted}
        onVideoEnd={handleVideoEnd}
      />
      <SpeakerInfo
        name={name}
        title={title}
        company={company}
        topic={topic}
      />
      {isPlaying && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 p-2 rounded-lg" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="hover:bg-white/10"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <div className="w-24">
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => handleVolumeChange(value[0])}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakerCard;