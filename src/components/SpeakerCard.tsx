import { VideoPlayer } from './video/VideoPlayer';
import { SpeakerInfo } from './speaker/SpeakerInfo';
import { useState } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SpeakerCardProps {
  name: string;
  title: string;
  topic: string;
  company: string;
  videoUrl: string;
}

const SpeakerCard = ({ name, title, topic, company, videoUrl }: SpeakerCardProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const handlePlayerReady = (event: any) => {
    console.log('Player ready');
    setPlayer(event.target);
  };

  const toggleMute = () => {
    console.log('Toggling mute');
    if (player) {
      if (isMuted) {
        console.log('Unmuting video');
        player.unMute();
        player.setVolume(100);
      } else {
        console.log('Muting video');
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    console.log('Toggling play/pause');
    if (player) {
      if (isPlaying) {
        console.log('Pausing video');
        player.pauseVideo();
      } else {
        console.log('Playing video');
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    if (player) {
      player.seekTo(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">
      <VideoPlayer
        videoUrl={videoUrl}
        onPlayerReady={handlePlayerReady}
        isMuted={isMuted}
        onVideoEnd={handleVideoEnd}
      />
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
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
      <SpeakerInfo
        name={name}
        title={title}
        company={company}
        topic={topic}
      />
    </div>
  );
};

export default SpeakerCard;