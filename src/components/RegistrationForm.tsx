import { Button } from "@/components/ui/button";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations/registrationForm";
import { FormFields } from "./registration/FormFields";

const RegistrationForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useRegistrationForm();
  const { language } = useLanguage();
  const t = translations[language];
  const isHebrew = language === 'he';

  return (
    <div className={`max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 ${isHebrew ? 'text-right' : 'text-left'}`}>
      <h2 className="text-3xl font-bold mb-8 text-center text-[#9b87f5]">{t.formTitle}</h2>
      
      {/* Registration Closed Message */}
      <div className="mb-8 p-6 bg-white/5 rounded-lg border border-[#9b87f5]/30 text-center animate-pulse shadow-[0_0_15px_rgba(155,135,245,0.3)] transition-shadow duration-1000">
        <h3 className="text-xl font-semibold mb-2 text-[#9b87f5] animate-glow">
          {t.registrationClosed}
        </h3>
        <p className="text-gray-300">
          {t.registrationClosedMessage}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" dir={isHebrew ? "rtl" : "ltr"}>
        <FormFields 
          formData={formData}
          handleChange={handleChange}
          t={t}
          language={language}
        />

        <Button
          type="button"
          className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white py-3 rounded-lg opacity-50 cursor-not-allowed"
          disabled={true}
        >
          {isSubmitting ? t.submitting : t.submit}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;