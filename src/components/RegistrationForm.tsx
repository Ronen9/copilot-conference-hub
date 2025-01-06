import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import { useLanguage } from "@/contexts/LanguageContext";

const RegistrationForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useRegistrationForm();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: "Event Registration",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      title: "Title",
      vehicleNumber: "Vehicle Number",
      parkingHint: "For parking arrangements",
      submit: "Register for Event",
      submitting: "Registering..."
    },
    he: {
      title: "הרשמה לאירוע",
      fullName: "שם מלא",
      email: "אימייל",
      phone: "טלפון",
      company: "חברה",
      title: "תפקיד",
      vehicleNumber: "מספר רכב",
      parkingHint: "לצורך הסדרי חניה",
      submit: "הרשמה לאירוע",
      submitting: "מתבצעת הרשמה..."
    }
  };

  const t = translations[language];

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#9b87f5]">{t.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            label={t.fullName}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            language={language}
          />
          
          <FormField
            label={t.email}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            language={language}
          />
          
          <FormField
            label={t.phone}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            language={language}
          />
          
          <FormField
            label={t.company}
            name="company"
            value={formData.company}
            onChange={handleChange}
            language={language}
          />
          
          <FormField
            label={t.title}
            name="title"
            value={formData.title}
            onChange={handleChange}
            language={language}
          />
          
          <FormField
            label={t.vehicleNumber}
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            hint={t.parkingHint}
            language={language}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white py-3 rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? t.submitting : t.submit}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;