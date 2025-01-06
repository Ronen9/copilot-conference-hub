import { Toggle } from "@/components/ui/toggle";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute left-4 -bottom-16 z-10">
      <Toggle
        pressed={language === 'en'}
        onPressedChange={(pressed) => setLanguage(pressed ? 'en' : 'he')}
        className="data-[state=on]:bg-[#9b87f5] data-[state=off]:bg-[#9b87f5] px-6"
      >
        {language === 'en' ? 'שנה שפה לעברית' : 'Change to English'}
      </Toggle>
    </div>
  );
};