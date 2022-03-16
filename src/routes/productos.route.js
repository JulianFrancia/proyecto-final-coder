import { Router } from "express";
import multer from "multer";
import path from 'path';
import { listarProductos, agregarProducto, actualizarProducto, borrarProducto } from "../controllers/productos.controller.js";

const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/storage/imgs`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

const productosRouter = Router();

productosRouter.get('/listar/:id?', listarProductos);
productosRouter.post('/agregar', upload.single('imagen'), agregarProducto);
productosRouter.put('/actualizar/:id', actualizarProducto);
productosRouter.delete('/borrar/:id', borrarProducto);

export default productosRouter;