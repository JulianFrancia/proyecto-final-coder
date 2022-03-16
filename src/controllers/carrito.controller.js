import { listarProductosCarritoService, agregarProductoCarritoService, borrarProductoCarritoService } from '../services/carrito.services.js';


export const listarProductosCarrito = (req,res) => {
    listarProductosCarritoService(req.baseUrl.slice(req.baseUrl.lastIndexOf('/')+1))
    .then(response => res.status(200).json(response))
    .catch(error => console.log(error));
}

export const agregarProductoCarrito = (req,res) => {
    const { id_producto} = req.params;
    agregarProductoCarritoService(id_producto, req.baseUrl.slice(req.baseUrl.lastIndexOf('/')+1))
    .then(response => res.status(200).json(response))
    .catch(error => console.log(error))
}

export const borrarProductoCarrito = (req,res) => {
    const {id} = req.params;
    borrarProductoCarritoService(id, req.baseUrl.slice(req.baseUrl.lastIndexOf('/')+1))
    .then(response => res.status(200).end())
    .catch(error => res.status(404).json({message: 'Producto no encontrado.'}));
}