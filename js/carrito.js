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