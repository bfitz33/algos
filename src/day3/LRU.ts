type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>
}

function createNode<V>(value: V) : Node<V> {
    return {value};
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;


    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);

        //if it does not exist, insert 
        if(!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            //if it does exist, update to the front of the list and update the value
            node.value = value;
            this.detach(node);
            this.prepend(node);    
        }
        //chack capacity and evict if we are over

        
}
    get(key: K): V | undefined {
        //check cache for existence 
        const node = this.lookup.get(key);
        if(!node){
            return undefined;
        }

        //update the value we found and move it to the front 
        this.detach(node);
        this.prepend(node);

        //return out the value found 
        return node.value;

}

    private detach(node: Node<V>):void {
        if(node.next) {
            node.next.prev = node.prev;
        }
        
        if(node.prev) {
            node.prev.next = node.next;
        }

        if(this.head === node) {
            this.head = node.next;
        }

        if(this.tail === node) {
            this.tail = node.prev;
        }

        node.next = undefined;
        node.prev = undefined;
       
    }

    private prepend(node: Node<V>):void {
        if(!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    private trimCache(): void {
        if(this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node<V>;
        this.detach(this.tail as Node<V>);

        this.length--;
        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
    }
}