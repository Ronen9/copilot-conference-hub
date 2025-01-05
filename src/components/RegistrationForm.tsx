import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabaseClient';

const RegistrationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    vehicleNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
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

      if (error) throw error;

      toast({
        title: "ההרשמה הושלמה בהצלחה!",
        description: "פרטיך נשמרו במערכת",
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        title: '',
        vehicleNumber: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "שגיאה בהרשמה",
        description: "אנא נסה שנית מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#9b87f5]">הרשמה לאירוע</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-right">
              שם מלא
              <span className="text-[#ea384c] mr-1">*</span>
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5"
              dir="rtl"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-right">
              אימייל
              <span className="text-[#ea384c] mr-1">*</span>
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5"
              dir="rtl"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-right">
              טלפון
              <span className="text-[#ea384c] mr-1">*</span>
            </label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-white/5"
              dir="rtl"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-right">חברה</label>
            <Input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-white/5"
              dir="rtl"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-right">תפקיד</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white/5"
              dir="rtl"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-right">
              מספר רכב
              <span className="text-sm text-gray-400 mr-2">(לצורך הסדרי חניה)</span>
            </label>
            <Input
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className="w-full bg-white/5"
              dir="rtl"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] text-white py-3 rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'מתבצעת הרשמה...' : 'הרשמה לאירוע'}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;