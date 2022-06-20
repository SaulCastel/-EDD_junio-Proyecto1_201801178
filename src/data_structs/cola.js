class _Node{
    constructor(data){
        this.data = data;
        this.prev = null;
        this.id;
    }
}

export default class Queue{
    constructor(){
        this.head = this.last = null;
        this.len = 0;
        this.id = 0;
    }

    insert(data){
        let node = new _Node(data);
        node.id = `n${this.id}`;
        if (this.head === null){
            this.head = node;
            this.last = node;
        }
        else{
            this.last.prev = node;
            this.last = node;
        }
        this.len++;
        this.id++;
    }
}