export default class Graph{  
    constructor(){
        this.nullCount = 0;
    }  
    graphCircularList(list){
        let string = 'digraph G{node[shape="box"]\n';
        let aux = list.head;
        for (let i = 0; i < list.len; i++) {
            string += `\t${aux.id}[label="${aux.data.toString()}"]\n`;
            if(aux.data.libros.len !== 0){
                string += this._genSubList(aux);
            }
            aux = aux.next;
        }
        aux = list.head;
        string += '{rank=same\n'
        for (let i = 0; i < list.len; i++) {
            string += `\t${aux.id}->${aux.next.id}\n`;
            aux = aux.next;
        }
        string += '}\n}';
        //render
        d3.select("#canva-users-list")
        .graphviz()
        .width(1200)
        .renderDot(string);
    }
    _genSubList(node){
        let string = 'subgraph {\n';
        string += '\tnode[shape=plaintext];\n';
        string += `\t${node.id}_books [label=<\n`;
        string += '\t<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">\n';
        let aux = node.data.libros.head;
        string += '\t<TR><TD bgcolor="gray">Libros</TD></TR>\n';
        for (let i = 0; i < node.data.libros.len; i++) {
            string += `\t<TR><TD>${aux.data.nombre}<br/>Cantidad:${aux.num}</TD></TR>\n`;
            aux = aux.next;
        }
        string += '\t</TABLE>>];\n'
        string += `\t${node.id} -> ${node.id}_books;\n}`;
        return string;
    }
    graphFantasy(matrix){
        let string = 'digraph G{\nnode[shape=box,style=filled];\n';
        string += 'label="Fantasy";\nnodesep = 1;\n';
        let row = matrix.header.head;
        for (let i = 1; i <= 25; i++) {
            let col = row.data.head;
            if(row.next != null){
                string += `row${i}_${col.id} -> row${i+1}_${row.next.data.head.id}\n`;
            }
            string += `subgraph cluster${i}{\nlabel="";\n`;
            string += '{\nrank=same;\n';
            for (let j = 1; j <= 25; j++) {
                if(col.data != null){
                    string += `row${i}_${col.id}[label="${col.data.nombre}",fillcolor="skyblue"];\n`;
                }
                else{
                    string += `row${i}_${col.id}[label="Vacio"];\n`;
                }
                if(col.next !== null){
                    string += `row${i}_${col.id} -> row${i}_${col.next.id};\n`;
                }
                col = col.next;
            }
            string += '}\n}\n';
            row = row.next;
        }
        string += '}';
        //render
        d3.select("#canva-fantasy")
        .graphviz()
        .width(1200)
        .renderDot(string);
    }
    graphThriller(matrix){
        let string = 'digraph G{\nnode[shape=box];\n';
        string += 'ranksep = 1;\nnodesep = 1;\n';
        string += 'subgraph cluster{\n';
        string += `label="Thriller";\nfontsize=15;\nedge[dir="both"];\n`;
        //graficar columnas
        let col = matrix.horizontal.head;
        string +='{\nrank=same;\nroot[label=""];\n';
        string += `root -> ${col.id};\n`;
        while(col !== null){
            string += `${col.id}[label="${col.data}",group=${col.data}];\n`;
            if(col !== matrix.horizontal.end){
                string += `${col.id} -> ${col.next.id};\n`;
            }
            col = col.next;
        }
        string += '}\n';
        col = matrix.horizontal.head;
        while(col !== null){
            string += `${col.id} -> ${col.dwn.id};\n`;
            col = col.next;
        }
        //graficar filas
        let row = matrix.vertical.head;
        string += `root -> ${row.id};\n`;
        while(row !== null){
            string += '{\nrank=same;\n';
            string += `${row.id}[label="${row.data}",group=0];\n`;
            col = row.right;
            string += `${row.id} -> ${col.id};\n`;
            //graficar nodos
            while(col !== null){
                string += `${col.id}[label="${col.toString()}",group=${col.data.col}];\n`;
                //conecciones horizontales de nodos
                if (col.right !== null){
                    string +=  `${col.id} -> ${col.right.id};\n`;
                }
                col = col.right;
            }
            string += '}\n';
            //conexiones verticales de nodos
            if(row !== matrix.vertical.end){
                string += `${row.id} -> ${row.next.id};\n`;
            }
            col = row.right;
            while(col !== null){
                if (col.dwn !== null){
                    string += `${col.id} -> ${col.dwn.id};\n`;
                }
                col = col.right;
            }
            row = row.next;
        }
        string += '}\n}';
        //render
        d3.select("#canva-thriller")
        .graphviz()
        .width(1200)
        .renderDot(string);
    }
    graphBStree(tree){
        let string = 'digraph BST{\nnode[shape=record]';
        string += this._graphNode(tree.root);
        string += '}';
        //render
        d3.select("#canva-authors")
        .graphviz()
        .width(1200)
        .renderDot(string);
    }
    _graphNode(node){
        let string = `${node.id}[label="<f0>|${node.key.name}|<f1>"];\n`;
        if (node.left){
            string += `${node.id}:f0 -> ${node.left.id};\n`;
            string += this._graphNode(node.left);
        }
        else{
            string += this._graphNullLeft(node);
        }
        if(node.right){
            string += `${node.id}:f1 -> ${node.right.id};\n`;
            string += this._graphNode(node.right);
        }
        else{
            string += this._graphNullRight(node);
        }
        return string;
    }
    _graphNullLeft(node){
        let string = `null${this.nullCount}[shape=point];\n`;
        string += `${node.id}:f0 -> null${this.nullCount++};\n`;
        return string;
    }
    _graphNullRight(node){
        let string = `null${this.nullCount}[shape=point];\n`;
        string += `${node.id}:f1 -> null${this.nullCount++};\n`;
        return string;
    }
    graphQueue(queue){
        let string = 'digraph Q{\nnode[shape=box];\n{rank=same;\n';
        let aux = queue.head;
        while(aux != null){
            let label = `Cliente: ${aux.data.client}\nLibro: ${aux.data.book}\nnum: ${aux.data.num}`
            string += `${aux.id}[label="${label}"]`;
            if (aux.prev != null){
                string += `${aux.id} -> ${aux.prev.id};\n`;
            }
            aux = aux.prev;
        }
        string += '}\n}';
        //render
        d3.select("#canva-queue")
        .graphviz()
        .width(1200)
        .renderDot(string);
    }
    graphDoublyLinked(list){
        let string = 'digraph top{\nnode[shape=box];edge[dir="both"];\n';
        string += 'nodesep=1;\n{rank=same;\n';
        let aux = list.head;
        while(aux != null){
            let label = `Cliente: ${aux.data.nombre}\nCantidad: ${aux.data.purchases}`
            string += `${aux.id}[label="${label}"]`;
            if (aux.next != null){
                string += `${aux.id} -> ${aux.next.id};\n`;
            }
            aux = aux.next;
        }
        string += '}\n}';
        //render
        d3.select("#canva-top")
        .graphviz()
        .width(1200)
        .renderDot(string);
    }
}