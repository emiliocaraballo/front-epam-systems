declare global {
  interface Window {
    $fetch: typeof fetch;
  }
}

export interface Book {
  _id?: string;
  title: string;
  author: string;
  publishYear?: number;
  cover: string;
  review?: string;
  rating?: number;
  openLibraryId: string;
}

export interface SearchResult {
  title: string;
  author: string;
  publishYear?: number;
  openLibraryId: string;
  cover?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
