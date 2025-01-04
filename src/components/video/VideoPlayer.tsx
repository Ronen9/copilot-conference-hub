import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoUrl: string;
  onPlayerReady: (player: any) => void;
  isMuted: boolean;
  onVideoEnd: () => void;
}

export const VideoPlayer = ({ 
  videoUrl, 
  onPlayerReady, 
  isMuted,
  onVideoEnd 
}: VideoPlayerProps) => {
  console.log('VideoPlayer render, isMuted:', isMuted);
  
  return (
    <div className="aspect-video w-full">
      <YouTube
        videoId={videoUrl}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 0,
            controls: 0,
            mute: isMuted ? 1 : 0,
            showinfo: 0,
            rel: 0,
            playsinline: 1,
          },
        }}
        onReady={onPlayerReady}
        onEnd={onVideoEnd}
        className="w-full h-full"
      />
    </div>
  );
};