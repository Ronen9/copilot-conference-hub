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
        // First ensure video is playing and volume is set
        player.playVideo();
        
        // Set initial volume
        player.setVolume(100);
        console.log('Initial volume set to:', player.getVolume());
        
        // Small delay before unmuting
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Unmute and verify
        player.unMute();
        console.log('Player unmuted, checking mute state:', player.isMuted());
        
        // Set volume again after unmuting
        player.setVolume(100);
        console.log('Volume after unmute:', player.getVolume());
        
        // Update state
        setIsMuted(false);
        setIsPlaying(true);
        
        // Final volume check and set
        const currentVolume = player.getVolume();
        if (currentVolume !== 100) {
          console.log('Volume not at 100, setting again. Current:', currentVolume);
          player.setVolume(100);
        }
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