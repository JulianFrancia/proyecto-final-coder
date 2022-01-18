import { Router } from "express";
import { signUp } from '../controllers/register.controller.js';

const registerRouter = Router();

registerRouter.post('/signUp', signUp);

export default registerRouter;