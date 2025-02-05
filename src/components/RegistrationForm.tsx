import { Button } from "@/components/ui/button";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations/registrationForm";
import { FormFields } from "./registration/FormFields";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const RegistrationForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useRegistrationForm();
  const { language } = useLanguage();
  const t = translations[language];
  const isHebrew = language === 'he';

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 ${isHebrew ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl font-bold mb-8 text-center text-[#9b87f5]">{t.formTitle}</h2>
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
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg"
        dir={isHebrew ? "rtl" : "ltr"}
      >
        <h3 className="text-xl font-semibold mb-2">
          {t.registrationClosed}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t.registrationClosedMessage}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default RegistrationForm;