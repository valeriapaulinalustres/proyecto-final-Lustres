const updateCache = () => {
    const cartJSON = JSON.stringify(CART)
    localStorage.setItem("CART", cartJSON)
}


//saca del storage, pasa de string a array y muestra por consola:
let storageItems = JSON.parse(localStorage.getItem("CART"));
console.log(storageItems)


