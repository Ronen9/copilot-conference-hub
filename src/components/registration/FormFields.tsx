import { FormField } from "../FormField";
import { RegistrationFormData } from "@/types/registration";

interface FormFieldsProps {
  formData: RegistrationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t: Record<string, string>;
  language: 'en' | 'he';
}

export const FormFields = ({ formData, handleChange, t, language }: FormFieldsProps) => {
  return (
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
        label={t.jobTitle}
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
  );
};