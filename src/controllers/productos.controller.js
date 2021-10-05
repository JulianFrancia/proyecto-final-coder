import { Producto } from "../models/Productos.js";
import fs from 'fs';

export const productos = [];

export const agregarProducto = (req, res) => {
    try {
        const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
        const producto = new Producto(nombre, descripcion, codigo, imagen, precio, stock);
        productos.push(producto);
        fs.writeFileSync('productos.txt', JSON.stringify(productos));
        return res.status(201).json(producto);
    } catch(error) {
        console.log(error)
    }
}

export const listarProductos = (req, res) => {
    try {
        const {id} = req.query;
        return id ? res.status(200).json(productos.find(elem => elem.id == id)) : res.status(200).json(productos); 
    } catch(error) {
        console.log(error)
    }
}

export const actualizarProducto = (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
        let producto = productos.find(elem => elem.id == id);
        if(!producto) {
            res.status(404).json({message: "Producto no encontrado"})
        } else {
            producto.nombre = nombre;
            producto.descripcion = descripcion;
            producto.codigo = codigo;
            producto.imagen = imagen;
            producto.precio = precio;
            producto.stock = stock;
            return res.status(200).json(producto);
        }
    } catch(error) {
        console.log(error)
    }
}

export const borrarProducto = (req, res) => {
    try {
        const {id} = req.params;
        let pos = productos.findIndex(elem => elem.id == id);
        if(pos == -1) {
            return res.status(404).json({message: 'Producto no encontrado.'})
        } else {
            productos.splice(pos,1);
            res.status(200).end();
        }
    } catch (error) {
        console.log(error)
    }
}