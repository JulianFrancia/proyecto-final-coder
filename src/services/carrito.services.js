import { atlasDAO } from "../app.js";
import { PRODUCTOS_MODEL, CARRITO_MODEL, USUARIO_MODEL } from "../DAO/Atlas.js";

export const listarProductosCarritoService = (userId) => {
    return atlasDAO.read(USUARIO_MODEL, {_id: userId})
    .then(response => {
        return response["carrito"];
    })
    .catch(error => {
        console.log(error)
    });
}

export const agregarProductoCarritoService = (id_producto, userId) => {
    return atlasDAO.read(PRODUCTOS_MODEL, {_id: id_producto})
    .then(producto => {
        atlasDAO.insertProductCarrito(producto, userId);
        return producto;
    })
    .catch(err => console.log(err))
}

export const borrarProductoCarritoService = (id, userId) => {
return atlasDAO.deleteProductCarrito(id, userId)
.then(response => {
    return response;
}).catch(error => {
    console.log(error);
});
}