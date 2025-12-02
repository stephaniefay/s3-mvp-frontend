export interface TCGPlayer {
  url: string;
  updatedAt: string;
  prices: {
    normal: Price | undefined;
    holofoil: Price | undefined;
    reverseHolofoil: Price | undefined;
    '1stEditionNormal': Price | undefined;
    '1stEditionHolofoil': Price | undefined;
  }
}

export interface Price {
  low: number | null
  mid: number | null
  high: number | null
  market: number | null
  directLow: number | null
}
