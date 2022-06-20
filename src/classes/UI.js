import Graph from './graph.js';

export default class UI{
    constructor(){
        this.g = new Graph();
    }

    _showUserControls(user){
        document.getElementById('log-in').style.display = "none";
        document.getElementById('user-controls').style.display = "block";
        document.getElementById('user-name').textContent = `Usuario: ${user}`;
    }

    showHomePage(){
        document.getElementById('log-in').style.display = "flex";
        document.getElementById('user-controls').style.display = "none";
        document.getElementById('admin').style.display = "none";
    }

    showAdminView(user,user_list){
        this._showUserControls(user);
        document.getElementById('admin').style.display = "block";
        this.g.graphCircularList(user_list);
    }

    showUserView(user){
        this._showUserControls(user);
    }
    showTopUsers(list){
        let top = document.getElementById('top-users');
        top.innerHTML = '';
        let aux = list.head;
        let i = 1;
        while(aux != null){
            let card = document.createElement('div');
            card.className = 'col-lg-2 mx-4';
            card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3>Puesto ${i}</h3>
                    <img class="img-fluid w-25" src="./img/person.png" alt="">
                    <h4>${aux.data.nombre.replace(' ','<br>')}</h4>
                    <p>Cantidad libros: ${aux.data.purchases}</p>
                </div>
            </div>`;
            top.appendChild(card);
            aux = aux.next;
            i++;
        }
    }
    fillFantasyLibrary(library){
        let lib = document.getElementById('fantasy');
        lib.innerHTML = '';
        let row = library.header.head;
        for (let i = 1; i <= 25; i++) {
            let row_div = document.createElement('div');
            row_div.className = 'row';
            let aux = row.data.head;
            for (let j = 1; j <= 25; j++) {
                let col = document.createElement('div');
                col.className = 'col btn';
                col.setAttribute('row',i);
                col.setAttribute('col',j);
                if(aux.data != null){
                    col.className = 'col btn btn-info';
                }
                row_div.appendChild(col);
                aux = aux.next;
            }
            lib.appendChild(row_div);
            row = row.next;
        }
        this.g.graphFantasy(library);
    }

    fillThrillerLibrary(library){
        let lib = document.getElementById('thriller');
        lib.innerHTML = '';
        for (let i = 1; i <= library.vertical.end.data; i++) {
            let row_div = document.createElement('div');
            row_div.className = 'row';
            for (let j = 1; j <= library.horizontal.end.data; j++) {
                let col = document.createElement('div');
                col.setAttribute('row',i);
                col.setAttribute('col',j);
                col.className = 'col';
                if(library.get(i,j)){
                    col.className = 'col btn btn-info';
                }
                row_div.appendChild(col);
            }
            lib.appendChild(row_div);
        }
        this.g.graphThriller(library);
    }

    showBookInfo(book,where){
        if(book){
            let info = document.getElementById(`info-${where}`);
            info.innerHTML = 
            `
                <h5>${book.nombre}</h5>
                <p>Autor: ${book.autor}</p>
                <p>isbn: ${book.isbn}</p>
                <p>fila: ${book.row}, col: ${book.col}</p>
                <input type="number" id="${where}-num" min="1" value="1">
                <div class="btn btn-primary my-3" id="buy-${where}">Comprar</div>
                <h5>Disponibles(${book.num}):</h5>
            `;
            for (let i = 0; i < book.num; i++) {
                let b = document.createElement('div');
                b.className = 'book mx-auto';
                info.appendChild(b);
            }
        }
    }
}