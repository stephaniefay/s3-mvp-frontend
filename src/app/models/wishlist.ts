import {CWCard} from './card';

export enum Priority {
  HIGH = 0,
  MEDIUM = 1,
  LOW = 2,
  NO_PRIORITY = 3,
}

export interface Wishlist {
  id: string;
  userId: string;
  name: string;
  description: string;
  cover: string;
  isPrivate: boolean;
  editable: boolean;

  priority: Priority;
  tags: string[];

  cards: CWCard[];
}

export interface WishlistList {
  cw: Wishlist[];
}
