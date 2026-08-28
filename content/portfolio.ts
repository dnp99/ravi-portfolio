export interface FilmProject {
  title: string;
  role: string;
  year: string;
  runtime: string;
  logline: string;
  notes: string[];
  link?: string;
  tone: 'amber' | 'blue' | 'red';
}

export interface PortraitEntry {
  title: string;
  note: string;
  number: string;
}

export interface DevelopmentProject {
  title: string;
  format: string;
  description: string;
}

export const portfolio = {
  profile: {
    name: 'Ravi Rekhi',
    role: 'Writer / Director / Producer',
    location: 'Toronto, Canada',
    headline: 'Stories about private lives, strange systems, and the things people do to feel less alone.',
    about: [
      'I write and direct character-led stories that sit somewhere between the intimate and the absurd.',
      'My work is interested in the small rituals people build around loneliness, desire, and belonging. I like films with a strong point of view, a little bit of unease, and room for the audience to look twice.',
    ],
    availability: 'Open to thoughtful collaborations',
  },
  filmIntro: 'A selection of short-form work, experiments, and stories currently finding their shape.',
  films: [
    {
      title: 'C.U.P.I.D.',
      role: 'Writer / Director',
      year: '2025',
      runtime: '10 minutes',
      logline: 'The Province of Ontario creates a mandatory dating program for vulnerable adults leading solitary lives in the city.',
      notes: ['Short film', 'Currently in circulation'],
      link: undefined,
      tone: 'amber' as const,
    },
  ] satisfies FilmProject[],
  portraitsIntro: 'All shots taken on a Minolta X-700 SLR, and processed and scanned at Downtown Camera, Toronto.',
  portraits: [
    { title: 'Untitled study 01', note: 'Toronto, 2024', number: '01' },
    { title: 'Untitled study 02', note: 'Toronto, 2024', number: '02' },
    { title: 'Untitled study 03', note: 'Toronto, 2024', number: '03' },
    { title: 'Untitled study 04', note: 'Toronto, 2024', number: '04' },
    { title: 'Untitled study 05', note: 'Toronto, 2024', number: '05' },
    { title: 'Untitled study 06', note: 'Toronto, 2024', number: '06' },
  ] satisfies PortraitEntry[],
  development: [
    {
      title: 'New work',
      format: 'Narrative projects',
      description: 'A small slate of character-driven stories in development.',
    },
  ] satisfies DevelopmentProject[],
  contact: {
    email: 'ravirekhi11@gmail.com',
    instagram: 'https://www.instagram.com/',
  },
};
