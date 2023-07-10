
export const tileProperties = {
    None: 0,
    DoubleLetter: 1,
    TripleLetter: 2,
    DoubleWord: 4,
    Gem: 8,
} as const;

export type TilePropertiesType = typeof tileProperties;
