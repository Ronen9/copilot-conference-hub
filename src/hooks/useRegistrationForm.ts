import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  vehicleNumber: string;
}

const initialFormData: RegistrationFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  title: '',
  vehicleNumber: ''
};

export const useRegistrationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting registration:', formData);
      
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            title: formData.title,
            vehicle_number: formData.vehicleNumber
          }
        ]);

      if (error) {
        console.error('Error submitting registration:', error);
        toast({
          variant: "destructive",
          title: "שגיאה בהרשמה",
          description: "אירעה שגיאה בעת ההרשמה. אנא נסו שוב מאוחר יותר.",
        });
        return;
      }

      console.log('Registration submitted successfully');
      toast({
        title: "ההרשמה הושלמה בהצלחה",
        description: "פרטי ההרשמה שלך נשמרו במערכת",
      });

      setFormData(initialFormData);
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        variant: "destructive",
        title: "שגיאה בהרשמה",
        description: "אירעה שגיאה בעת ההרשמה. אנא נסו שוב מאוחר יותר.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};