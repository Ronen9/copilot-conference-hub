import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import confetti from 'canvas-confetti';

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

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

export const useRegistrationForm = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sendConfirmationEmail = async (registration: RegistrationFormData) => {
    try {
      console.log('Sending confirmation email for:', registration.email);
      
      const { error } = await supabase.functions.invoke('send-make-confirmation', {
        body: {
          name: registration.name,
          email: registration.email,
          phone: registration.phone,
          company: registration.company,
          title: registration.title,
          language: language
        }
      });

      if (error) {
        console.error('Error sending confirmation email:', error);
        return;
      }

      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error in sendConfirmationEmail:', error);
    }
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
          title: language === 'en' ? "Registration Error" : "שגיאה בהרשמה",
          description: language === 'en' 
            ? "An error occurred during registration. Please try again later."
            : "אירעה שגיאה בעת ההרשמה. אנא נסו שוב מאוחר יותר.",
        });
        return;
      }

      console.log('Registration submitted successfully');
      
      // Send confirmation email using make.com webhook
      await sendConfirmationEmail(formData);
      
      // Trigger confetti effect on successful registration
      triggerConfetti();
      
      toast({
        title: language === 'en' ? "Registration Successful" : "ההרשמה הושלמה בהצלחה",
        description: language === 'en' 
          ? "Your registration details have been saved. Check your email (including spam folder) for confirmation!"
          : "פרטי ההרשמה שלך נשמרו במערכת. בדוק את האימייל שלך (כולל תיקיית דואר זבל) לקבלת אישור!",
      });

      setFormData(initialFormData);
    } catch (error) {
      console.error('Error in form submission:', error);
      toast({
        variant: "destructive",
        title: language === 'en' ? "Registration Error" : "שגיאה בהרשמה",
        description: language === 'en' 
          ? "An error occurred during registration. Please try again later."
          : "אירעה שגיאה בעת ההרשמה. אנא נסו שוב מאוחר יותר.",
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