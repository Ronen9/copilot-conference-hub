import { useState } from 'react';
import YouTube from 'react-youtube';

interface SpeakerCardProps {
  name: string;
  title: string;
  topic: string;
  company: string;
  videoUrl: string;
}

const SpeakerCard = ({ name, title, topic, company, videoUrl }: SpeakerCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsMuted(true);
      }}
      onClick={() => setIsMuted(!isMuted)}
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
              mute: isMuted ? 1 : 0,
              showinfo: 0,
              rel: 0,
            },
          }}
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