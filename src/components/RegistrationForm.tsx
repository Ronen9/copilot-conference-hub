import { Button } from "@/components/ui/button";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations/registrationForm";
import { FormFields } from "./registration/FormFields";

const RegistrationForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit, downloadCalendarFile } = useRegistrationForm();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#9b87f5]">{t.formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormFields 
          formData={formData}
          handleChange={handleChange}
          t={t}
          language={language}
        />

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white py-3 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.submitting : t.submit}
          </Button>

          <Button
            type="button"
            onClick={downloadCalendarFile}
            className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white py-3 rounded-lg"
          >
            {language === 'en' ? 'Download Calendar File' : 'הורד קובץ יומן'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;