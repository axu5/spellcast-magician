export default class ListNode<T> {
    public elem: T;
    public next: ListNode<T> | null = null;

    constructor(first: T) {
        this.elem = first;
    }
}
