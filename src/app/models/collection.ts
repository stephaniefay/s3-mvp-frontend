import {CollectionCard} from './card';

export interface Collection {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  cards: CollectionCard[] | null;
}
