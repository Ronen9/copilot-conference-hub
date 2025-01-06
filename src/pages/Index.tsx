import { HeroSection } from '@/components/hero/HeroSection';
import { SpeakersGrid } from '@/components/speaker/SpeakersGrid';
import RegistrationForm from '@/components/RegistrationForm';
import AgendaSection from '@/components/AgendaSection';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const IndexContent = () => {
  const { language } = useLanguage();

  const titles = {
    en: {
      mainTitle1: "A New Era of Productivity",
      mainTitle2: "Copilot - Empowering Your Capabilities",
      speakersTitle: "What's in the Program? Click on our speakers' avatar"
    },
    he: {
      mainTitle1: "דור חדש של פרודוקטיביות",
      mainTitle2: "קופיילוט - מעצים את היכולות שלך",
      speakersTitle: "מה בתוכנית? קבלו כמה מילים מהמרצים"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D3748] text-white rtl">
      <div className="relative">
        <HeroSection />
        <LanguageToggle />
      </div>
      
      {/* Title Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex items-center justify-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#9b87f5] flex flex-col items-center gap-4">
            <span>{language === 'en' ? titles.en.mainTitle1 : titles.he.mainTitle1}</span>
            <span>{language === 'en' ? titles.en.mainTitle2 : titles.he.mainTitle2}</span>
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
          {language === 'en' ? titles.en.speakersTitle : titles.he.speakersTitle}
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

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;