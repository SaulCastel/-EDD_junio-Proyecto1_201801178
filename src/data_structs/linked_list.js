class Node {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.next = null;
        this.num;
    }
}

export default class LinkedList{
    constructor(){
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
            this.end.next = temp
            this.end = temp
        }
        this.len += 1;
        this.id += 1;
    }
    
    addWithNum(data,num){
        let id = `n${this.id}`
        let temp = new Node(id, data);
        temp.num = num;
        if (this.head === null) {
            this.head = temp
            this.end = temp
        }
        else {
            this.end.next = temp
            this.end = temp
        }
        this.len += 1;
        this.id += 1;
    }
}