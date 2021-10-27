import Express from 'express';
import productosRouter from './routes/productos.route.js';
import carritoRouter from './routes/carrito.route.js';
import { mongoLocalDao } from './DAO/mongoLocalDao/mongoLocalDao.js';
import { FirebaseDao } from './DAO/firebase/firebaseDao.js';
import { fsDAO } from './DAO/filesystemDAO/filesystemDAO.js'

const daoObject = {
    0: mongoLocalDao,
    1: FirebaseDao,
    2:fsDAO
}

export const daoSelected = new daoObject[0]();
const app = Express();

app.use(Express.json());
app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);

app.get("/", (req,res) => {
    return res.json({message: "bienvenido"})
});

export default app;