import { MapPin, PartyPopper } from "lucide-react";
import confetti from 'canvas-confetti';
import { useLanguage } from "@/contexts/LanguageContext";

const AgendaSection = () => {
  const { language } = useLanguage();

  const agenda = {
    he: [
      { time: "17:00", title: "התכנסות עם קפה ומאפה" },
      { time: "17:30", title: "Copilot 365", speaker: "אורי הוסיט" },
      { time: "17:50", title: "Copilot for sales and service", speaker: "רונן ארנרייך ואלכס יורפולסקי" },
      { time: "18:30", title: "Copilot studio", speaker: "עדי לייבוביץ" },
      { time: "18:50", title: "בופה חלבי" },
      { time: "19:10", title: "Github copilot", speaker: "אריק בידני" },
      { time: "19:30", title: "Developing with GenAI", speaker: "יובל אבידני" },
      { time: "19:50", title: "סיום האירוע עם מתנות פרידה" },
    ],
    en: [
      { time: "17:00", title: "Reception with Coffee & Pastries" },
      { time: "17:30", title: "Copilot 365", speaker: "Ori Husyt" },
      { time: "17:50", title: "Copilot for Sales and Service", speaker: "Ronen Ehrenreich and Alex Yurpolsky" },
      { time: "18:30", title: "Copilot Studio", speaker: "Adi Leibowitz" },
      { time: "18:50", title: "Dinner" },
      { time: "19:10", title: "Github Copilot", speaker: "Arik Bidny" },
      { time: "19:30", title: "Developing with GenAI", speaker: "Yuval Avidani" },
      { time: "19:50", title: "End of event with farewell gifts" },
    ]
  };

  const location = {
    he: {
      office: "משרדי מיקרוסופט",
      address: "ריאקטור - מידטאון, תל אביב"
    },
    en: {
      office: "Microsoft Offices",
      address: "Reactor - Midtown, Tel Aviv"
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9b87f5', '#ffffff', '#F97316']
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-black/30 rounded-xl backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-[#9b87f5]">
          <MapPin size={20} />
          <span>{location[language].office}</span>
        </div>
        <div className="text-3xl font-bold text-center text-[#9b87f5]">
          <span>5.3.25</span>
          <span className="mx-2 text-white/20">|</span>
          <span>{location[language].address}</span>
        </div>
      </div>
      <div className="space-y-2">
        {agenda[language].map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-4 px-4 py-2 border-b border-white/10 ${language === 'en' ? 'text-left' : ''}`}
          >
            <div className="text-2xl font-bold text-[#9b87f5] min-w-[80px]">{item.time}</div>
            <div className="text-white/20 font-bold">|</div>
            <div className="flex-grow">
              <span 
                className={`text-lg font-semibold ${(item.title === "Dinner" || item.title === "בופה חלבי") ? "text-[#F97316]" : ""}`}
                onMouseEnter={() => item.time === "19:50" && triggerConfetti()}
              >
                {item.time === "19:50" && (
                  <PartyPopper className="inline-block mr-2 text-[#F97316]" size={20} />
                )}
                {item.title}
                {item.time === "19:50" && (
                  <PartyPopper className="inline-block ml-2 text-[#F97316]" size={20} />
                )}
              </span>
              {item.speaker && (
                <>
                  <span className="text-white/20 mx-2 font-bold">|</span>
                  <span className="text-[#9b87f5]">{item.speaker}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaSection;