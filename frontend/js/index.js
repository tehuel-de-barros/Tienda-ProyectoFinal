const url = '../backend/productos.json'
const productos = [];
let carrito = [];
// Creamos a la funcion BD para que bsuque a la variable url, recuperamos los datos localizados en la var url, y los pusheamos a el array productos   

const cat = document.getElementById('catalogo');
const contCar = document.getElementById('contCar');
const empty = document.getElementById('empty');
const contadorCar = document.getElementById('contadorCar');
let precio = document.getElementById('price');

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        //carrito tiene que ser let 
        carrito = JSON.parse(localStorage.getItem('carrito'));
        renderCar();
    }else return(console.log('No hay entradas en el localStorage'));
})

let catalogo = () => { 
    productos.forEach((info, index) => {
        //carta 
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${info.foto} alt= "${info.nombre}" class = "">
        <h3>${info.nombre}</h3>
        <p class="precioProducto">Precio:$ ${info.precio}</p>
        <button id="agregar${info.id}" class="btn btn-success">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        cat.appendChild(div);
        const button  = document.getElementById(`agregar${info.id}`);
        button.addEventListener('click', () => {
            agregarAlCarrito(info.id);
        })
    })
} 


let agregarAlCarrito = (ID) => {
        const items = productos.find(prod => prod.id === ID);
        carrito.push(items);
        console.log(carrito);
        renderCar();
    }

let renderCar = () => {
    contCar.innerHTML = "";

    carrito.forEach(producto => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio:$${producto.precio}</p>
        <p>Gama: <span id="cantidad">${producto.gama}</span></p>
        <button onclick="eliminarCar(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contCar.appendChild(div);
    })
    contadorCar.innerText = carrito.length;
    precio.innerText = carrito.reduce((contador, producto) => contador + producto.precio, 0);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

let eliminarCar = (ID) => { 
    const items = carrito.find(prod => prod.id === ID);
    let index = carrito.indexOf(items);
    carrito.splice(index, 1);
    renderCar();
}

let vaciarCar = () => {
    carrito.length = 0;
    renderCar();
}
empty.addEventListener('click', vaciarCar);



let BD = () => { 
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                productos.push(element)
            })
        catalogo()
        })
        
        .catch(err => console.log(err));
}

BD();
console.log(productos);



