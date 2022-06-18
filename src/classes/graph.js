export default class Graph{    
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
        .width(1000)
        .height(500)
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
    graphMatrix(matrix){
        let string = 'digraph G{\nnode[shape=box];\n';
        string += 'ranksep = .5;\nnodesep = .5;\n';
        string += 'subgraph cluster{\n';
        string +=  
        `label="Thriller";\n
        fontsize=15;\n
        edge[dir="both"];\n`;
        //graficar columnas
        string +='{\nrank=same;\nroot[label=""];\n';
        let col = matrix.horizontal.head;
        string += `root -> col_${col.data};\n`;
        while(col !== null){
            string += `col_${col.data}[label="${col.data}",group=${col.data}];\n`;
            if(col !== matrix.horizontal.end){
                string += `col_${col.data} -> col_${col.next.data};\n`;
            }
            col = col.next;
        }
        string += '}\n';
        //graficar filas
        let row = matrix.vertical.head;
        while(row !== null){
            string += '{\nrank=same;\n';
            string += `row_${row.data}[label="${row.data}",group=0];\n`;
            col = row.right;
            let nodeID = `node_${row.data}${col.data.col}`;
            string += `row_${row.data} -> ${nodeID};\n`;
            while(col !== null){
                nodeID = `node_${row.data}${col.data.col}`;
                string += `${nodeID}[label="${col.toString()}",group=${col.data.col}];\n`;
                if (col.right !== null){
                    string +=  `${nodeID} -> node_${row.data}${col.right.data};\n`;
                }
                col = col.right;
            }
            if(row !== matrix.vertical.end){
                string += `row_${row.data} -> row_${row.next.data};\n`;
            }
            row = row.next;
            string += '}\n';
        }
        string += '}\n}';
        console.log(string);
    }
}