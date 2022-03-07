import { agregarProductoService, listarProductosService, actualizarProductoService, borrarProductoService } from '../services/productos.services.js';

export const agregarProducto = async (req, res) => {
    try {
        await agregarProductoService(req.body);
        return res.status(201).json(req.body);
    } catch(error) {
        console.log(error)
    }
}

export const listarProductos = (req, res) => {
    const { id } = req.query;
    listarProductosService(id ? {"_id":id} : null)
    .then(response => {
        return res.status(200).json(response);
    })
    .catch(err => console.log(err))
}

export const actualizarProducto = (req, res) => {
    const { id } = req.params;
    actualizarProductoService(id, req.body)
        .then(producto => {
            return res.status(200).json(req.body)
        })
        .catch(error => res.status(404).json({message: "Producto no encontrado"}));
}

export const borrarProducto = (req, res) => {
    const {id} = req.params;
    borrarProductoService(id)
        .then(producto => {
            return res.status(200).end();
        })
        .catch(error => {
            return res.status(404).json({message: 'Producto no encontrado.'})
        });
}