import { SpeakersData } from './types';
import { hebrewSpeakers } from './speakers/he';
import { englishSpeakers } from './speakers/en';

export const speakers: SpeakersData = {
  he: hebrewSpeakers,
  en: englishSpeakers
};

export type { Speaker } from './types';