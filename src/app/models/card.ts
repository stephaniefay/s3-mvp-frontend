export enum Priority {
  HIGH = 0,
  MEDIUM = 1,
  LOW = 2,
  NO_PRIORITY = 3,
}

export interface IPriority {
  id: Priority;
  name: string;
}

export enum Condition {
  MINT,
  NEAR_MINT,
  SLIGHTLY_PLAYED,
  MODERATELY_PLAYED,
  HEAVILY_PLAYED,
  DAMAGED
}

export interface ICondition {
  id: Condition;
  name: string;
}

export enum Language {
  PORTUGUESE = 'pt',
  ENGLISH = 'en',
  JAPANESE = 'jp',
  GERMAN = 'de',
  FRENCH = 'fr',
  ITALIAN = 'it',
  SPANISH = 'es',
  KOREAN = 'ko',
  CHINESE = 'zh',
  DUTCH = 'nl',
  RUSSIAN = 'ru',
  THAI = 'th',
  INDONESIAN = 'id'
}

export interface ILanguage {
  id: Language,
  name: string;
}

export interface CWCard {
  id: string;
  externalId: string;
  name: string;
  image: string;
  condition: Condition;
  language: Language;
  priority: Priority | undefined;
  tags: String[] | undefined;
}

export interface CardList {
  cards: CWCard[];
}
