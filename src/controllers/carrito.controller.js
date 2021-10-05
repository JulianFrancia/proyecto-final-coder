import Carrito from "../models/Carrito.js";
import { productos } from "./productos.controller.js";
import fs from 'fs'

const carrito = new Carrito([]);

export const listarProductosCarrito = (req,res) => {
    try {
        const { id } = req.query;
        return id ? res.status(200).json(carrito.find(elem => elem.id == id)) : res.status(200).json(carrito);
    } catch (error) {
     console.log(error)   
    }
}

export const agregarProductoCarrito = (req,res) => {
    try {
        const { id_producto} = req.params;
        const producto = productos.find(elem => elem.id == id_producto);
        if(!producto) {
            return res.status(404).json({message: 'No se pudo agregar el producto porque no existe'});
        } else {
            carrito.productos.push(producto);
            fs.writeFileSync('carrito.txt', JSON.stringify(carrito));
            return res.status(201).json(producto);
        }
    } catch(error) {
        console.log(error)
    }
}

export const borrarProductoCarrito = (req,res) => {
    try {
        const {id} = req.params;
        let pos = carrito.productos.findIndex(elem => elem.id == id);
        if(pos == -1) {
            return res.status(404).json({message: 'Producto no encontrado.'})
        } else {
            carrito.productos.splice(pos,1);
            res.status(200).end();
        } 
    } catch (error) {
        console.log(error)
    }
}