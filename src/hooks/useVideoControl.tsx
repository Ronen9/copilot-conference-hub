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
        setIsHovering(false);
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
      // Notify other cards to stop
      videoEvents.dispatchEvent(
        new CustomEvent('cardPlayed', { detail: { videoUrl } })
      );
      
      // Play this video
      player.playVideo();
      setIsPlaying(true);
      
      // Add a small delay before unmuting to ensure smooth transition
      setTimeout(() => {
        player.unMute();
        player.setVolume(100);
        console.log('Unmuting and setting volume after delay');
        setIsMuted(false);
      }, 100);
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