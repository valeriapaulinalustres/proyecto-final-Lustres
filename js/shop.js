/*

//El usuario selecciona todos las sesiones fotográficas que quiere y le devuelve alert con listado de las mismas


let numeroSesionesReserva = parseFloat(prompt("Inserte el número total de sesiones que reservará"))

console.log("Total de sesiones reservadas:" + " " + numeroSesionesReserva)

if (isNaN(numeroSesionesReserva)) {
    alert("no ingrese el número en letras, por favor")

} else {
    let sesiones = '';
    for (let index = 0; index < numeroSesionesReserva; index++) {
        sesiones += prompt("Ingrese el nombre de las sesiones fotográficas") + "\n";
    }
    alert("Usted reservará las siguientes sesiones fotográficas:" + "\n" + sesiones);
}





//suma de precios de todos los ítems seleccionados


let valorSesion;
let totalSesiones = 0;
for (let i = 0; i < numeroSesionesReserva; i++) {
    valorSesion = prompt("Ingrese el valor de una de las sesiones fotográficas: ");
    totalSesiones = parseFloat(totalSesiones) + parseFloat(valorSesion)
}

alert("El costo total de las sesiones fotográficas es de: " + parseFloat(totalSesiones));


//aplica descuento al valor total de la compra si es que tiene un código de descuento

const descuento = 20;

function precioConDescuento(precio, porcentaje) {
    return (precio - (precio * porcentaje / 100));

};
let codigo = "1234"
let codigoDescuento = parseInt(prompt("Ingrese si tiene, el código de descuento"));

if (codigoDescuento == codigo) {
    alert("El precio final es de: " + " " + "$" + precioConDescuento(totalSesiones, descuento));

} else {
    alert("Como usted no tiene el código de descuento, el precio final es de:" + " " + "$" + totalSesiones)

}




//CLASE 5

//creo clase (función constructora) con función que calcule precio*cantidad
class Compra {
    constructor(nombre, precio, cantidad) {

        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    reserva() {
        console.log("El cliente ha cargado en el carrito")
    }
}



let sesionIngresada = "";
let precioIngresado = 0;
let cantidadIngresada = 0;
let seguirComprando = "";

alert("Bienvenido al carrito de compras")

do {

    sesionIngresada = prompt("Ingrese el nombre del producto");
    precioIngresado = parseFloat(prompt("Ingrese el precio del producto"));
    cantidadIngresada = parseFloat(prompt("Ingrese la cantidad deseada"));
    //creo nuevo producto con los datos ingresados por el usuario
    const compraIngresada = new Compra(sesionIngresada, precioIngresado, cantidadIngresada)

    seguirComprando = prompt("¿Desea seguir agregando productos en el carrito?")

    //declaro la variable resultado 
    let respuestaCompra = "";
    //declaro el contenido de esa variable
    respuestaCompra += "Usted comprará:" + " " + compraIngresada.nombre + ", " + "precio:" + " " + compraIngresada.precio + ", " + "cantidad:" + " " + compraIngresada.cantidad + ". " + "\n"
    //salida con todo lo ingresado por el usuario
    alert(respuestaCompra)

    //calculo y alert de precio * cantidad
    let subtotal = precioPorUnidad(precioIngresado, cantidadIngresada);



    alert("El subtotal es de $ " + subtotal)
    //alert("El monto total a pagar es de $ " + totalPagar)




    //visualizo en consola el objeto "Producto1" ingresado por el usuario,  precio * cantidad y precio total
    console.log(compraIngresada)
    console.log("subtotal $" + subtotal)
    compraIngresada.reserva()


} while (seguirComprando == "si");



//funciones
function precioPorUnidad(precio, cantidad) {
    return (precio * cantidad)
};


*/
//CLASE 6

//Declaro clase Sesiones
class Sesiones {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = cantidad;
    }
}


//declaro array de carrito
const carrito = [];

//ingreso de sesiones solicitadas por usuario y salida por alert

alert("Bienvenido al carrito de compras")





let sesionSolicitada = prompt("Ingrese el nombre de la sesión fotográfica deseada");


while (sesionSolicitada != 'ESC') {
    carrito.push(sesionSolicitada);
    sesionSolicitada = prompt("Ingrese el nombre de la sesión fotográfica deseada");
}

alert("Usted tiene en su carrito las siguientes sesiones:" + "\n" + carrito)




//clase 7

//Listado de objetos (sesiones)

const sesionesDulceEspera = {
    nombre: "dulce espera",
    precio: 5000,
    cantidad: 5,
};

const sesionesRecienNacidos = {
    nombre: "recien nacidos",
    precio: 5000,
    cantidad: 5,
};

const sesionesBebes = {
    nombre: "bebes",
    precio: 5000,
    cantidad: 5,
};

const sesionesNinos = {
    nombre: "ninos",
    precio: 5000,
    cantidad: 5,
};

const sesionesTeens = {
    nombre: "teens",
    precio: 5000,
    cantidad: 5,
};

const sesionesFineArt = {
    nombre: "fine art",
    precio: 5000,
    cantidad: 5,
};

const sesionesNavidad = {
    nombre: "navidad",
    precio: 5000,
    cantidad: 5,
};

const sesionesComunion = {
    nombre: "comunion",
    precio: 5000,
    cantidad: 5,
};

const sesionesEscolares = {
    nombre: "escolares",
    precio: 5000,
    cantidad: 5,
};

