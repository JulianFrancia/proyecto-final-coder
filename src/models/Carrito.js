import { v4 } from "uuid";
export class Carrito {
    constructor(productos) {
        this.id = v4();
        this.timeStamp = Date.now();
        this.productos = productos; 
    }
}

export default Carrito;