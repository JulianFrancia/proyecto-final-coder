import { atlasDAO } from "../app.js"
import { PRODUCTOS_MODEL } from "../DAO/Atlas.js";

export const agregarProductoService = (producto, file) => {
    const { originalname } = file;
    atlasDAO.insertProducto(producto, originalname);
}

export  const listarProductosService = (id=null) => {
    return atlasDAO.read(PRODUCTOS_MODEL,id? {_id:id} : null)
    .then(response => response)
    .catch(error => console.log(error));
}

export const actualizarProductoService = (id, producto) => {
    return atlasDAO.update(PRODUCTOS_MODEL, id, producto)
    .then(response => response)
    .catch(error => console.log(error));
}

export const borrarProductoService = (id) => {
    return atlasDAO.delete(PRODUCTOS_MODEL, id)
    .then(response => response)
    .catch(error => console.log(error));
}