let casillas = document.getElementsByClassName("columna");
let seleccionado = false;
let pieza;
let casillaSeleccionada;
let blancas = ['♙', '♖', '♘', '♗', '♕', '♔'];
let negras = ["♟", "♜", "♞", "♝", "♛", "♚"];
let piezaOrigen;
let piezaDestino;
let casilla;

for (let c = 0; c < casillas.length; c++) {
    casillas[c].addEventListener("click", seleccion);
    casillas[c].addEventListener("dragstart", dragstart);
    casillas[c].addEventListener("dragover", dragover);
    casillas[c].addEventListener("drop", drop);
    casillas[c].id = "pieza";
}

function dragstart(e) {
    if (seleccionado) casillaSeleccionada.style.color = "black";

    seleccionado = false;
    e.dataTransfer.setData('pieza', e.target.innerHTML);
    casilla = e.target;
    casilla.style.color = "purple";

    if (blancas.includes(e.target.innerText)) piezaOrigen = "blanca";
    else if (negras.includes(e.target.innerText)) piezaOrigen = "negra";
}

function dragover(e) {
    e.preventDefault();
}

function drop(e) {
    if (casilla != e.target) {
        if (blancas.includes(e.target.innerText)) piezaDestino = "blanca";
        else if (negras.includes(e.target.innerText)) piezaDestino = "negra";

        if (piezaOrigen != piezaDestino) {
            pieza = e.dataTransfer.getData('pieza');
            e.target.innerHTML = pieza;
            casilla.draggable = false;
            casilla.innerHTML = "";
            e.target.id = "pieza";
            e.target.draggable = true;
        } else piezaDestino = "";
    }
    casilla.style.color = "black";
}

function seleccion(evento) {
    if (seleccionado) {
        if (evento.target != casillaSeleccionada) {
            if (blancas.includes(evento.target.innerText)) piezaDestino = "blanca";
            else if (negras.includes(evento.target.innerText)) piezaDestino = "negra";

            if (piezaOrigen != piezaDestino) {
                evento.target.innerHTML = pieza;
                casillaSeleccionada.innerHTML = "";
                casillaSeleccionada.draggable = false;
                evento.target.draggable = true;
            }
            pieza = "";
            piezaDestino = "";
        }
        casillaSeleccionada.style.color = "black";
        casillaSeleccionada = "";
        seleccionado = false;
    } else {
        if (evento.target.innerHTML != "") {
            casillaSeleccionada = evento.target;
            casillaSeleccionada.style.color = "red";
            seleccionado = true;
            pieza = evento.target.innerHTML;
            
            if (blancas.includes(evento.target.innerText)) piezaOrigen = "blanca";
            else if (negras.includes(evento.target.innerText)) piezaOrigen = "negra";
        }
    }
}