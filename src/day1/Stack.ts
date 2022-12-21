type Node<T> = {
    value : T,
    next: Node<T>
}

export default class Stack<T> {
    public length: number;
    private head?:Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const newNode = {value: item} as Node<T>;
        this.length++;
        if(!this.head) {
            this.head = newNode;
            return;
        }

        newNode.next = this.head;
        this.head = newNode;

}
    pop(): T | undefined {
        if(!this.head){
            return undefined;
        }

        this.length--;
        const h = this.head;
        this.head = this.head?.next;

        return h.value;

}
    peek(): T | undefined {
        return this.head?.value;

}
}