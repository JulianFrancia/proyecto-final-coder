import { v4 } from "uuid";

export class Producto {
    constructor(nombre, descripcion, codigo, imagen, precio, stock) {
        this.id = v4();
        this.timeStamp = Date.now();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
    }
}