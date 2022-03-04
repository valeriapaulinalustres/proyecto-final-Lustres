//clase para construir objetos(sesiones)

class ProductCart {

    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.unit_price = obj.price
        this.img = obj.img
        this.total = this.unit_price
        this.quantity = 1
    }
    add() {
        this.quantity++
        this.total += this.unit_price
    }
}

//muestra lo que se va agregando al carrito
const addCart = (event) => {
    const productId = parseInt(event.target.id.split("-")[1]);
    const product = PRODUCTS.find((p) => p.id == productId);
    const productInCart = CART.find((p) => p.id == productId);

    if (productInCart) {
        productInCart.add(); //método de la class productCart (en "carrito.js")
        console.log(productInCart)
        //para que sume una unidad y el precio al carro en el local storage
        updateCache();
    } else {
        const productCart = new ProductCart(product);
        CART.push(productCart);
        //actualiza localStorage
        updateCache();
        //
    }
    showProductCarts();
    calculateTotalCart();
};

//PINTA listado de sesiones en el carrito
const showProductCarts = () => {
    const divCart = document.getElementById("productsOnCart");
    let htmlListProducts = "";
    CART.forEach((product) => {
        htmlListProducts += `
            <div id="cartItems-${product.id}" class="carrito-info" style="border: 1px solid #ffffff">
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
            const id = +event.target.id;
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

// Vaciar el carrito
let cartItems = document.getElementById("cartItems");
let botonVaciarTodo = document.getElementById("vaciarTodo");
botonVaciarTodo.addEventListener("click", borrarNodoCartItems);

function borrarNodoCartItems() {
    let productsOnCart = document.getElementById("productsOnCart");
    if ( //CART.length == 0 || CART.length == undefined
        !CART.length) {
        Swal.fire({
            title: 'Su carrito está vacío',
            text: "Puede comenzar a comprar",
            icon: 'warning',
            confirmButtonText: 'OK',
            reverseButtons: true,
            confirmButtonColor: rosa,
            iconColor: rosa,
        })
    } else {
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
}

//ASINCRONÍA EN LO REFERIDO AL CUPÓN DE DESCUENTO
const discount = 1234;
const btnDiscount = document.getElementById("btnDiscount");

btnDiscount.onclick = () => {
    if (!CART.length) {
        Swal.fire({
            title: 'Su carrito está vacío',
            text: "Puede comenzar a comprar",
            icon: 'warning',
            confirmButtonText: 'OK',
            reverseButtons: true,
            confirmButtonColor: rosa,
            iconColor: rosa,
        })
    } else {
        Toastify({
            text: "Aguarde un momento mientras se procesa su código, por favor",
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
        verificarIngresoInput()
            .then((solve) => {
                solve = verificarInput()
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

const verificarIngresoInput = () => {
    return new Promise((resolve, reject) => {
        let cuponIngresado = document.getElementById("cuponIngresado").value;
        setTimeout(() => {
            if (cuponIngresado === "") {
                reject("no se ha ingresado un código")
                Toastify({
                    text: "No ha ingresado ningún código. Inténtelo nuevamente por favor",
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
            } else {
                resolve()
            }
        }, 3000)
    })
}

function verificarInput() {
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
//FIN DE ASINCRONÍA EN RELACIÓN AL BOTÓN DE DESCUENTO

//botón Pagar
let askPay = "";
const btnPay = document.getElementById("btnPay")
btnPay.onclick = () => {
    if (!CART.length) {
        Swal.fire({
            title: 'Su carrito está vacío',
            text: "Puede comenzar a comprar",
            icon: 'warning',
            confirmButtonText: 'OK',
            reverseButtons: true,
            confirmButtonColor: rosa,
            iconColor: rosa,
        })
    } else {
        //uso del SPREAD para que salga por consola el contenido del array del carrito (CART)
        console.log(...CART)
        let resumen = "";
        //For of para obtener de cada producto (objeto) del carrito, su numbre y su cantidad, y sacarlo luego por un único alert:
        for (const obj of CART) {
            //Desestructuración (para evitar usar obj.name y obj.quantity)
            let {
                name,
                quantity,
                total
            } = obj
            resumen += `Sesión de fotografía de ${name}, cantidad: ${quantity}, subtotal: $ ${total} . \n `;
        }
        //Sweet alert para listar sesiones y confirmar compra:
        Swal.fire({
            title: 'Total: $' + suma + '. ' + '¿Desea pagar?',
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
    }
}