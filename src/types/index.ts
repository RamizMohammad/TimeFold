export interface WikipediaPage {
  type: string;
  title: string;
  displaytitle: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  lang: string;
  description?: string;
  content_urls: {
    desktop: {
      page: string;
    };
  };
  extract?: string;
}

export interface WikipediaEvent {
  text: string;
  year?: number;
  pages: WikipediaPage[];
}

export interface OnThisDayResponse {
  selected?: WikipediaEvent[];
  events?: WikipediaEvent[];
  births?: WikipediaEvent[];
  deaths?: WikipediaEvent[];
  holidays?: WikipediaEvent[];
}

export type CategoryType = 'world' | 'science' | 'culture';

export interface CategorizedEvent extends WikipediaEvent {
  id: string;
  category: CategoryType;
  sourceType: 'selected' | 'events' | 'births' | 'deaths' | 'holidays';
}

export interface FilterState {
  country: string;
  searchQuery: string;
  sortOrder: 'asc' | 'desc';
}
