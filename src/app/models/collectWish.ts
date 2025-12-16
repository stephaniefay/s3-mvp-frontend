import {CWCard} from './card';

export enum Type {
  WISHLIST = 'wishlist',
  COLLECTION = 'collection',
}

export interface CollectWish {
  id: string;
  userId: string;
  name: string;
  description: string;
  cover: string;
  privacy: string;
  editable: boolean;
  type: Type;
  cards: CWCard[];
}

export interface CWList {
  cw: CollectWish[];
}
