interface SpeakerInfoProps {
  name: string;
  title: string;
  company: string;
  topic: string;
}

export const SpeakerInfo = ({ name, title, company, topic }: SpeakerInfoProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <h3 className="text-2xl font-bold mb-1">{name}</h3>
      <p className="text-[#9b87f5] text-lg mb-1">{title}</p>
      <p className="text-white/80 text-lg mb-1">{company}</p>
      <p className="text-white/60 text-base">{topic}</p>
    </div>
  );
};