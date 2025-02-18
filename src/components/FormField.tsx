import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hint?: string;
  language?: 'en' | 'he';
}

export const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  hint,
  language = 'he'
}: FormFieldProps) => {
  const isHebrew = language === 'he';
  
  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${isHebrew ? 'text-right' : 'text-left'}`}>
        {label}
        {required && <span className="text-[#ea384c] mx-1">*</span>}
        {hint && <span className="text-sm text-gray-400 mx-2">({hint})</span>}
      </label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white/5"
        dir={isHebrew ? "rtl" : "ltr"}
      />
    </div>
  );
};