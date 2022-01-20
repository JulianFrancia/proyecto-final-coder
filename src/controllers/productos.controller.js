import { Producto } from "../models/Productos.js";
import { atlasDAO } from "../app.js"
import { PRODUCTOS_MODEL } from "../DAO/Atlas.js"

export const productos = [];

export const agregarProducto = (req, res) => {
    try {
        const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
        const producto = new Producto(nombre, descripcion, codigo, imagen, precio, stock);
        atlasDAO.insert(PRODUCTOS_MODEL,req.body);
        return res.status(201).json(producto);
    } catch(error) {
        console.log(error)
    }
}

export const listarProductos = (req, res) => {
    const { id } = req.query;
    atlasDAO.read(PRODUCTOS_MODEL, id ? {"_id":id} : null)
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => console.log(err))
}

export const actualizarProducto = (req, res) => {
    const { id } = req.params;
        atlasDAO.update(PRODUCTOS_MODEL,id, req.body)
        .then(producto => {
            return res.status(200).json(req.body)
        })
        .catch(error => res.status(404).json({message: "Producto no encontrado"}));
}

export const borrarProducto = (req, res) => {
    const {id} = req.params;
        atlasDAO.delete('productos',id)
        .then(producto => {
            return res.status(200).end();
        })
        .catch(error => {
            return res.status(404).json({message: 'Producto no encontrado.'})
        });
}