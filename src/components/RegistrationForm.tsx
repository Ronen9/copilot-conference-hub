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

const RegistrationForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useRegistrationForm();
  const { language } = useLanguage();
  const t = translations[language];
  const [showClosedDialog, setShowClosedDialog] = useState(false);

  const handleClosedRegistration = () => {
    setShowClosedDialog(true);
  };

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

        <Button
          type="button"
          className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white py-3 rounded-lg opacity-50 cursor-not-allowed"
          onClick={handleClosedRegistration}
        >
          {isSubmitting ? t.submitting : t.submit}
        </Button>
      </form>

      <AlertDialog open={showClosedDialog} onOpenChange={setShowClosedDialog}>
        <AlertDialogContent className="bg-white dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              {t.registrationClosed}
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-gray-600 dark:text-gray-300">
              {t.registrationClosedMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegistrationForm;