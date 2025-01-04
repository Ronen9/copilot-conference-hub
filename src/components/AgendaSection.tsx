const AgendaSection = () => {
  const agenda = [
    { time: "17:00", title: "התכנסות עם קפה ומאפה" },
    { time: "17:30", title: "Copilot 365", speaker: "Ori Husit" },
    { time: "17:50", title: "Copilot for sales and service", speaker: "Ronen Ehrenreich and Alex" },
    { time: "18:30", title: "Copilot studio", speaker: "Adi Leibivich" },
    { time: "18:50", title: "Dinner" },
    { time: "19:10", title: "Github copilot", speaker: "Arik" },
    { time: "19:30", title: "Build your dream with AI", speaker: "Yuval Avidani" },
    { time: "19:50", title: "Kahoot trivia with valuable prices!!!" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-black/30 rounded-xl backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#9b87f5]">לוח זמנים</h2>
      <div className="space-y-4">
        {agenda.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="text-right flex-grow">
              <h3 className={`text-xl font-semibold ${item.title === "Dinner" ? "text-[#F97316]" : ""}`}>{item.title}</h3>
              {item.speaker && <p className="text-[#9b87f5]">{item.speaker}</p>}
            </div>
            <div className="text-2xl font-bold text-[#9b87f5] mr-4">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaSection;