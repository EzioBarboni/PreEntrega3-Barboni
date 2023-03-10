// Verduleria.online ------> (Carrito de compras) // 

class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio; 
        this.img = img;
        this.cantidad = 1;
    }
}

// Los precios son por kilo; No tengo ni idea de los precios jajaja

const Banana = new Producto(1, "Banana", 50, "img/bananaImg.png");
const Berenjena = new Producto(2, "Berenjena", 75, "img/berenjenaImg.png");
const Lechuga = new Producto(3, "Lechuga", 55, "img/lechugaImgOriginal.png");
const Tomate = new Producto(4, "Tomate", 45, "img/tomateImg.png");
const Zanahoria = new Producto(5, "Zanahoria", 60, "img/zanahoriaImg.png");

//Array de catálogo de productos

const productos = [Banana, Berenjena, Lechuga, Tomate, Zanahoria]; 

//Array del carrito 

let carrito = [];

/** CARGAR CARRITO DESDE EL LOCALSTORAGE **/

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Modifico DOM para mostrar productos  

const contenedorProductos = document.getElementById("contenedorProductos");

//Función para mostrar los productos que estan en stock

const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom imgProductos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <p> ${producto.precio} </p>
                        <button class = "btn colorBoton" id = "boton${producto.id}" >Agregar al Carrito</button>
                    </div>
                </div>`

        contenedorProductos.appendChild(card);


        //Agregar los productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })

    })
}
mostrarProductos();            

//Función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    console.log(carrito);
    calcularTotal();
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Mostrar el carrito de compras: 

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom imgProductos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar </button>
                    </div>
                </div>`

        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

//Función que elimina el producto del carrito: 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

    //LocalStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciar todo el carrito de compras

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage: 
    localStorage.clear();
}

//Total de la compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach( producto => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad. 
    })
    total.innerHTML = `Total $${totalCompra}`;
}