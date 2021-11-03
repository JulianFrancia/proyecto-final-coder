import { Producto } from "../models/Productos.js";
import { daoSelected } from '../app.js';

export const productos = [];

export const agregarProducto = (req, res) => {
    try {
        const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
        const producto = new Producto(nombre, descripcion, codigo, imagen, precio, stock);
        productos.push(producto);
        daoSelected.insert('productos',req.body);
        return res.status(201).json(producto);
    } catch(error) {
        console.log(error)
    }
}

export const listarProductos = (req, res) => {
    try {
        const {id} = req.query;
        daoSelected.read('productos',id)
        .then(productos => {
            return res.status(200).json(productos);
        })
        .catch(error => {
            console.log(error)
        })
    } catch(error) {
        console.log(error)
    }
}

export const actualizarProducto = (req, res) => {
    try {
        const { id } = req.params;
        daoSelected.update('productos',id, req.body)
        .then(producto => {
            return res.status(200).json(req.body)
        })
        .catch(error => res.status(404).json({message: "Producto no encontrado"}));
    } catch(error) {
        console.log(error)
    }
}

export const borrarProducto = (req, res) => {
    try {
        const {id} = req.params;
        daoSelected.delete('productos',id)
        .then(producto => {
            return res.status(200).end();
        })
        .catch(error => {
            return res.status(404).json({message: 'Producto no encontrado.'})
        });
    } catch (error) {
        console.log(error)
    }
}