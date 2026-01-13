import { CategoryType, WikipediaEvent, CategorizedEvent } from '../types';

const WORLD_KEYWORDS = [
  'war', 'treaty', 'battle', 'revolution', 'independence', 'election', 'president',
  'prime minister', 'king', 'queen', 'emperor', 'government', 'parliament', 'congress',
  'military', 'invasion', 'peace', 'treaty', 'assassination', 'coup', 'rebellion',
  'constitution', 'democracy', 'dictatorship', 'empire', 'nation', 'country', 'political',
  'diplomat', 'ambassador', 'colony', 'territory', 'annexed', 'declared', 'signed',
  'ratified', 'established', 'founded', 'abolished', 'crowned', 'abdicated'
];

const SCIENCE_KEYWORDS = [
  'discovered', 'invention', 'scientist', 'physicist', 'chemist', 'biologist',
  'mathematician', 'engineer', 'technology', 'patent', 'laboratory', 'research',
  'experiment', 'theory', 'formula', 'equation', 'element', 'spacecraft', 'satellite',
  'rocket', 'mission', 'launch', 'landed', 'orbit', 'astronaut', 'telescope',
  'disaster', 'earthquake', 'volcano', 'hurricane', 'tsunami', 'epidemic', 'pandemic',
  'medicine', 'vaccine', 'disease', 'medical', 'hospital', 'surgery', 'nuclear',
  'atomic', 'computer', 'internet', 'telephone', 'radio', 'television', 'flight'
];

const CULTURE_KEYWORDS = [
  'born', 'died', 'artist', 'painter', 'sculptor', 'musician', 'composer', 'singer',
  'actor', 'actress', 'director', 'writer', 'author', 'poet', 'novelist', 'playwright',
  'film', 'movie', 'album', 'song', 'concert', 'performance', 'theater', 'opera',
  'symphony', 'gallery', 'museum', 'exhibition', 'published', 'released', 'premiered',
  'awarded', 'prize', 'nobel', 'oscar', 'grammy', 'pulitzer', 'literature', 'poetry',
  'novel', 'book', 'painting', 'sculpture', 'architecture', 'cathedral', 'monument',
  'cultural', 'arts', 'festival', 'celebrated', 'holiday', 'tradition', 'sport',
  'olympic', 'championship', 'athlete', 'record'
];

export function categorizeEvent(
  event: WikipediaEvent,
  sourceType: 'selected' | 'events' | 'births' | 'deaths' | 'holidays'
): CategoryType {
  const text = event.text.toLowerCase();
  const description = event.pages[0]?.description?.toLowerCase() || '';
  const combined = `${text} ${description}`;

  if (sourceType === 'births' || sourceType === 'deaths') {
    return 'culture';
  }

  if (sourceType === 'holidays') {
    return 'culture';
  }

  const scienceScore = SCIENCE_KEYWORDS.filter(keyword => combined.includes(keyword)).length;
  const cultureScore = CULTURE_KEYWORDS.filter(keyword => combined.includes(keyword)).length;
  const worldScore = WORLD_KEYWORDS.filter(keyword => combined.includes(keyword)).length;

  if (scienceScore > worldScore && scienceScore > cultureScore) {
    return 'science';
  }

  if (cultureScore > worldScore && cultureScore > scienceScore) {
    return 'culture';
  }

  return 'world';
}

export function generateEventId(event: WikipediaEvent, sourceType: string): string {
  return `${sourceType}-${event.year || 'unknown'}-${event.pages[0]?.pageid || Math.random()}`;
}

const COUNTRY_PATTERNS = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia',
  'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Chad', 'Chile', 'China', 'Colombia',
  'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech', 'Denmark', 'Djibouti', 'Dominica',
  'Ecuador', 'Egypt', 'El Salvador', 'England', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland',
  'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
  'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
  'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
  'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger',
  'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Paraguay', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Scotland',
  'Senegal', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'Spain',
  'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Togo', 'Trinidad', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Venezuela', 'Vietnam', 'Wales', 'Yemen', 'Zambia', 'Zimbabwe', 'America', 'American', 'British',
  'French', 'German', 'Italian', 'Spanish', 'Soviet', 'USSR', 'UK', 'US', 'USA'
];

export function extractCountries(text: string): string[] {
  const countries: Set<string> = new Set();
  const lowerText = text.toLowerCase();

  for (const country of COUNTRY_PATTERNS) {
    if (lowerText.includes(country.toLowerCase())) {
      countries.add(country);
    }
  }

  return Array.from(countries);
}

export function extractAllCountries(events: CategorizedEvent[]): string[] {
  const allCountries = new Set<string>();

  events.forEach(event => {
    const countries = extractCountries(event.text);
    countries.forEach(country => allCountries.add(country));
  });

  return Array.from(allCountries).sort();
}
