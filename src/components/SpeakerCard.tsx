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
    setPlayer
  } = useVideoControl(videoUrl);

  return (
    <div
      className="relative rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer w-full aspect-video"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        if (player && isMuted) {
          player.pauseVideo();
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
    </div>
  );
};

export default SpeakerCard;