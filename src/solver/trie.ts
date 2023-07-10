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
            node.childNodes[idx] ??= new TrieNode(ch);
            node = node.childNodes[idx]!;
            node.isWord = i === word.length - 1 || node.isWord;
        }
    }

    public insertWords(words: string[]) {
        for (const word of words) {
            this.insert(word);
        }
    }

    public search(word: string, isPrefixSearch: boolean = false) {
        let node = this.root;
        for (let i = 0; i < word.length; ++i) {
            const ch = word[i]!;
            const idx = charToNumber(ch);
            const tmp = node.childNodes[idx];
            if (
                tmp == null ||
                (!isPrefixSearch &&
                    i == word.length - 1 &&
                    !tmp.isWord)
            ) {
                return false;
            }
            node = tmp;
        }

        return true;
    }

    public startsWith(prefix: string) {
        return this.search(prefix, true);
    }
}
