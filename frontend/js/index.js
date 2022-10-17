const url = '../backend/productos.json'
const productos = [];
// Creamos a la funcion BD para que bsuque a la variable url, recuperamos los datos localizados en la var url, y los pusheamos a el array productos   


const cat = document.getElementById('catalogo');

let catalogo = () => { 
    productos.forEach(info => {
        //carta 
        const card = document.createElement('div');
        card.className = "card m-2 p-2";
        card.style = 'width: 18rem';
        // imagen 
        const image = document.createElement('img')
        image.src = info.foto;
        image.className = "card-img-top";
        image.alt = info.nombre;
         // cuerpo de la carta
         const cardBody = document.createElement('div');
         cardBody.innerHTML = `
         <h5>${info.nombre}</h5>
         <p>$${info.precio} </p>
     `; 
        // boton
        const button = document.createElement('button');
        button.className = "btn btn-success";
        button.innerText = "Agregar";
        // 
        cat.appendChild(card);
        card.appendChild(image);
        card.appendChild(cardBody);
        cardBody.appendChild(button);
    })
} 

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







