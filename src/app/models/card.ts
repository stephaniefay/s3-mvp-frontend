import {AncientTrait} from './ancientTrait';
import {Ability} from './ability';
import {Attack} from './attack';
import {Weakness} from './weakness';
import {Resistance} from './resistance';
import {Sets} from './sets';
import {Legalities} from './legalities';
import {CardImage} from './images';
import {TCGPlayer} from './tcgplayer';
import {Cardmarket} from './cardmarket';

export enum Condition {
  M = "Mint",
  NM = "Near Mint",
  SP = "Slightly Played",
  MP = "Moderately Played",
  HP = "Heavily Played",
  D = "Damaged"
}

export enum Languages {
  BR = "Português",
  EN = "English",
  ES = "Español",
  IT = "Italiano",
  JP = "日本語",
  CN = "中国人",
  KO = "한국인"
}

export interface Cards {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: AncientTrait;
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: Weakness[];
  resistances?: Resistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: Sets;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: Legalities;
  regulationMark?: string;
  images: CardImage;
  tcgplayer?: TCGPlayer;
  cardmarket?: Cardmarket;
}

export interface CollectionCard {
  id: string;
  collectionId: string;
  card: Cards;
  quantity: number;
  language: string;
  condition: Condition;
  tags: string[];
}

export interface WishlistCard {
  id: string;
  wishlistId: string;
  card: Cards;
  quantity: number;
  language: string;
  condition: Condition;
  tags: string[];
}
