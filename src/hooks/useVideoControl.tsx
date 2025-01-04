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
    if (player) {
      // First, dispatch event to pause other videos
      videoEvents.dispatchEvent(
        new CustomEvent('cardPlayed', { detail: { videoUrl } })
      );
      
      console.log('Starting click handler sequence for:', videoUrl);
      
      // Set state first
      setIsMuted(false);
      setIsPlaying(true);
      
      // Then handle this video's playback with proper sequencing
      const playSequence = async () => {
        console.log('1. Unmuting video');
        player.unMute();
        
        console.log('2. Setting volume to 100');
        player.setVolume(100);
        
        // Give a longer delay to ensure unmute and volume changes take effect
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('3. Playing video');
        player.playVideo();
        
        console.log('4. Double checking mute state');
        const isMuted = player.isMuted();
        if (isMuted) {
          console.log('Still muted, forcing unmute again');
          player.unMute();
          player.setVolume(100);
        }
      };
      
      playSequence();
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