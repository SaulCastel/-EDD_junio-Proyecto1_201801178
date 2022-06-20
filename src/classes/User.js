import LinkedList from '../data_structs/linked_list.js'

export default class User{
    constructor({
        dpi,
        nombre_completo,
        nombre_usuario,
        correo,
        rol,
        contrasenia,
        telefono
    }){
        this.dpi = dpi;
        this.nombre = nombre_completo;
        this.user = nombre_usuario;
        this.mail = correo;
        this.rol = rol;
        this.pass = contrasenia;
        this.tel = telefono;
        this.libros = new LinkedList();
        this.purchases = 0;
    }

    toString(){
        let string = `USER: ${this.user}\n PASS: ${this.pass}`;
        return string;
    }

    addBook(book,num){
        this.libros.addWithNum(book,num);
        this.purchases += parseInt(num);
    }
}