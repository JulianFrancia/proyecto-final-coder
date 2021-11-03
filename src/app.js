import Express from 'express';
import productosRouter from './routes/productos.route.js';
import carritoRouter from './routes/carrito.route.js';
import { mongoLocalDao } from './DAO/mongoLocalDao/mongoLocalDao.js';
import { FirebaseDao } from './DAO/firebase/firebaseDao.js';
import { fsDAO } from './DAO/filesystemDAO/filesystemDAO.js'
import { Sqlite3DAO } from './DAO/sqlDAO/sqlite3Dao.js';
import { MariaDBDAO } from './DAO/sqlDAO/mariaDBDao.js';
import { memPpalDAO } from './DAO/memoriaPpalDAO/memPpalDAO.js';
import { AtlasDao } from './DAO/atlas/atlasDAO.js'

const daoObject = {
    0: mongoLocalDao,
    1: FirebaseDao,
    2: fsDAO,
    3: Sqlite3DAO,
    4: MariaDBDAO,
    5: memPpalDAO,
    6: AtlasDao
}

export const daoSelected = new daoObject[4]();
const app = Express();

app.use(Express.json());
app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);

app.get("/", (req,res) => {
    return res.json({message: "bienvenido"})
});

export default app;