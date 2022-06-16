import LinkedList from "./linked_list.js";

export default class OrtogonalList{
    constructor(){
        this.header = new LinkedList();
        this._fill();
    }
    _fill(){
        for (let i = 0; i < 25; i++) {
            let column = new LinkedList();
            for (let j = 0; j < 25; j++){
                column.add(null);
            }
            this.header.add(column);
        }
    }
    set(row,col,data){
        let aux = this.header.head;
        for (let i = 1; i < row; i++) {
            aux = aux.next;
        }
        let cell = aux.data.head;
        for (let i = 1; i < col; i++) {
            cell = cell.next;
        }
        cell.data = data;
    }
    get(row,col){
        let aux = this.header.head;
        for (let i = 1; i < row; i++) {
            aux = aux.next;
        }
        let cell = aux.data.head;
        for (let i = 1; i < col; i++) {
            cell = cell.next;
        }
        return cell.data;
    }
}