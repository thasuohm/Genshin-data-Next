export interface stat {
  hp: number;
  attack: number;
  defense: number;
  ascension: number;
}

export interface material {
  name: string;
  count: number;
}

export interface characterInfo {
  affiliation: string;
  association: string;
  birthday: string;
  body: string;
  costs: {
    [ascend1: string]: Array<material>;
    ascend2: Array<material>;
    ascend3: Array<material>;
    ascend4: Array<material>;
    ascend5: Array<material>;
    ascend6: Array<material>;
  };
  cv: {
    [english: string]: string;
    chinese: string;
    japanese: string;
    korean: string;
  };
  description: string;
  constellation: string;
  name: string;
  element: string;
  weapontype: string;
  substat: string;
  stats: Function;
  images: {
    icon?: string;
    cover1: string;
    cover2: string;
    sideicon: string;
  };
  rarity: string;
  region: string;
  title: string;
  url: { fandom: string };
  gender: string;
}

export interface element {
  url: any;
  color: string;
}

export type elements = {
  [key: string]: element;
};

export type weapon = {
  [key: string]: StaticImageData;
};

export interface constellation {
  name: string;
  effect: string;
}

export interface constellations {
  [key: string]: any;
  name: string;
  c1: constellation;
  c2: constellation;
  c3: constellation;
  c4: constellation;
  c5: constellation;
  c6: constellation;
  images?: any;
}

export interface combat {
  name: string;
  description: string;
  info: string;
  attributes: {
    [key: string]: any;
    labels: Array<string>;
    parameters: any;
  };
}

export interface passive {
  passive1: { name: string; info: string };
  passive2: { name: string; info: string };
  passive3: { name: string; info: string };
}
