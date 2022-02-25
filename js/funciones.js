//FUNCIONES RELACIONADAS AL LOCAL STORAGE


//actualiza el local storage desde el contenido del carrito
const updateCache = () => {
    const cartJSON = JSON.stringify(CART)
    localStorage.setItem("CART", cartJSON)
}


//saca del storage, pasa de string a array y muestra por consola:
let storageItems = JSON.parse(localStorage.getItem("CART"));
console.log(storageItems)

//al recargar la página dibuja el carrito si no estaba vacío
function cargarCarritoDeLocalStorage() {
    if (localStorage.getItem("CART") !== null) {
    CART = storageItems
    }
}