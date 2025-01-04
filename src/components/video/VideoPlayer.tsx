import YouTube from 'react-youtube';

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
  console.log('VideoPlayer render for:', videoUrl, 'isMuted:', isMuted);
  
  const handleReady = (event: any) => {
    const player = event.target;
    player.setVolume(100);
    console.log('Player ready, setting initial volume:', player.getVolume());
    onPlayerReady(player);
  };

  return (
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
            playsinline: 1,
            iv_load_policy: 3,
            modestbranding: 1
          },
        }}
        onReady={handleReady}
        onEnd={onVideoEnd}
        className="w-full h-full"
      />
    </div>
  );
};