//Declaro array de objetos a la venta
//const sesionesFotograficas = [sesionesDulceEspera, sesionesRecienNacidos, sesionesBebes, sesionesNinos, sesionesTeens, sesionesFineArt, sesionesNavidad, sesionesEscolares, sesionesComunion, ];

/*

//Pregntar precio ingresando nombre de sesión

function consultarPrecioSesion(sesionesFotograficas, nombreSesion) {
    return sesionesFotograficas.find(objeto => objeto.nombre === nombreSesion.toLowerCase());
}

let sesionInput = "";
sesionInput = prompt("Ingrese el nombre de la sesión fotográfica que desea consultar el precio");

while (sesionInput != "ESC") {
    let busquedaSesion = consultarPrecioSesion(sesionesFotograficas, sesionInput);
    if (busquedaSesion != undefined) {
        alert("Usted seleccionó: " + busquedaSesion.nombre + "\n" + " El costo es de $ " + busquedaSesion.precio);

    } else {
        alert("No existe una sesión fotográfica con ese nombre. Inténtelo nuevamente por favor.");
    };
    sesionInput = prompt("Ingrese el nombre de la sesión fotográfica que desea consultar el precio");

};

//Filtrar por precio ingresando un valor máximo

function filtroPrecios(sesionesFotograficas, precio) {
    return sesionesFotograficas.filter(objeto => objeto.precio < parseFloat(precio));
}

function listarPreciosBajos(preciosBajos) {
    let listaPreciosBajos = "";
    for (const sesiones of preciosBajos) {
        listaPreciosBajos += "Sesión Fotográfica: " + sesiones.nombre + "," + "precio: $" + sesiones.precio + "\n"
    }
    return listaPreciosBajos;
}

let precioInput = "";
precioInput = prompt("Filtro de precios. Ingrese precio máximo");


while (precioInput != "ESC") {
    let filtroIngresado = filtroPrecios(sesionesFotograficas, precioInput);
    if (filtroIngresado.length > 0) {
        alert(listarPreciosBajos(filtroIngresado));
    } else {
        alert("No existen sesiones con el precio menor al ingresado");
    }
    precioInput = prompt("Ingrese precio máximo");

}

// Alert con listado de nombres y precios de sesiones fotográficas ofrecidas:

let conocerListado = prompt("¿Desea conocer el listado de sesiones fotográficas ofrecido?");
let listaUnitaria = "";
let listaCompleta = "";

if (conocerListado === "si") {
    for (const lista of sesionesFotograficas) {
        listaUnitaria = (lista.nombre + ": " + "$" + lista.precio)
        listaCompleta += listaUnitaria + "\n";
    }
    alert(listaCompleta)

} else {
    alert("Gracias")

}

//alert con total de sesiones ofrecidas
alert("Total de opciones:" + sesionesFotograficas.length)

*/



//clase 8 DOM
//creo lista a partir de entradas del usuario al carrito

let padre = document.getElementById("carritoDOM");

for (const sesion of carrito) {
    let li = document.createElement('li');
    li.innerHTML = sesion;
    padre.appendChild(li);
}
//creo nodos a partir de mis objetos (sesiones)
let resume = document.getElementById("resumen");


for (const objeto of sesionesFotograficas) {
    let infoSesiones = document.createElement("p");
    infoSesiones.innerHTML = objeto["nombre"];
resume.append(infoSesiones);
}


//clase 9 Eventos

const botonComprarDulceEspera = document.getElementById("botonComprarDulceEspera");
const botonComprarRecienNacidos = document.getElementById("botonComprarRecienNacidos");
const botonComprarBebes = document.getElementById("botonComprarBebes");
const botonComprarNinos = document.getElementById("botonComprarNinos");
const botonComprarTeens = document.getElementById("botonComprarTeens");
const botonComprarFineArt = document.getElementById("botonComprarFineArt");
const botonComprarNavidad = document.getElementById("botonComprarNavidad");
const botonComprarEscolares = document.getElementById("botonComprarEscolares");
const botonComprarComunion = document.getElementById("botonComprarComunion");

function agregarAlCarrito(name) {
    const sesionAgregada = sesionesFotograficas.find(p => p.nombre == name);
    console.log ("Sesión agregada al carrito: "+ sesionAgregada.nombre);
    carrito.push(sesionAgregada);
    
};

botonComprarDulceEspera.onclick = () => agregarAlCarrito ("dulce espera");
botonComprarRecienNacidos.onclick = () => agregarAlCarrito ("recien nacidos");
botonComprarBebes.onclick = () => agregarAlCarrito ("bebes");
botonComprarNinos.onclick = () => agregarAlCarrito ("ninos");
botonComprarTeens.onclick = () => agregarAlCarrito ("teens");
botonComprarFineArt.onclick = () => agregarAlCarrito ("fine art");
botonComprarNavidad.onclick = () => agregarAlCarrito ("navidad");
botonComprarEscolares.onclick = () => agregarAlCarrito ("escolares");
botonComprarComunion.onclick = () => agregarAlCarrito ("comunion");




//da total al hacer clic en el botón "total"


document.getElementById("botonTotalShop").onclick = () =>{
const totalCarrito = carrito.reduce ((acc,el) => acc + el.precio,0);
console.log(totalCarrito);
alert("Total a pagar: $"+ totalCarrito);
}