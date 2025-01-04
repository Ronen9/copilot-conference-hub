import { HeroSection } from '@/components/hero/HeroSection';
import { SpeakersGrid } from '@/components/speaker/SpeakersGrid';
import RegistrationForm from '@/components/RegistrationForm';
import AgendaSection from '@/components/AgendaSection';

const Index = () => {
  const speakerInfo = {
    name: "אורי הוסיט",
    title: "Modern Work Specialists Manager",
    topic: "copilot 365",
    company: "Microsoft",
    videoUrl: "L38GrkE3H3A"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D3748] text-white rtl">
      <HeroSection />
      
      {/* Title Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#9b87f5] flex flex-col items-center gap-4">
          <span>דור חדש של פרודוקטיביות</span>
          <span>קופיילוט בשירות העובד המודרני</span>
        </h1>
      </div>

      <SpeakersGrid speakerInfo={speakerInfo} />
      <AgendaSection />

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;