import { Button } from "@/components/ui/button";
import { FormField } from "./FormField";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";

const RegistrationForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useRegistrationForm();

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#9b87f5]">הרשמה לאירוע</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormField
            label="שם מלא"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <FormField
            label="אימייל"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <FormField
            label="טלפון"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <FormField
            label="חברה"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          
          <FormField
            label="תפקיד"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          
          <FormField
            label="מספר רכב"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            hint="לצורך הסדרי חניה"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white py-3 rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "מתבצעת הרשמה..." : "הרשמה לאירוע"}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;