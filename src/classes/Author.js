export default class Author{
    constructor({
        dpi,
        nombre_autor,
        correo,
        telefono,
        direccion,
        biografia
    }){
        this.dpi = dpi;
        this.name = nombre_autor;
        this.email = correo;
        this.tel = telefono;
        this.addr = direccion;
        this.bio = biografia;
    }
}