export default class Book{
    constructor({
        isbn,
        nombre_autor,
        nombre_libro,
        cantidad,
        fila,
        columna,
        paginas,
        categoria
    }){
        this.isbn = isbn;
        this.autor = nombre_autor;
        this.nombre = nombre_libro;
        this.num = cantidad;
        this.row = fila;
        this.col = columna;
        this.pag = paginas;
        this.cat = categoria;
    }
}