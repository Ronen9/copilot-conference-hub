import { useState, useEffect } from 'react';

// Create a simple event system to coordinate between cards
const videoEvents = new EventTarget();

export const useVideoControl = (videoUrl: string) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleOtherCardPlay = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.videoUrl !== videoUrl && player) {
        console.log('Another card is playing, stopping this video:', videoUrl);
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

  const handleClick = () => {
    if (player) {
      console.log('Card clicked, playing video:', videoUrl);
      videoEvents.dispatchEvent(
        new CustomEvent('cardPlayed', { detail: { videoUrl } })
      );
      
      // Add a small delay before unmuting and setting volume
      setTimeout(() => {
        player.unMute();
        player.setVolume(100);
        console.log('Unmuting and setting volume after delay');
        setIsMuted(false);
      }, 100);

      player.playVideo();
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    if (player) {
      player.seekTo(0);
      if (!isMuted) {
        player.playVideo();
      }
    }
  };

  return {
    isHovering,
    setIsHovering,
    isMuted,
    player,
    isPlaying,
    handleClick,
    handleVideoEnd,
    setPlayer
  };
};