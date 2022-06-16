class Node {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

export default class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.end = null;
        this.len = 0;
        this.id = 0;
    }

    add(data) {
        let id = `n${this.id}`
        let temp = new Node(id, data);
        if (this.head === null) {
            this.head = temp
            this.end = temp
        }
        else {
            temp.prev = this.end
            this.end.next = temp
            this.end = temp
        }
        this.len += 1;
        this.id += 1;
    }
}