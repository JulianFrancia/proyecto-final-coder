import { Router } from "express";
import { compraController } from '../controllers/ordenes.controller.js'

const ordenesRouter = Router();

ordenesRouter.post('/compra/:userId', compraController);

export default ordenesRouter;