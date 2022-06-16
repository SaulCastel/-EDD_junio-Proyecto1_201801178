class _Node{
    constructor(data,next,prev){
        this.data = data;
        this.up = null;
        this.dwn = null;
        this.left = null;
        this.right = null;
        this.next = null;
        this.prev = null;
    }
}

class List{
    constructor(){
        this.head = null;
        this.end = null;
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
    }

    ordenar(node){
        let aux = this.head;
        while(aux != null){
            if(aux.data < node.data){
                aux = aux.next;
            }
            else{
                if(aux == this.head){
                    node.next = aux;
                    aux.prev = node;
                    this.head = node;
                }
                else{
                    node.prev = aux.prev;
                    aux.prev.next = node;
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

    add(data){
        let node = new _Node()
    }
}

class DisperseMatriz{
    constructor(){
        this.horizontal = new List();
        this.vertical = new List();
    }

    insert(data,x,y){
        let x_node = this.horizontal.search(x);
        let y_node = this.vertical.search(y);
        //No existen las cabeceras
        if (!x_node && !y_node){
            this._first_case(data,x,y);
        }
        //Existe en vertical
        else if (!x_node && y_node){
            this._second_case(data,x,y);
        }
        //Existe en horizontal
        else if(x_node && !y_node){
            this._third_case(data,x,y);
        }
        //Existen las cabeceras
        else{
            this._fourth_case(data,x,y);
        }
    }
    _first_case(data,x,y){
        var pos_x = new Node(x);
    }
    _second_case(data,x,y){}
    _third_case(data,x,y){}
    _fourth_case(data,x,y){}
}