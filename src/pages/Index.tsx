import { useState } from 'react';
import YouTube from 'react-youtube';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SpeakerCard from '@/components/SpeakerCard';
import RegistrationForm from '@/components/RegistrationForm';
import AgendaSection from '@/components/AgendaSection';

const Index = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [player, setPlayer] = useState<any>(null);

  const speakerInfo = {
    name: "רונן ארנרייך",
    title: "CX Specialist",
    topic: "copilot sales & marketing",
    company: "Microsoft",
    videoUrl: "RYSQe4KkJkI"
  };

  const handleReady = (event: any) => {
    setPlayer(event.target);
    event.target.playVideo();
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D3748] text-white rtl">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0 overflow-hidden">
          <YouTube
            videoId="SaCVSUbYpVc"
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                showinfo: 0,
                rel: 0,
                loop: 1,
                playlist: 'SaCVSUbYpVc'
              },
            }}
            onReady={handleReady}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="bg-black/50 hover:bg-black/70"
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="bg-black/50 hover:bg-black/70"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#9b87f5] flex flex-col items-center gap-4">
          <span>דור חדש של פרודוקטיביות</span>
          <span>קופיילוט בשירות העובד המודרני</span>
        </h1>
      </div>

      {/* Speakers Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(5)].map((_, index) => (
            <SpeakerCard key={index} {...speakerInfo} />
          ))}
        </div>
      </div>

      {/* Agenda Section */}
      <AgendaSection />

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;