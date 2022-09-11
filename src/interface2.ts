export interface ObjectItems {
  name: Name;
  currencies: { [key: string]: Currencies };
  idd: Idd;
  languages: Languages;
  translations: { [key: string]: Translation };
  demonyms: Demonyms;
  maps: Maps;
  gini: Gini;
  car: Car;
  flags: CoatOfArms;
  coatOfArms: CoatOfArms;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side: string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface Currencies {
  name: string;
  symbol: string;
}

export interface Eur {
  name: string;
  symbol: string;
}

export interface Demonyms {
  eng: Eng;
  fra: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Gini {
  '2018': number;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Languages {
  fin: string;
  swe: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex: string;
}
