export enum Priority {
  HIGH = 0,
  MEDIUM = 1,
  LOW = 2,
  NO_PRIORITY = 3,
}

export interface Wishlist {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  tags: string[];
}
