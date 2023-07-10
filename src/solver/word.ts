import List from "./list";
import { Tile } from "./tile";
import { tileProperties } from "./tileProperties";

export default class Word {
    public text = "";
    public tiles: List<Tile>;

    constructor(text: string = "", tiles: Tile[] = []) {
        this.text = text;
        this.tiles = new List<Tile>(null);

        for (let i = 0; i < tiles.length; ++i) {
            const tile = tiles[i]!;
            this.tiles.push(tile);
        }
    }

    public calculateGems() {
        let gems = 0;
        for (let i = 0; i < this.tiles.length; ++i) {
            const tile = this.tiles.get(i);
            if (!tile) {
                continue;
            }

            gems += tile.hasProperty(tileProperties.Gem) ? 1 : 0;
        }

        return gems;
    }

    public calculatePoints() {
        let points = 0;
        let doubleWord = false;
        for (let i = 0; i < this.tiles.length; ++i) {
            const tile = this.tiles.get(i);
            if (!tile) {
                continue;
            }
            points += tile.calculatePoints();
            if (tile.hasProperty(tileProperties.DoubleWord)) {
                doubleWord = true;
            }
        }

        points *= doubleWord ? 2 : 1;
        if (this.text.length >= 6) {
            points += 10;
        }

        return points;
    }

    public addTile(tile: Tile) {
        this.tiles.push(tile);
        this.text += tile.letter;
    }

    public removeTile(tile: Tile) {
        this.tiles.remove(tile);
        // FIXME shouldn't delete the end character
        this.text = this.text.substring(0, this.text.length - 1);
    }
}
