import { tileProperties } from "./tileProperties";

export const letterValues = {
    a: 1,
    b: 4,
    c: 5,
    d: 3,
    e: 1,
    f: 5,
    g: 3,
    h: 4,
    i: 1,
    j: 7,
    k: 6,
    l: 3,
    m: 4,
    n: 2,
    o: 1,
    p: 4,
    q: 8,
    r: 2,
    s: 2,
    t: 2,
    u: 4,
    v: 5,
    w: 5,
    x: 7,
    y: 4,
    z: 10,
} as const;

export type Letter = keyof typeof letterValues;

export class Tile {
    public letter: Letter;
    public x: number;
    public y: number;
    public properties: number;

    constructor(
        letter: Letter,
        x: number,
        y: number,
        properties: number = 0
    ) {
        this.letter = letter;
        this.x = x;
        this.y = y;
        this.properties = properties;
    }

    public setProperty(property: number) {
        this.properties |= property;
    }

    public removeProperty(property: number) {
        this.properties &= ~property;
    }

    public hasProperty(property: number) {
        return (this.properties & property) > 0;
    }

    public calculatePoints() {
        const points = letterValues[this.letter];

        if (this.hasProperty(tileProperties.DoubleLetter)) {
            return points * 2;
        } else if (this.hasProperty(tileProperties.TripleLetter)) {
            return points * 3;
        }

        return points;
    }
}
