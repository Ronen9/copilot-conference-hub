import { useState, useEffect } from 'react';

const videoEvents = new EventTarget();

export const useVideoControl = (videoUrl: string) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

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
    
    videoEvents.dispatchEvent(
      new CustomEvent('cardPlayed', { detail: { videoUrl } })
    );

    const setupAudio = async () => {
      try {
        player.playVideo();
        player.setVolume(volume);
        console.log('Initial volume set to:', volume);
        
        await new Promise(resolve => setTimeout(resolve, 50));
        
        player.unMute();
        console.log('Player unmuted, checking mute state:', player.isMuted());
        
        setIsMuted(false);
        setIsPlaying(true);
      } catch (error) {
        console.error('Error in setupAudio:', error);
      }
    };

    setupAudio();
  };

  const handleVolumeChange = (newVolume: number) => {
    if (player) {
      console.log('Setting volume to:', newVolume);
      player.setVolume(newVolume);
      setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        player.setVolume(volume);
        console.log('Unmuting, volume set to:', volume);
      } else {
        player.mute();
        console.log('Muting video');
      }
      setIsMuted(!isMuted);
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
    volume,
    handleClick,
    handleVideoEnd,
    handleVolumeChange,
    toggleMute,
    setPlayer
  };
};