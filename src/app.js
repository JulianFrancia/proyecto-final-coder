/*Express */
import Express from 'express';
import session from 'express-session';
import express from 'express';
import path from 'path';
/*Routes */
import productosRouter from './routes/productos.route.js';
import carritoRouter from './routes/carrito.route.js';
import registerRouter from './routes/register.route.js';
/*Otros */
import { AtlasDAO } from './DAO/Atlas.js'
/*Dependencias */
import passport from 'passport'; 


const __dirname = path.resolve();

const app = Express();
export const atlasDAO = new AtlasDAO;

app.use(Express.json());
app.use(express.static(`${__dirname}/src/public`));
app.use(session({
    secret:'secret',
    cookie: {
        maxAge: 600000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);
app.use("/register", registerRouter);

app.get("/", (req,res) => {
    return res.json({message: "bienvenido"})
});

export default app;