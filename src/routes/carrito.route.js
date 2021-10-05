import { Router } from "express";
import { listarProductosCarrito, agregarProductoCarrito , borrarProductoCarrito} from "../controllers/carrito.controller.js";

const carritoRouter = Router();

carritoRouter.get('/listar/:id?', listarProductosCarrito);
carritoRouter.post('/agregar/:id_producto', agregarProductoCarrito);
carritoRouter.delete('/borrar/:id', borrarProductoCarrito);

export default carritoRouter;