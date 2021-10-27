export class memPpalDAO {
    constructor() {
        this.productos = [];
        this.carrito = {productos:[]}
    }

    insert(model,schema) {
        model == 'productos' ? this.productos.push(schema) : this.carrito.productos.push(schema);
    }

    read(model,query=null) {
        if(query) {
            if(model == 'productos') {
                return this.productos.find(elem => elem[query] == query)
            } else {
                return this.carrito.productos.find(elem => elem[query] == query)
            }
        } else {
            if(model == 'productos') {
                return this.productos
            } else {
                return this.carrito.productos
            }
        }
    }

    udpate(model,query,schema) {
        
    }
}