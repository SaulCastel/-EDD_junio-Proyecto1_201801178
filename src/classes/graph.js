export default class Graph{    
    graphCircularList(list){
        let string = 'digraph G{node[shape="box"]\n';
        let aux = list.head;
        for (let i = 0; i < list.len; i++) {
            string += `\t${aux.id}[label="${aux.data.toString()}"]\n`
            aux = aux.next;
        }
        aux = list.head;
        string += '{rank=same\n'
        for (let i = 0; i < list.len-1; i++) {
            string += `\t${aux.id}->${aux.next.id}\n`
            aux = aux.next;
        }
        string += `\t${list.end.id}->${list.head.id}}\n}`
        //console.log(string);
        //render
        d3.select("#canva-users-list")
        .graphviz()
        .width(1000)
        .height(500)
        .renderDot(string);
    }
    _genSubList(node){
        
    }
}