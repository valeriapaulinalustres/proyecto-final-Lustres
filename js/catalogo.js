//cargar productos del local storage

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})


function cargarDelStorage() {
    if (localStorage.getItem("CART")) {
        CARTStorage = JSON.parse(localStorage.getItem("CART"))
        for (const objeto of CARTStorage) {
            let idSesionesEnStorage = parseInt(objeto.id);
            let sesionEnProducts = PRODUCTS.find((obj) => obj.id == idSesionesEnStorage);
            console.log(sesionEnProducts)
            construirProducto = new ProductCart(sesionEnProducts);
            construirProducto.quantity = objeto.quantity
            construirProducto.total = objeto.total
            CART.push(construirProducto);
            console.log(CART)
            showProductCarts();
            calculateTotalCart();
        }
    }
}

//trae datos de las sesiones de fotografía desde el data.json
const fetchData = async () => {
    try {
        const res = await fetch('data.json')
        const data = await res.json()
        console.log(data)
        dataAProducts(data)
        cargarDelStorage()
    } catch (error) {
        console.log(error)
    }
}

//función que pasa la data obtenida del data.json a la variable PRODUCTS para ejecutar las acciones realizadas en clases anteriores y mostrarlas
function dataAProducts(data) {
    return PRODUCTS = data
}

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

//MUESTRA LISTADO DE SESIONES OFRECIDAS - botones de filtro de precios

//INICIO DE LA CARGA DE TODAS LAS SESIONES CON EJEMPLO DE ASINCRONÍA
document.getElementById("btnShowProductAll").onclick = () => {
    Toastify({
        text: "Aguarde un momento por favor",
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
    pintarListaSesiones()
        .then((solve) => {
            solve = showProducts("all")
        })
        .catch((error) => {
            console.log(error)
        })
}

const pintarListaSesiones = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (PRODUCTS == 0) {
                reject("NO HAY SESIONES DISPONIBLES")
            } else {
                resolve()
            }
        }, 2000)
    })
}
//FIN ASINCRONÍA "ALL"

//INICIO DE LA CARGA DE LAS SESIONES "CHEAP" CON EJEMPLO DE ASINCRONÍA
document.getElementById("btnShowProductCheap").onclick = () => {
    Toastify({
        text: "Aguarde un momento por favor",
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
    pintarListaSesiones()
        .then((solve) => {
            solve = showProducts("cheap")
        })
        .catch((error) => {
            console.log(error)
        })
}
//FIN ASINCRONÍA "CHEAP"

//INICIO DE LA CARGA DE LAS SESIONES "EXPENSIVE" CON EJEMPLO DE ASINCRONÍA
document.getElementById("btnShowProductExpensive").onclick = () => {

    Toastify({
        text: "Aguarde un momento por favor",
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
    pintarListaSesiones()
        .then((solve) => {
            solve = showProducts("expensive")
        })
        .catch((error) => {
            console.log(error)
        })
}
//FIN ASINCRONÍA "EXPENSIVE"

const showProducts = (category = "all") => {
    const divProducts = document.getElementById("products");
    let htmlListProducts = "";
    let products = [];
    if (category == "cheap") products = PRODUCTS.filter((p) => p.price < 2000);
    else if (category == "expensive")
        products = PRODUCTS.filter((p) => p.price >= 6000);
    else products = PRODUCTS;

    //PINTA EN EL HTML el listado de sesiones ofrecidas
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