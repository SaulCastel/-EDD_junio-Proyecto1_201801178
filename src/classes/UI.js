import Graph from './graph.js';

export default class UI{
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
        let g = new Graph();
        g.graphCircularList(user_list);
    }

    showUserView(user){
        this._showUserControls(user);
    }
    _addBookToLibrary(category,book){
        const library = document.getElementById(`${category}`);
        const element = document.createElement('div');
        element.className = 'card'; element.style.width = '15rem';
        element.innerHTML = html`
            <div class=""></div>
            `;
        library.appendChild(element);
    }
    fillFantasyLibrary(library){
        let lib = document.getElementById('fantasy');
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
    }
    showBookInfo(book,where){
        if(book){
            let info = document.getElementById(where);
            info.innerHTML = `
                <h5>${book.nombre}</h5>
                <p>Autor: ${book.autor}</p>
                <p>isbn: ${book.isbn}</p>
                <input type="number" id="fantasy-num" min="1" value="1">
                <div class="btn btn-primary my-3" id="buy-fantasy">Comprar</div>
                <h5>Disponibles:</h5>
            `;
            for (let i = 0; i < book.num; i++) {
                let b = document.createElement('div');
                b.className = 'book mx-auto';
                info.appendChild(b);
            }
        }
    }
}