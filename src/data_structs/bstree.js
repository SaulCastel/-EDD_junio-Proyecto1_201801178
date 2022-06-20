class _Node {
    constructor(key) {
        this.key = key;
        this.left = this.right = null;
        this.id;
    }
}

export default class BSTree {
    constructor() {
        this.root = null;
        this.id = 0;
    }

    insert(key) {
        if (this.root === null) {
            this.root = new _Node(key);
            this._assignID(this.root);
        }
        else {
            this._insertRec(this.root, key);
        }
    }

    _insertRec(root, key) {
        if (root == null) {
            root = new _Node(key);
            this._assignID(root);
            return root;
        }
        if (key.name.localeCompare(root.key.name) < 0) {
            root.left = this._insertRec(root.left, key);
        }
        else if (key.name.localeCompare(root.key.name) > 0) {
            root.right = this._insertRec(root.right, key);
        }
        return root;
    }

    _assignID(node){
        node.id = `n${this.id}`;
        this.id++;
    }
}