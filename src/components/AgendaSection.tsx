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
      <div className="text-xl text-[#9b87f5] mb-8 text-center">
        <span>5.3.25</span>
        <span className="mx-2 text-white/20">|</span>
        <span>אלן טיורינג 3, הרצליה</span>
      </div>
      <h2 className="text-3xl font-bold mb-8 text-center text-[#9b87f5]">לוח זמנים</h2>
      <div className="space-y-2">
        {agenda.map((item, index) => (
          <div key={index} className="flex items-center gap-4 px-4 py-2 border-b border-white/10">
            <div className="text-2xl font-bold text-[#9b87f5] min-w-[80px]">{item.time}</div>
            <div className="text-white/20 font-bold">|</div>
            <div className="flex-grow">
              <span className={`text-lg font-semibold ${item.title === "Dinner" ? "text-[#F97316]" : ""}`}>
                {item.title}
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