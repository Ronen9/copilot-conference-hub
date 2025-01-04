import { VideoPlayer } from './video/VideoPlayer';
import { SpeakerInfo } from './speaker/SpeakerInfo';
import { useVideoControl } from '../hooks/useVideoControl';

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
    handleClick,
    handleVideoEnd,
    setPlayer,
    setIsPlaying
  } = useVideoControl(videoUrl);

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => {
        setIsHovering(true);
        if (player && !isPlaying) {
          player.mute();
          player.playVideo();
          console.log('Mouse entered card, playing muted video');
        }
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        if (player) {
          player.pauseVideo();
          player.mute();
          setIsPlaying(false);
          console.log('Mouse left card, pausing video and muting');
        }
      }}
      onClick={handleClick}
    >
      <VideoPlayer
        videoUrl={videoUrl}
        onPlayerReady={(event) => {
          console.log('Player ready, setting up initial state');
          setPlayer(event.target);
          event.target.mute();
        }}
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
    </div>
  );
};

export default SpeakerCard;