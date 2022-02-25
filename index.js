document.addEventListener('DOMContentLoaded',() =>{
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch ('data.json')
        const data = await res.json()
        console.log(data)
        dataAProducts(data)
    } catch (error) {
        console.log(error)
    }
}
let CART = [];
let PRODUCTS = [];

function dataAProducts (data) { return PRODUCTS = data
    
}

//variables de colores

let rosa = "#E0A098";
let rosaOscuro = "#cf938c";
let celeste = "#98CBCB";
let celesteOscuro = "#84adad";
let amarilloClaro = "#fff4ad";
let amarilloOscuro = "#fde757";


//Sweet alert de bienvenida
Swal.fire({
    title: '¡Bienvenido al carrito de compras!',
    imageUrl: "./src/assets/image/recien-nacido-canasta.jpg",
    imageWidth: 500,
    imageAlt: 'Bebé en canasto',
    background: celeste,
    confirmButtonText: "Gracias",
    confirmButtonColor: rosa,
    color: "#ffffff",

});


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
    let cantidadPorItem = "";
    let botones = document.getElementsByClassName("deleteItem");
    for (const boton of botones) {
        boton.onclick = (event) => {
            const id = +event.target.id;
            let cartItems = document.getElementById(`cartItems-${id}`);

            //busco id del producto para capturar su índice
            const capturarIndiceDelObjetoABorrar = CART.findIndex(
                (product) => product.id === id
            );
            let resumenItem = "";

            swal.fire({
                    title: "¿Está seguro de eliminar este ítem?",
                    text: resumenItem,
                    icon: "warning",
                    iconColor: rosa,
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminarlo",
                    cancelButtonText: "No, cancelar",
                    reverseButtons: true,
                    confirmButtonColor: rosa,
                    cancelButtonColor: celeste,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        swal.fire({
                            title: "Ítem eliminado",
                            confirmButtonColor: rosa,
                            color: celeste,
                        });


                        if (capturarIndiceDelObjetoABorrar === -1) {
                            return swal.fire({
                                title: "No se encontró el id de este producto en nuestras bases de datos ",
                                text: resumenItem,
                                icon: "warning",
                            });
                        } else {
                            if (CART[capturarIndiceDelObjetoABorrar].quantity === 1) {
                                CART.splice(capturarIndiceDelObjetoABorrar, 1);
                                //borra nodo del DOM al mostrar solo los que quedan
                                showProductCarts();
                                //actualiza total:
                                calculateTotalCart();
                                //borrar de local storage
                                localStorage.removeItem(CART[capturarIndiceDelObjetoABorrar])
                                //actualiza local storage
                                updateCache()

                            } else {
                                //para disminuir la cantidad en 1
                                CART[capturarIndiceDelObjetoABorrar].quantity =
                                    CART[capturarIndiceDelObjetoABorrar].quantity - 1;
                                //para calcular restar el precio unitario borrado, del precio total
                                CART[capturarIndiceDelObjetoABorrar].total =
                                    CART[capturarIndiceDelObjetoABorrar].total - CART[capturarIndiceDelObjetoABorrar].unit_price;
                                showProductCarts();
                                calculateTotalCart();
                                updateCache()
                            }
                        }

                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swal.fire({
                            title: "Operación cancelada",
                            confirmButtonColor: rosa,
                            color: celeste,
                        });
                    }
                });
        };
    };
    registerClickEvent();
}



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
    if (productInCart) {
        productInCart.add();
        //para que sume una unidad y el precio al carro en el local storage
        updateCache()
    
    }
    else {
        const productCart = new ProductCart(product);
        CART.push(productCart);
        //actualiza localStorage
        updateCache();
        //
    }
    showProductCarts();
    calculateTotalCart();

};

//suma el total de la compra
let suma = "";
const calculateTotalCart = () => {
    suma = 0;
    CART.forEach((p) => (suma += p.total));
    const elementTotal = document.getElementById("totalCart");
    elementTotal.innerHTML = suma;
    //con if tradicional
    //if (suma >= 20000) {alert("Su carrito supera los $20.000")};
    //con operador &&
    suma >= 20000 && //alert("Su carrito supera los $20.000")
        Toastify({
            text: "Su carrito supera los $20.000",
            duration: 7000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #ff24ed, #ff2f52)",
            },
        }).showToast();
}

calculateTotalCart();
showProducts();

// CUPÓN de descuento
const discount = 1234;
const btnDiscount = document.getElementById("btnDiscount");

btnDiscount.onclick = () => {
    let cuponIngresado = parseInt(document.getElementById("cuponIngresado").value);

    //Toastify
    Toastify({
        text: "Usted ingresó: " + cuponIngresado,
        duration: 3000,
        newWindow: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: amarilloClaro,
            color: rosa,
        },
    }).showToast();


    if (cuponIngresado === discount) {

        function descuento(numero) {
            return numero * 80 / 100

        }

        let montoConDescuento = descuento(parseInt(suma))
        console.log("hola" + montoConDescuento)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cupón válido, obtendrá un descuento del 20% sobre el total de su compra.',
            text: 'Total: $' + suma + '.' + 'Monto final a pagar $' + montoConDescuento,
            showConfirmButton: false,
            timer: 5000,
            iconColor: rosa,
            color: celesteOscuro,

        })


    } else {
        Swal.fire({
            title: 'Cupón ingresado inválido. Por favor, inténtelo nuevamente.',
            color: celeste,
            confirmButtonColor: rosa,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
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

    //Sweet alert para confirmar vaciado:
    Swal.fire({
        title: '¿Está seguro de vaciar el carrito?',
        text: "Perderá los ítems seleccionados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, vaciar el carrito',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        confirmButtonColor: rosa,
        cancelButtonColor: celeste,
        iconColor: rosa,

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Se ha vaciado su carrito',
                confirmButtonColor: rosa,
                color: celesteOscuro,
            })
            //vaciar array CART:
            CART.splice(0, CART.length);
            //Borrar DOM y agregar <p></p>
            productsOnCart.innerHTML = "<p>Carrito Vacío</p>";
            //vaciar localStorage
            localStorage.clear()
            //total en cero:
            calculateTotalCart()
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire({
                title: 'Operación cancelada',
                confirmButtonColor: rosa,
                color: celesteOscuro,
            })
        }
    })
}



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

    //Sweet alert para listar sesiones y confirmar compra:
    Swal.fire({
        title: 'Total: $' + suma + '.' + '¿Desea pagar?',
        text: resumen,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
        cancelButtonColor: celeste,
        confirmButtonColor: rosa,
        iconColor: rosa,
    }).then((result) => {
        if (result.isConfirmed) {
            swal.fire({
                title: 'Se procederá al pago de su compra',
                confirmButtonColor: rosa,
                color: celesteOscuro,
            })
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swal.fire({
                title: 'Operación cancelada',
                text: 'Muchas gracias',
                confirmButtonColor: rosa,
                color: celesteOscuro,
            })
        }
    })


    /*
    alert("Listado de sesiones en su carrito:" + "\n" + resumen);
    askPay = prompt("¿Desea pagar? si/no")
*/

    // if else tradicional:
    //if (askPay === "si") {alert("se procederá al pago, muchas gracias por su compra")
    //    } else {alert("muchas gracias")}

    //operador ternario:
    //askPay === "si" ? alert("se procederá al pago, muchas gracias por su compra") : alert("muchas gracias")
}

