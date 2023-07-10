import isLetter from "@/helpers/isLetter";
import List from "./list";
import { Letter, Tile } from "./tile";
import Trie from "./trie";
import Word from "./word";
import { tileProperties } from "./tileProperties";
import TrieNode from "./trieNode";

export type ValidWordType = {
    points: number;
    word: Word;
};

export default class Board {
    public tiles: (Tile | null)[] = Array.from(Array(25), () => null);
    public validWordsSet: List<ValidWordType> =
        new List<ValidWordType>();
    public trie = new Trie();
    private loaded = false;

    constructor(input: string = "") {
        this.setLetters(input);
    }

    public setLetters(input: string) {
        for (let i = 0; i < 5; ++i) {
            for (let j = 0; j < 5; ++j) {
                const ch = input[i * 5 + j]?.toLowerCase();
                if (!ch || !isLetter(ch)) {
                    continue;
                }
                this.tiles[i * 5 + j] = new Tile(ch, i, j);
            }
        }
    }

    public async load() {
        if (!this.loaded) {
            this.loaded = true;
            const res = await fetch(
                process.env.NODE_ENV === "development"
                    ? "http://localhost:3000/dictionary.txt"
                    : "https://spellcast-magician.vercel.app/dictionary.txt"
            );
            const str = await res.text();

            this.trie.insertWords(str.split("\n"));
        }
    }

    public setTile(
        x: number,
        y: number,
        letter: Letter,
        properties = 0
    ) {
        const tile = new Tile(letter, x, y);
        tile.properties =
            properties === 0 ? tile.properties : properties;

        this.tiles[x * 5 + y] = tile;
    }

    public _traverseBoard(
        x: number,
        y: number,
        word: Word,
        node: TrieNode | undefined
    ) {
        if (x < 0 || x > 4 || y < 0 || y > 4) {
            return;
        }

        const tile = this.tiles[x * 5 + y];
        if (!tile) {
            return;
        }
        for (let i = 0; i < word.tiles.length; ++i) {
            const tmp = word.tiles.get(i);
            if (!tmp) {
                continue;
            }
            if (tmp.x == x && tmp.y == y) {
                return;
            }
        }

        // check whether current letter (at x, y) is the beginning of a word
        const text = word.text + tile.letter;
        if (!this.trie.search(text)) {
            return;
        }

        // add current letter to word
        word.addTile(tile);
        // check whether current letter (at x, y) is the end of a word
        if (this.trie.search(text)) {
            // store copy of Tiles instead of reference
            this.validWordsSet.push({
                points: word.calculatePoints(),
                word: new Word(text, word.tiles.toArray()),
            });
        }

        // traverse all adjacent letters including diagonals
        // Horizontal
        this._traverseBoard(x - 1, y, word, node);

        this._traverseBoard(x + 1, y, word, node);
        // Vertical
        this._traverseBoard(x, y - 1, word, node);
        this._traverseBoard(x, y + 1, word, node);
        // Diagonal
        this._traverseBoard(x - 1, y - 1, word, node);
        this._traverseBoard(x + 1, y - 1, word, node);
        this._traverseBoard(x - 1, y + 1, word, node);
        this._traverseBoard(x + 1, y + 1, word, node);

        // remove current letter from word
        word.removeTile(tile);
    }

    public traverseBoard(x: number, y: number) {
        this._traverseBoard(x, y, new Word(), this.trie.root);
    }

    public findValidWords() {
        this.validWordsSet = new List<ValidWordType>();

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                this.traverseBoard(i, j);
            }
        }

        // sort valid words
        this.validWordsSet.sort((a, b) => {
            const p = b.points - a.points;
            if (p == 0) {
                const g =
                    b.word.calculateGems() - a.word.calculateGems();

                if (g == 0) {
                    return b.word.text.localeCompare(a.word.text);
                }

                return g;
            }

            return p;
        });
    }

    private resetProperties(properties: number) {
        for (let i = 0; i < this.tiles.length; ++i) {
            const tile = this.tiles[i];
            if (!tile) {
                continue;
            }

            tile.properties &= ~properties;
        }
    }

    public isFilled() {
        for (let i = 0; i < this.tiles.length; ++i) {
            const tile = this.tiles[i];
            if (!tile || !isLetter(tile.letter)) {
                return false;
            }
        }
        return true;
    }

    public toggleProperties(
        x: number,
        y: number,
        tilePropertiesPooPOo: number
    ) {
        // toggle properties for a tile

        const tile = this.tiles[x * 5 + y];
        if (!tile) {
            return;
        }

        //ensure that only one (DoubleLetter or TripleLetter) is enabled across the board and current tile
        // meaning that if one tile has DoubleLetter enabled, then no other tile can have DoubleLetter OR TripleLetter enabled
        const before = tile.properties;
        tile.properties ^= tilePropertiesPooPOo;
        const after = tile.properties;
        const gainedProperties = after & ~before;

        // if the new properties are DoubleLetter or TripleLetter, then we need to disable the other one across the board and the first one on all except the current tile
        // 2xWord can only be enabled on one tile at a time
        tile.hasProperty;
        if (
            tile.hasProperty(tileProperties.DoubleLetter) ||
            tile.hasProperty(tileProperties.TripleLetter)
        ) {
            this.resetProperties(tileProperties.TripleLetter);
            this.resetProperties(tileProperties.DoubleLetter);
        }

        if (tile.hasProperty(tileProperties.DoubleWord)) {
            this.resetProperties(tileProperties.DoubleWord);
        }

        tile.properties |= gainedProperties;

        if (!this.isFilled()) return;
        this.findValidWords();
    }

    public enableTileProperties(
        x: number,
        y: number,
        tilePropertiesPooPOo: number
    ) {
        const tile = this.tiles[x * 5 + y];
        if (!tile) {
            return;
        }

        tile.properties |= tilePropertiesPooPOo;
        if (!this.isFilled()) return;
        this.findValidWords();
    }

    public disableTileProperties(
        x: number,
        y: number,
        tilePropertiesPooPOo: number
    ) {
        const tile = this.tiles[x * 5 + y];
        if (!tile) {
            return;
        }
        tile.properties &= ~tilePropertiesPooPOo;
        if (!this.isFilled()) return;
        this.findValidWords();
    }

    // GetProperties returns the properties of a tile
    public getProperties(x: number, y: number) {
        const tile = this.tiles[x * 5 + y];
        if (!tile) {
            return 0;
        }
        return tile.properties;
    }

    public getTile(x: number, y: number) {
        const tile = this.tiles[x * 5 + y];
        return tile;
    }
}
