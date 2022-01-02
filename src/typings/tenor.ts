export interface Webm {
  preview: string;
  url: string;
  dims: number[];
  size: number;
}

export interface Tinygif {
  url: string;
  size: number;
  dims: number[];
  preview: string;
}

export interface Tinymp4 {
  preview: string;
  size: number;
  dims: number[];
  url: string;
  duration: number;
}

export interface Mediumgif {
  url: string;
  size: number;
  dims: number[];
  preview: string;
}

export interface Mp4 {
  duration: number;
  dims: number[];
  url: string;
  size: number;
  preview: string;
}

export interface Gif {
  url: string;
  dims: number[];
  size: number;
  preview: string;
}

export interface Nanowebm {
  dims: number[];
  url: string;
  size: number;
  preview: string;
}

export interface Nanomp4 {
  preview: string;
  duration: number;
  size: number;
  dims: number[];
  url: string;
}

export interface Tinywebm {
  size: number;
  preview: string;
  url: string;
  dims: number[];
}

export interface Nanogif {
  preview: string;
  size: number;
  url: string;
  dims: number[];
}

export interface Loopedmp4 {
  size: number;
  preview: string;
  url: string;
  dims: number[];
  duration: number;
}

export interface Medium {
  webm: Webm;
  tinygif: Tinygif;
  tinymp4: Tinymp4;
  mediumgif: Mediumgif;
  mp4: Mp4;
  gif: Gif;
  nanowebm: Nanowebm;
  nanomp4: Nanomp4;
  tinywebm: Tinywebm;
  nanogif: Nanogif;
  loopedmp4: Loopedmp4;
}

export interface Result {
  id: string;
  title: string;
  content_description: string;
  content_rating: string;
  h1_title: string;
  media: Medium[];
  bg_color: string;
  created: number;
  itemurl: string;
  url: string;
  tags: any[];
  flags: any[];
  shares: number;
  hasaudio: boolean;
  hascaption: boolean;
  source_id: string;
  composite?: any;
}

export interface TenorSearchResponse {
  results: Result[];
  next: string;
}
