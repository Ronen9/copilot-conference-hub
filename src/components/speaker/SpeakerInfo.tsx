interface SpeakerInfoProps {
  name: string;
  title: string;
  company: string;
  topic: string;
}

export const SpeakerInfo = ({ name, title, company, topic }: SpeakerInfoProps) => {
  return (
    <div className="p-4 text-right">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-[#9b87f5] mb-1">{title}</p>
      <p className="text-gray-300 mb-1">{company}</p>
      <p className="text-sm text-gray-400">{topic}</p>
    </div>
  );
};