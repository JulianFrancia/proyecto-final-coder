import { atlasDAO } from "../app.js";
import { PRODUCTOS_MODEL, CARRITO_MODEL } from "../DAO/Atlas.js";

export const listarProductosCarritoService = () => {
    return atlasDAO.read(CARRITO_MODEL)
    .then(response => {
        return response;
    })
    .catch(error => {
        console.log(error)
    });
}

export const agregarProductoCarritoService = (id_producto) => {
    return atlasDAO.read(PRODUCTOS_MODEL, {_id: id_producto})
    .then(producto => {
        atlasDAO.insert(CARRITO_MODEL, producto);
        return producto;
    })
    .catch(err => console.log(err))
}

export const borrarProductoCarritoService = (id) => {
return atlasDAO.delete(CARRITO_MODEL,id)
.then(response => {
    return response;
}).catch(error => {
    console.log(error);
});
}