import { v4 } from "uuid";

export class memPpalDAO {
    constructor() {
        this.productos = [];
        this.carrito = {productos:[]}
    }

    insert(model,schema) {
        if(model == 'productos') {
            schema["id"] = v4();
            this.productos.push(schema)
        } else {
            this.carrito.productos.push(schema);
        }
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
        let pos = this.productos.findIndex(elem => elem.id == query);
        this.productos[pos] = schema;
    }

    delete(model,query) {
        if(model == 'productos') {
            let pos = this.productos.findIndex(elem => elem.id == query);
            this.productos.splice(pos,1);
        } else {
            let pos = this.carrito.productos.findIndex(elem => elem.id == query);
            this.carrito.productos.splice(pos,1);
        }
    }
}