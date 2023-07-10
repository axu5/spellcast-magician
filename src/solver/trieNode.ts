export default class TrieNode {
    public childNodes: (TrieNode | null)[];
    public character: string;
    public isWord: boolean = false;

    constructor(character: string) {
        this.childNodes = Array.from(Array(26), () => null);
        this.character = character;
    }
}
