export interface Collection {
  id: string;
  name: string;
  description: string;
  cover: string;
  isPrivate: boolean;
  editable: boolean;
  cards: any[];
}

export interface CollectionList {
  collections: Collection[];
}
