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
}