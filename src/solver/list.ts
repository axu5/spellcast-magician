import ListNode from "./listNode";

// TODO collect your garbage
export default class List<T> {
    public root: ListNode<T> | null = null;
    public length: number = 0;

    constructor(rootValue: T | null = null) {
        if (rootValue) {
            this.root = new ListNode<T>(rootValue);
        }
    }

    public sort(fn: (a: T, b: T) => number) {
        const sorted = this.toArray().sort(fn);
        this.fromArray(sorted);
    }

    public toArray(): T[] {
        const out: T[] = [];

        let tmp = this.root;
        while (tmp && tmp.next != null) {
            out.push(tmp.elem);
            tmp = tmp.next;
        }

        if (tmp && tmp.elem) {
            out.push(tmp.elem);
        }

        return out;
    }

    public fromArray(arr: T[]) {
        this.root = null;
        for (let i = 0; i < arr.length; ++i) {
            this.push(arr[i] as T);
        }
    }

    public push(elem: T) {
        if (this.root == null) {
            this.length++;
            this.root = new ListNode<T>(elem);
            return;
        }

        let tmp: ListNode<T> = this.root;
        while (tmp.next != null) {
            tmp = tmp.next;
        }
        this.length++;
        tmp.next = new ListNode<T>(elem);
    }

    public get(idx: number): T | null {
        if (this.root == null) {
            return null;
        }

        if (idx == 0) {
            return this.root.elem;
        }

        let tmp: ListNode<T> = this.root;
        for (let j = 0; j < idx; ++j) {
            if (!tmp || !tmp.next) {
                return null;
            }
            tmp = tmp.next;
        }

        return tmp.elem;
    }

    public pop(): T | null {
        if (this.root == null) {
            return null;
        }
        if (this.root.next == null) {
            const tmp = this.root;
            this.root = null;
            this.length--;
            return tmp.elem;
        }
        let tmp: ListNode<T> = this.root;
        let prev: ListNode<T> = this.root;
        while (tmp.next != null) {
            prev = tmp;
            tmp = tmp.next;
        }
        let a = tmp.elem;
        prev.next = tmp.next;
        this.length--;
        return a;
    }

    public remove(elem: T) {
        if (this.root == null) {
            return;
        }

        if (this.root.elem == elem) {
            this.length--;
            this.root = this.root.next;
            return;
        }

        let tmp: ListNode<T> = this.root;
        let prev: ListNode<T> | null = null;
        while (tmp.elem != elem && tmp.next != null) {
            prev = tmp;
            tmp = tmp.next;
        }

        if (prev) {
            this.length--;
            prev.next = tmp.next;
        }
    }

    public removeAt(idx: number) {
        if (this.root == null) {
            return;
        }

        if (idx == 0) {
            this.length--;
            this.root = this.root.next;
            return;
        }

        let tmp: ListNode<T> = this.root;
        let prev: ListNode<T> | null = null;
        for (let j = 0; j < idx && tmp.next != null; ++j) {
            prev = tmp;
            tmp = tmp.next;
        }

        if (prev) {
            this.length--;
            prev.next = tmp.next;
        }
    }
}
