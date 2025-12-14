import {CWCard} from './card';

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description: string;
  cover: string;
  isPrivate: boolean;
  editable: boolean;
  cards: CWCard[];
}

export interface CollectionList {
  cw: Collection[];
}
