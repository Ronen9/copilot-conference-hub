import { HeroSection } from '@/components/hero/HeroSection';
import { SpeakersGrid } from '@/components/speaker/SpeakersGrid';
import RegistrationForm from '@/components/RegistrationForm';
import AgendaSection from '@/components/AgendaSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D3748] text-white rtl">
      <HeroSection />
      
      {/* Title Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex items-center justify-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#9b87f5] flex flex-col items-center gap-4">
            <span>דור חדש של פרודוקטיביות</span>
            <span>קופיילוט - מעצים את היכולות שלך</span>
          </h1>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Microsoft_365_Copilot_Icon.svg/2048px-Microsoft_365_Copilot_Icon.svg.png"
            alt="Copilot Logo"
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>

      {/* Speakers Title */}
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          מה בתוכנית? קבלו כמה מילים מהמרצים
        </h2>
      </div>

      <SpeakersGrid />
      <AgendaSection />

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;