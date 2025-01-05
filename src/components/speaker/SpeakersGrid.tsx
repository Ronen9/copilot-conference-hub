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
      videoUrl: "https://www.youtube.com/watch?v=L38GrkE3H3A"
    },
    {
      name: "רונן ארנרייך",
      title: "Technical CX Specialist, BizApps",
      topic: "copilot sales & marketing",
      company: "Microsoft",
      videoUrl: "https://www.youtube.com/watch?v=o1jWS8LeCIA"
    },
    {
      name: "אלכס יורפולסקי",
      title: "Technical CRM Specialist, BizApps",
      topic: "copilot service",
      company: "Microsoft",
      videoUrl: "https://media.licdn.com/dms/image/v2/C4E03AQHcEYPiVBzqEA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1636529606346?e=1741219200&v=beta&t=IYJceSXb-zg8hO1gPD34vwS78xluep_-pQIKmYOd0YY"
    },
    {
      name: "עדי לייבוביץ",
      title: "Senior Program Manager",
      topic: "copilot studio",
      company: "Microsoft",
      videoUrl: "https://media.licdn.com/dms/image/v2/C4D03AQHX0N-6qQ-5hg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1641231836048?e=1741219200&v=beta&t=5jEMd4hge0tEfcT2dR91TbUt3QKQ2pdM9WoHQWQL8jg"
    },
    {
      name: "אריק בידני",
      title: "Sr. Technology Specialist, Digital-Native",
      topic: "github copilot",
      company: "Microsoft",
      videoUrl: "https://media.licdn.com/dms/image/v2/C4D03AQHWSSnKLAWN0A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1616336989258?e=1741219200&v=beta&t=9sbjkiuazARHcRNNazGu8g7gSdmxme1ktxXDUFIcF00"
    },
    {
      name: "יובל אבידני",
      title: "Senior Data & ML Scientist",
      topic: "AI most popular productivity tools",
      company: "Lusha",
      videoUrl: "https://media.licdn.com/dms/image/v2/D4D03AQH0y1xC0sUsMQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730013126859?e=1741219200&v=beta&t=shvlsXG3vphofnRrv836kjJeKvcnYiYst2A31u_rtHI"
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