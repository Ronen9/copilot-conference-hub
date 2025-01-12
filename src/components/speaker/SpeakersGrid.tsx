import SpeakerCard from '../SpeakerCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { speakers } from '@/config/speakers';

export const SpeakersGrid = () => {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {speakers[language].map((speaker, index) => (
          <SpeakerCard key={index} {...speaker} />
        ))}
      </div>
    </div>
  );
};