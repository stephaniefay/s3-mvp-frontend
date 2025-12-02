export enum Legality {
  LEGAL = 'Legal',
  BANNED = 'Banned',
}

export interface Legalities {
  expanded: Legality | undefined
  standard: Legality | undefined
  unlimited: Legality | undefined
}
