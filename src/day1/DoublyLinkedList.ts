type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    private debug() {
        let curr = this.head;
        let out = "";
        for(let i = 0; curr && i < this.length; i++) {
            out += `${i} +> ${curr.value}`;
            curr = curr.next;
        }

        console.log(out);
    }

    prepend(item: T): void {
        const newNode = {value: item} as Node<T>;
        if(this.head) {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        } else {
            this.head = this.tail = newNode
        }
        this.length++;

}
    insertAt(item: T, idx: number): void {
        if( idx > this.length) {
            throw new Error("oh no");
        } else if(idx == this.length) {
            this.append(item);
            return;
        } else if(idx ==0) {
            this.prepend(item);
            return;
        }

        let curr = this.getAt(idx) as Node<T>;

        const newNode = {value: item} as Node<T>;
        this.length++;
        newNode.prev = curr.prev;
        newNode.next = curr;
        curr.prev = newNode;

        if(newNode.prev) {
            newNode.prev.next = newNode;
        }
}
    append(item: T): void {
        this.length++;
        const newNode = {value: item} as Node<T>;

        if(!this.tail) {
            this.head = this.tail = newNode;
            this.debug()
            return;
        }
        
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
        this.debug();

}
    remove(item: T): T | undefined {
        let curr = this.head;
        for(let i = 0; curr && i < this.length; i++) {
            if(curr.value === item) {
                break;
            }
            curr = curr.next;
        }

        if(!curr) {
            return undefined;
        }

        return this.removeNode(curr);
}
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
}
    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx) as Node<T>;

        if(!node) {
            return undefined;
        }

        return this.removeNode(node);

}
    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for(let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        return curr;
    }

    private removeNode(node: Node<T>): T | undefined{
        this.length--;
        if(this.length === 0 ) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }

        if(node.prev) {
            node.prev.next = node.next;
        }

        if(node.next) {
            node.next.prev = node.prev;
        }
        
        if(node === this.head) {
            this.head = node.next;
        }
        if(node === this.tail) {
            this.tail = node.prev;
        }

        node.next = node.prev = undefined;
        return node.value;
    }
}