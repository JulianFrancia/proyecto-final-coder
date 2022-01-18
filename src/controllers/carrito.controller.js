import Carrito from "../models/Carrito.js";
import { atlasDAO } from "../app.js";
import { PRODUCTOS_MODEL, CARRITO_MODEL } from "../DAO/Atlas.js";


export const listarProductosCarrito = (req,res) => {
    atlasDAO.read(CARRITO_MODEL)
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(error => {
        console.log(error)
    });
}

export const agregarProductoCarrito = (req,res) => {
        const { id_producto} = req.params;
        atlasDAO.read(PRODUCTOS_MODEL, {_id: id_producto})
        .then(producto => {
            atlasDAO.insert(CARRITO_MODEL, producto);
            return res.status(201).json(producto);
        })
        .catch(err => console.log(err))
}

export const borrarProductoCarrito = (req,res) => {
    const {id} = req.params;
    atlasDAO.delete(CARRITO_MODEL,id)
    .then(response => {
        return res.status(200).end();
    }).catch(error => {
        return res.status(404).json({message: 'Producto no encontrado.'})
    });
}