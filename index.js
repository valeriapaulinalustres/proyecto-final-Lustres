//if ((localStorage.getItem("CART") !== null)) {CART = JSON.parse(localStorage.getItem("CART"))}

//muestra listado de sesiones en el carrito
const showProductCarts = () => {
    const divCart = document.getElementById("productsOnCart");
    let htmlListProducts = "";
    CART.forEach((product) => {
        htmlListProducts += `
            <div id="cartItems-${product.id}" class="carrito-info" style="border: 1px solid #98CBCB">
                <img src="${product.img}" width="100"></img><br>
                <b>${product.name}</b><br>
                <i>Cantidad: ${product.quantity}</i>
                <p>Unitario: $ ${product.unit_price}</p>
                <p>Total: $ ${product.total}</p>
                <button class="contactos deleteItem" id="${product.id}">❌</button>
            </div>
        `;
    });
    divCart.innerHTML = htmlListProducts;

    //para borrar items del carrito
    let botones = document.getElementsByClassName("deleteItem");
    for (const boton of botones) {
        boton.onclick = (event) => {
            const id = parseInt(event.target.id);
            let cartItems = document.getElementById(`cartItems-${id}`);

            //busco id del producto para capturar su índice
            const capturarIndiceDelObjetoABorrar = CART.findIndex(
                (product) => product.id === id
            );
            const siBorrar = prompt(
                "¿Seguro desea eliminar del carrito? Responda: si/no "
            );
            if (siBorrar === "si") {
                //borrar producto
                CART.splice(capturarIndiceDelObjetoABorrar, 1);
                //borrar nodo del DOM
                cartItems.remove();
                alert("Producto borrado");
            } else {
                alert("gracias");
            }
        };
    }
    registerClickEvent();
};

//muestra botones para seleccionar filtrado
const showProducts = (category = "all") => {
    const divProducts = document.getElementById("products");
    let htmlListProducts = "";
    let products = [];

    if (category == "cheap") products = PRODUCTS.filter((p) => p.price < 2000);
    else if (category == "expensive")
        products = PRODUCTS.filter((p) => p.price >= 6000);
    else products = PRODUCTS;

    //muestra listado de sesiones ofrecidas
    products.forEach((product) => {
        htmlListProducts += `
            <div class="container-js" style="border: 2px solid white">
                <img src="${product.img}" height="50"></img><br>
                <b>${product.name}</b>
                <p>$ ${product.price}</p>
                <button class="addCart contactos" id="p-${product.id}">Comprar 🛒</button>
            </div>
        `;
    });
    divProducts.innerHTML = htmlListProducts;
    registerClickEvent();
};

//evento clic en botón comprar
const registerClickEvent = () => {
    const btnAddCarts = document.getElementsByClassName("addCart");
    for (const btn of btnAddCarts) {
        btn.onclick = addCart;
    }
};

//muestra lo que se va agregando al carro
const addCart = (event) => {
    const productId = parseInt(event.target.id.split("-")[1]);
    const product = PRODUCTS.find((p) => p.id == productId);
    const productInCart = CART.find((p) => p.id == productId);
    if (productInCart) productInCart.add();
    else {
        const productCart = new ProductCart(product);
        CART.push(productCart);
        //actualiza localStorage
        updateCache();
        //
    }
    showProductCarts();
    CalculateTotalCart();

};

//suma el total de la compra
const CalculateTotalCart = () => {
    let suma = 0;
    CART.forEach((p) => (suma += p.total));
    const elementTotal = document.getElementById("totalCart");
    elementTotal.innerHTML = suma;
    //con if tradicional
    //if (suma >= 20000) {alert("Su carrito supera los $20.000")};
    //con operador &&
    suma >= 20000 && alert("Su carrito supera los $20.000")
};
CalculateTotalCart();
showProducts();

// CUPÓN de descuento
const discount = 1234;
const btnDiscount = document.getElementById("btnDiscount");

btnDiscount.onclick = () => {
    let cuponIngresado = parseInt(document.getElementById("cuponIngresado").value);
    alert("usted ingresó" + cuponIngresado)
    if (cuponIngresado === discount) {
        alert("Cupón válido, obtendrá un descuento del 20% sobre el total de su compra.")
        //aquí falta el cálculo
    } else {
        alert("Cupón ingresado inválido. Por favor, inténtelo nuevamente.");
    }
};

//botones de filtro de precios
document.getElementById("btnShowProductAll").onclick = () => {
    showProducts("all");
};
document.getElementById("btnShowProductCheap").onclick = () => {
    showProducts("cheap");
};
document.getElementById("btnShowProductExpensive").onclick = () => {
    showProducts("expensive");
};

// Vaciar el carrito
let cartItems = document.getElementById("cartItems");
let botonVaciarTodo = document.getElementById("vaciarTodo");
botonVaciarTodo.addEventListener("click", borrarNodoCartItems);

function borrarNodoCartItems() {
    let productsOnCart = document.getElementById("productsOnCart");
    const siVaciar = prompt("¿Seguro desea vaciar el carrito? Responda: si/no ");

    if (siVaciar === "si") {
        CART.splice(0, CART.length);
        productsOnCart.innerHTML = "<p>Carrito Vacío</p>";
    } else {
        alert("gracias");
    }
}
//localStorage.clear()
let askPay = "";

//botón Pagar
const btnPay = document.getElementById("btnPay")
btnPay.onclick = () => {
    //uso del SPREAD para que salga por consola el contenido del array del carrito (CART)
    console.log(...CART)

    let resumen = "";
    //For of para obtener de cada producto (objeto) del carrito, su numbre y su cantidad, y sacarlo luego por un único alert:
    for (const obj of CART) {
        //Desestructuración (para evitar usar obj.name y obj.quantity)
        let {
            name,
            quantity
        } = obj
        resumen += "Nombre: " + name + ", " + "cantidad: " + quantity + "\n";
    }
    alert("Listado de sesiones en su carrito:" + "\n" + resumen);
    askPay = prompt("¿Desea pagar? si/no")

    // if else tradicional:
    //if (askPay === "si") {alert("se procederá al pago, muchas gracias por su compra")
    //    } else {alert("muchas gracias")}

    //operador ternario:
    askPay === "si" ? alert("se procederá al pago, muchas gracias por su compra") : alert("muchas gracias")
}