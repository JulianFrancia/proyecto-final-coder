import { atlasDAO } from "../app.js"
import { PRODUCTOS_MODEL } from "../DAO/Atlas.js";

export const agregarProductoService = (producto) => {
    atlasDAO.insert(PRODUCTOS_MODEL,producto);
}

export  const listarProductosService = (id=null) => {
    return atlasDAO.read(PRODUCTOS_MODEL,id)
    .then(response => response)
    .catch(error => console.log(error));S
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