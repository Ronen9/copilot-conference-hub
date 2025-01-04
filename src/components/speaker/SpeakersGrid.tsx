import SpeakerCard from '../SpeakerCard';

interface SpeakerInfo {
  name: string;
  title: string;
  topic: string;
  company: string;
  videoUrl: string;
}

export const SpeakersGrid = () => {
  const speakers: SpeakerInfo[] = [
    {
      name: "אורי הוסיט",
      title: "Modern Work Specialists Manager",
      topic: "copilot 365",
      company: "Microsoft",
      videoUrl: "L38GrkE3H3A"
    },
    {
      name: "רונן ארנרייך",
      title: "CX Specialist",
      topic: "copilot sales & marketing",
      company: "Microsoft",
      videoUrl: "o1jWS8LeCIA"
    },
    {
      name: "Arik Bidny",
      title: "Sr. Technology Specialist, Digital-Native",
      topic: "github copilot",
      company: "Microsoft",
      videoUrl: "https://media.licdn.com/dms/image/v2/C4D03AQHWSSnKLAWN0A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1616336989258?e=1741219200&v=beta&t=9sbjkiuazARHcRNNazGu8g7gSdmxme1ktxXDUFIcF00"
    },
    {
      name: "רונן ארנרייך",
      title: "CX Specialist",
      topic: "copilot sales & marketing",
      company: "Microsoft",
      videoUrl: "o1jWS8LeCIA"
    },
    {
      name: "רונן ארנרייך",
      title: "CX Specialist",
      topic: "copilot sales & marketing",
      company: "Microsoft",
      videoUrl: "o1jWS8LeCIA"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {speakers.map((speaker, index) => (
          <SpeakerCard key={index} {...speaker} />
        ))}
      </div>
    </div>
  );
};