import { useState, useEffect } from 'react';

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
        console.log('Pausing other video:', videoUrl);
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
    if (!player) return;

    console.log('Starting click handler for video:', videoUrl);
    
    // Notify other videos to pause
    videoEvents.dispatchEvent(
      new CustomEvent('cardPlayed', { detail: { videoUrl } })
    );

    const setupAudio = async () => {
      try {
        // First ensure video is playing
        player.playVideo();
        
        // Set volume to 100 before unmuting
        player.setVolume(100);
        console.log('Volume set to:', player.getVolume());
        
        // Small delay to ensure volume is set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Unmute and update state
        player.unMute();
        console.log('Player unmuted, isMuted state:', player.isMuted());
        setIsMuted(false);
        setIsPlaying(true);
        
        // Force a volume update
        player.setVolume(100);
        console.log('Final volume check:', player.getVolume());
      } catch (error) {
        console.error('Error in setupAudio:', error);
      }
    };

    setupAudio();
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