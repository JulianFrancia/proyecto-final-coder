import Express from 'express';
import productosRouter from './routes/productos.route.js';
import carritoRouter from './routes/carrito.route.js';

const app = Express();

app.use(Express.json());
app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);

app.get("/", (req,res) => {
    return res.json({message: "bienvenido"})
});

export default app;