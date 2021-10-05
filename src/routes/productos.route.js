import { Router } from "express";
import { listarProductos, agregarProducto, actualizarProducto, borrarProducto } from "../controllers/productos.controller.js";

const productosRouter = Router();

productosRouter.get('/listar/:id?', listarProductos);
productosRouter.post('/agregar', agregarProducto);
productosRouter.put('/actualizar/:id', actualizarProducto);
productosRouter.delete('/borrar/:id', borrarProducto);

export default productosRouter;