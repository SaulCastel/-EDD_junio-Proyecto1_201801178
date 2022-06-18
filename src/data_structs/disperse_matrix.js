class _Node{
    constructor(data){
        this.data = data;
        this.up = null;
        this.dwn = null;
        this.left = null;
        this.right = null;
        this.next = null;
        this.prev = null;
        this.id = null;
    }

    toString(){
        return `${this.data.nombre}`;
    }
}

class _List{
    constructor(){
        this.head = null;
        this.end = null;
        this.len = 0;
    }

    search(data){
        let temp = this.head;
        while(temp != null)
        {if (temp.data === data){
            return temp;
        }
        else{
            temp = temp.next;
        }}
        return null;
    }

    add(data){
        let node = new _Node(data);
        if (this.head === null){
            this.head = node;
            this.end = node;
        }
        else{
            this._orderedInsert(node);
        }
        this.len += 1;
        return node;
    }

    _orderedInsert(node){
        let aux = this.head;
        while(aux != null){
            if(aux.data < node.data){
                aux = aux.next;
            }
            else{
                if(aux === this.head){
                    node.next = aux;
                    aux.prev = node;
                    this.head = node;
                }
                else{
                    aux.prev.next = node;
                    node.prev = aux.prev;
                    node.next = aux;
                    aux.prev = node;
                }
                return;
            }
        }
        this.end.next = node;
        node.prev = this.end;
        this.end = node;
    }
}

export default class DisperseMatriz{
    constructor(){
        this.horizontal = new _List();
        this.vertical = new _List();
    }
    get(row,col){
        let pos_y = this.vertical.head;
        for (let i = 1; i < row; i++) {
            pos_y = pos_y.next;
        }
        let node = pos_y.right;
        for (let i = 1; i < col; i++) {
            node = node.right;
        }
        return node.data;
    }
    set(row, col, data){
        let y_node = this.vertical.search(row);
        let x_node = this.horizontal.search(col);
        //No existen las cabeceras
        if (!x_node && !y_node){
            this._first_case(data,row,col);
        }
        //Existe en vertical
        else if (!x_node && y_node){
            this._second_case(data,y_node,col);
        }
        //Existe en horizontal
        else if(x_node && !y_node){
            this._third_case(data,row,x_node);
        }
        //Existen las cabeceras
        else{
            this._fourth_case(data,y_node,x_node);
        }
    }
    _first_case(data,row,col){
        let pos_y = this.vertical.add(row);
        pos_y.id = `row_${row}`;
        let pos_x = this.horizontal.add(col);
        pos_x.id = `col_${col}`;
        let node = new _Node(data);
        node.id = `node_${row}${col}`;
        pos_y.right = node;
        node.left = pos_y;
        pos_x.dwn = node;
        node.up = pos_x;
    }
    _second_case(data,row,col){
        let pos_x = this.horizontal.add(col);
        pos_x.id = `col_${col}`;
        let node = new _Node(data);
        node.id = `node_${row}${col}`;
        pos_x.dwn = node;
        node.up = pos_x;
        this._insertRow(node,row);
    }
    _third_case(data,row,col){
        let pos_y = this.vertical.add(row);
        pos_y.id = `row_${row}`;
        let node = new _Node(data);
        node.id = `node_${row}${col}`;
        pos_y.right = node;
        node.left = pos_y;
        this._insertCol(node,col);
    }
    _fourth_case(data,row,col){
        let node = new _Node(data);
        node.id = `node_${row}${col}`;
        this._insertRow(node,row);
        this._insertCol(node,col);
    }
    _insertRow(node,row){
        let aux = row.right;
        while(aux.right != null){
            if(aux.data.row < node.data.row){
                aux = aux.right;
            }
            else{
                if(aux === row.right){
                    node.right = aux;
                    node.left = row;
                    aux.left = node;
                    row.right = node;
                }
                else{
                    aux.left.right = node;
                    node.left = aux.left;
                    node.right = aux;
                    aux.left = node;
                }
                return;
            }
        }
        aux.right = node;
        node.left = aux;
    }
    _insertCol(node,col){
        let aux = col.dwn;
        while(aux.dwn != null){
            if(aux.data.col < node.data.col){
                aux = aux.dwn;
            }
            else{
                if(aux === col.dwn){
                    node.dwn = aux;
                    node.up = col;
                    aux.up = node;
                    col.dwn = node;
                }
                else{
                    aux.up.dwn = node;
                    node.up = aux.up;
                    node.dwn = aux;
                    aux.up = node;
                }
                return;
            }
        }
        aux.dwn = node;
        node.up = aux;
    }
}