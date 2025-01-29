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

const generateICSContent = () => {
  const startDate = '20250305T170000Z'; // March 5th, 2025, 17:00 UTC
  const endDate = '20250305T200000Z';   // March 5th, 2025, 20:00 UTC
  const location = "Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)";
  const description = "Join us for an exciting Copilot Conference! More details at: https://copilot-conference-hub.lovable.app/";

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Copilot Conference//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${crypto.randomUUID()}
SUMMARY:Microsoft Copilot Conference
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
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

  const downloadCalendarFile = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'copilot-conference.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendConfirmationEmail = async (registration: RegistrationFormData) => {
    try {
      console.log('Sending confirmation email for:', registration.email);
      
      const { error } = await supabase.functions.invoke('send-confirmation', {
        body: {
          name: registration.name,
          email: registration.email,
          company: registration.company,
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
      
      await sendConfirmationEmail(formData);
      
      triggerConfetti();
      
      toast({
        title: language === 'en' ? "Registration Successful" : "ההרשמה הושלמה בהצלחה",
        description: language === 'en' 
          ? "Your registration details have been saved. Check your email for confirmation!"
          : "פרטי ההרשמה שלך נשמרו במערכת. בדוק את האימייל שלך לקבלת אישור!",
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
    handleSubmit,
    downloadCalendarFile
  };
};