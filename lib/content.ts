import fs from 'node:fs';
import path from 'node:path';

export interface FilmProject {
  title: string;
  role: string;
  year: string;
  runtime: string;
  logline: string;
  notes: string[];
  link?: string;
  images: string[];
  imageAlt?: string;
  tone: 'amber' | 'blue' | 'red';
}

export interface PortraitEntry {
  title: string;
  note: string;
  number: string;
  image?: string;
  alt?: string;
}

export interface DevelopmentProject {
  title: string;
  format: string;
  description: string;
}

export interface PortfolioContent {
  profile: {
    name: string;
    role: string;
    location: string;
    headline: string;
    about: string[];
    fieldNote: string;
    availability: string;
  };
  filmIntro: string;
  films: FilmProject[];
  portraitsIntro: string;
  portraits: PortraitEntry[];
  development: DevelopmentProject[];
  contact: { email: string; instagram: string };
}

function readDocument(filePath: string) {
  const source = fs.readFileSync(filePath, 'utf8');
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return {fields: {}, body: source.trim()};

  const fields: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return {fields, body: match[2].trim()};
}

function filesIn(folder: string) {
  return fs.readdirSync(folder).filter((file) => file.endsWith('.md')).sort();
}

function asTone(value: string): FilmProject['tone'] {
  return value === 'blue' || value === 'red' ? value : 'amber';
}

const contentRoot = path.join(process.cwd(), 'content');

export function getPortfolio(): PortfolioContent {
  const site = readDocument(path.join(contentRoot, 'site.md'));
  const films = filesIn(path.join(contentRoot, 'films')).map((file) => {
    const document = readDocument(path.join(contentRoot, 'films', file));
    return {
      title: document.fields.title ?? 'Untitled film',
      role: document.fields.role ?? 'Writer / Director',
      year: document.fields.year ?? '',
      runtime: document.fields.runtime ?? '',
      logline: document.body,
      notes: document.fields.notes?.split('|').map((note) => note.trim()).filter(Boolean) ?? [],
      link: document.fields.videoUrl || undefined,
      images: document.fields.gallery?.split('|').map((image) => image.trim()).filter(Boolean) ?? [],
      imageAlt: document.fields.heroAlt || `${document.fields.title ?? 'Film'} still`,
      tone: asTone(document.fields.tone ?? 'amber'),
    };
  });
  const portraits = filesIn(path.join(contentRoot, 'portraits')).map((file, index) => {
    const document = readDocument(path.join(contentRoot, 'portraits', file));
    return {
      title: document.fields.title ?? 'Untitled study',
      note: document.fields.location ?? '',
      number: document.fields.number ?? String(index + 1).padStart(2, '0'),
      image: document.fields.image || undefined,
      alt: document.fields.alt || undefined,
    };
  });
  const development = filesIn(path.join(contentRoot, 'development')).map((file) => {
    const document = readDocument(path.join(contentRoot, 'development', file));
    return {
      title: document.fields.title ?? 'Untitled project',
      format: document.fields.format ?? 'Narrative project',
      description: document.body,
    };
  });

  return {
    profile: {
      name: site.fields.name ?? 'Ravi Rekhi',
      role: site.fields.role ?? 'Writer / Director / Producer',
      location: site.fields.location ?? '',
      headline: site.fields.headline ?? '',
      about: site.body.split('\n\n').filter((paragraph) => !paragraph.startsWith('## ')),
      fieldNote: site.fields.fieldNote ?? '',
      availability: site.fields.availability ?? '',
    },
    filmIntro: site.fields.filmIntro ?? '',
    films,
    portraitsIntro: site.fields.portraitsIntro ?? '',
    portraits,
    development,
    contact: {
      email: site.fields.email ?? '',
      instagram: site.fields.instagram ?? '',
    },
  };
}
