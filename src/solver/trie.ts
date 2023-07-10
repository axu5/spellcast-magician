import charToNumber from "@/helpers/charToNumber";
import TrieNode from "./trieNode";

export default class Trie {
    public root: TrieNode;

    constructor(root: TrieNode = new TrieNode("")) {
        this.root = root;
    }

    public insert(word: string) {
        let node = this.root;
        for (let i = 0; i < word.length; ++i) {
            const ch = word[i] as string;
            const idx = charToNumber(ch);
            if (idx < 0 || idx > 26) {
                continue;
            }

            const tmp = node.childNodes[idx] ?? new TrieNode(ch);
            node.childNodes[idx] = tmp;
            node = tmp;
        }
        node.isWord = true;
    }

    public insertWords(words: string[]) {
        for (const word of words) {
            this.insert(word);
        }
    }

    public search(word: string) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i] as string;
            const idx = charToNumber(ch);
            const tmp = node.childNodes[idx];
            if (!tmp) {
                return false;
            }
            node = tmp;
        }

        return node.isWord;
    }
}
