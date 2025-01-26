export interface Speaker {
  name: string;
  title: string;
  topic: string;
  company: string;
  videoUrl: string;
}

export interface SpeakersData {
  he: Speaker[];
  en: Speaker[];
}