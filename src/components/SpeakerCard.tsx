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
          console.log('Mouse entered card, playing video');
          player.playVideo();
        }
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        if (player) {
          player.pauseVideo();
          setIsPlaying(false);
          console.log('Mouse left card, pausing video');
        }
      }}
      onClick={handleClick}
    >
      <VideoPlayer
        videoUrl={videoUrl}
        onPlayerReady={(event) => {
          console.log('Player ready, setting up initial state');
          if (event) {
            setPlayer(event);
          }
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