import Carrito from "../models/Carrito.js";
import { productos } from "./productos.controller.js";
import { daoSelected } from '../app.js';
import fs, { read } from 'fs'
import { response } from "express";

const carrito = new Carrito([]);

export const listarProductosCarrito = (req,res) => {
        daoSelected.read('carrito')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            console.log(error)
        });
}

export const agregarProductoCarrito = (req,res) => {
    daoSelected.read('productos',req.params.id_producto)
    .then(producto => {
        daoSelected.insert('carrito',producto);
        return res.status(201).json(producto);
    })
    .catch((error) => {
        console.log(error)
        return res.status(404).json({message: 'No se pudo agregar el producto porque no existe'});
    })
}

export const borrarProductoCarrito = (req,res) => {
    const {id} = req.params;
    daoSelected.delete('carrito',id).then(response => {
        return res.status(200).end();
    }).catch(error => {
        return res.status(404).json({message: 'Producto no encontrado.'})
    });
}