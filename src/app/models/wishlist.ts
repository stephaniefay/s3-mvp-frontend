export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  NO_PRIORITY = 'NOPRIORITY',
}

export interface Wishlist {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  tags: string[];
}
