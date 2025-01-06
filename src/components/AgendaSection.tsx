import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";

const AgendaSection = () => {
  const { language } = useLanguage();

  const agenda = {
    he: [
      { time: "17:00", title: "התכנסות וכיבוד קל" },
      { time: "17:30", title: "קופיילוט 365", speaker: "אורי חוסיט" },
      { time: "17:50", title: "קופיילוט למכירות ושירות", speaker: "רונן ארנרייך ואלכס יורפולסקי" },
      { time: "18:30", title: "קופיילוט סטודיו", speaker: "עדי לייבוביץ" },
      { time: "18:50", title: "ארוחת ערב" },
      { time: "19:10", title: "גיטהאב קופיילוט", speaker: "אריק בידני" },
      { time: "19:30", title: "תבנה את החלום שלך עם בינה מלאכותית", speaker: "יובל אבידני" },
      { time: "19:50", title: "טריוויה בקהוט עם פרסים שווים!!!" },
    ],
    en: [
      { time: "17:00", title: "Reception with Coffee & Pastries" },
      { time: "17:30", title: "Copilot 365", speaker: "Ori Husyt" },
      { time: "17:50", title: "Copilot for Sales and Service", speaker: "Ronen Ehrenreich and Alex Yurpolsky" },
      { time: "18:30", title: "Copilot Studio", speaker: "Adi Leibowitz" },
      { time: "18:50", title: "Dinner" },
      { time: "19:10", title: "Github Copilot", speaker: "Arik Bidny" },
      { time: "19:30", title: "Build Your Dream with AI", speaker: "Yuval Avidani" },
      { time: "19:50", title: "Kahoot Trivia with Valuable Prizes!!!" },
    ]
  };

  const titles = {
    he: {
      sectionTitle: "לו״ז האירוע",
      time: "שעה",
      session: "מושב",
      speaker: "מרצה"
    },
    en: {
      sectionTitle: "Event Schedule",
      time: "Time",
      session: "Session",
      speaker: "Speaker"
    }
  };

  return (
    <div className="py-12 bg-black/30">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-8 text-[#9b87f5] ${language === 'en' ? 'text-left' : 'text-right'}`}>
          {titles[language].sectionTitle}
        </h2>

        <Card className="bg-black/50 backdrop-blur-sm border-white/10">
          <div className={`grid grid-cols-3 gap-4 px-4 py-3 border-b border-white/10 text-sm uppercase tracking-wider text-white/50 ${language === 'en' ? 'text-left' : 'text-right'}`}>
            <div>{titles[language].time}</div>
            <div>{titles[language].session}</div>
            <div>{titles[language].speaker}</div>
          </div>

          {agenda[language].map((item, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-3 gap-4 px-4 py-3 border-b border-white/10 ${language === 'en' ? 'text-left' : 'text-right'}`}
            >
              <div className="text-[#9b87f5] font-medium">{item.time}</div>
              <div className="text-white">{item.title}</div>
              <div className="text-white/70">{item.speaker}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default AgendaSection;