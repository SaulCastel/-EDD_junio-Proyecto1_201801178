import CircularList from './data_structs/circ_list.js';
import OrtogonalList from './data_structs/ortogonal_list.js';
import LinkedList from './data_structs/linked_list.js';
import DisperseMatriz from './data_structs/disperse_matrix.js';
import BSTree from './data_structs/bstree.js';
import Queue from './data_structs/cola.js';
import User from './classes/User.js'
import Book from './classes/Book.js';
import Author from './classes/Author.js';
import UI from './classes/UI.js'
import Graph from './classes/graph.js';

// ALMACENAMIENTO
let users = new CircularList();
let books = new LinkedList();
let authors = new BSTree();
let fantasy = new OrtogonalList();
let thriller = new DisperseMatriz();
let pending = new Queue();
let curr_user = null;
let curr_book = null;

// VARIABLES
const datos_admin = {
    "dpi": "2354168452525",
    "nombre_completo": "Wilfred Perez",
    "nombre_usuario": "Wilfred",
    "correo": "aux@gmail.com",
    "rol": "Administrador",
    "contrasenia": "123",
    "telefono": "+502 (123) 123-4567"
};
const admin = new User(datos_admin); users.add(admin);
const ui = new UI();
const g = new Graph();

// FUNCIONES
function login(arr, user, pass) {
    let aux = arr.head;
    for (let i = 0; i < arr.len; i++) {
        let u = aux.data;
        if (u.user === user) {
            if (u.pass === pass) {
                curr_user = u;
                if (u.rol === 'Administrador') {
                    ui.showAdminView(u.nombre, users);
                }
                else {
                    ui.showUserView(u.nombre);
                }
            }
            else {
                alert("Password incorrecta");
            }
            return true;
        }
        aux = aux.next;
    }
    alert('Usuario no existe')
}
function updateTopUsers(){

}
function purchase(num){
    let result = curr_book.num - num;
    if (result < 0){
        let data = {
            'client': curr_user.nombre,
            'book': curr_book.nombre,
            'num': Math.abs(result)
        };
        pending.insert(data);
        if(curr_book.num != 0){
            curr_user.addBook(curr_book,curr_book.num);
        }
        curr_book.num = 0;
    }
    else{
        curr_user.addBook(curr_book,num);
        curr_book.num -= num;
    }
    g.graphQueue(pending);
    g.graphCircularList(users)
}
//EVENTOS
document.getElementById("login-form")
    .addEventListener('submit', function (e) {
        e.preventDefault();
        let user = document.getElementById('user-input').value;
        let pass = document.getElementById('pass-input').value;
        login(users, user, pass);
    });
// LOG_OUT
document.getElementById('log-out')
    .addEventListener('click', function () {
        curr_user = null;
        ui.showHomePage();
    });
// CARGAR_ARCHIVOS
document.getElementById('load-users')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let f = JSON.parse(fr.result);
            f.forEach(user => {
                users.add(new User(user));
            });
            g.graphCircularList(users);
        };
        fr.readAsText(this.files[0]);
    });
document.getElementById('load-books')
    .addEventListener('change', function () {
        let fr = new FileReader();
        fr.onload = function () {
            let f = JSON.parse(fr.result);
            f.forEach(book => {
                books.add(new Book(book));
                let x = book.columna;
                let y = book.fila;
                if(book.categoria === 'Fantasia'){
                    fantasy.set(y,x,new Book(book));
                }
                else{
                    thriller.set(y,x,new Book(book));
                }
            });
            ui.fillFantasyLibrary(fantasy);
            ui.fillThrillerLibrary(thriller);
        };
        fr.readAsText(this.files[0]);
    });
document.getElementById('load-authors')
    .addEventListener('change', function(){
        let fr = new FileReader();
        fr.onload = function (){
            let f = JSON.parse(fr.result);
            f.forEach(author => {
                authors.insert(new Author(author));
            });
            g.graphBStree(authors);
        };
        fr.readAsText(this.files[0]);
    });
//LIBRERAS
document.getElementById('fantasy')
    .addEventListener('click', function(e){
        let cell = e.target;
        let row = cell.getAttribute('row');
        let col = cell.getAttribute('col');
        if(row !== null && col !== null){
            curr_book = fantasy.get(row,col);
            ui.showBookInfo(curr_book,'fantasy');
        }
    });
document.getElementById('info-fantasy')
    .addEventListener('click', function(e){
        const element = e.target;
        if(element.getAttribute('id') === 'buy-fantasy'){
            if(curr_user){
                const num = document.getElementById('fantasy-num').value;
                purchase(num);
                ui.showBookInfo(curr_book,'fantasy');
            }
            else{
                alert('Inicie sesion');
            }
        }
    });
document.getElementById('thriller')
    .addEventListener('click', function(e){
        let cell = e.target;
        let row = cell.getAttribute('row');
        let col = cell.getAttribute('col');
        if(row !== null && col !== null){
            curr_book = thriller.get(row,col);
            ui.showBookInfo(curr_book,'thriller');
        }
    });
document.getElementById('info-thriller')
.addEventListener('click', function(e){
    const element = e.target;
    if(element.getAttribute('id') === 'buy-thriller'){
        if(curr_user){
            const num = document.getElementById('thriller-num').value;
            curr_user.addBook(curr_book,num);
            curr_book.num -= num;
            ui.showBookInfo(curr_book,'thriller');
        }
        else{
            alert('Inicie sesion');
        }
    }
});