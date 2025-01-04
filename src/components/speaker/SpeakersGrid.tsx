import SpeakerCard from '../SpeakerCard';

interface SpeakerInfo {
  name: string;
  title: string;
  topic: string;
  company: string;
  videoUrl: string;
}

export const SpeakersGrid = ({ speakerInfo }: { speakerInfo: SpeakerInfo }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(5)].map((_, index) => (
          <SpeakerCard key={index} {...speakerInfo} />
        ))}
      </div>
    </div>
  );
};