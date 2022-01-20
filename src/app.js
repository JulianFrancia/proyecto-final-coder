/*Express */
import Express from 'express';
import session from 'express-session';
import path from 'path';
/*Routes */
import productosRouter from './routes/productos.route.js';
import carritoRouter from './routes/carrito.route.js';
/*Otros */
import { AtlasDAO, models } from './DAO/Atlas.js'
/*Dependencias */
import passport from 'passport';
import  bcrypt  from "bcrypt";
import passportLocal from "passport-local";


const __dirname = path.resolve();

const app = Express();
export const atlasDAO = new AtlasDAO;

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(Express.static(`${__dirname}/src/public`));

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

passport.use('signup', new passportLocal.Strategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    models.usuarios.classModel.findOne({'username': username}, async (err, user) => {
        if(err) {
            console.log(err)
            return done(err)
        }
        if(user) {
            return done(null, false, console.log('ya existe el usuario'))
        } else {
            await models.usuarios.constructor(
                {username: username,
                password: createHash(password),
                email: req.body.email,
                direccion: req.body.direccion,
                edad: req.body.edad,
                nro_telefono: req.body.nro_telefono,
                avatar: req.body.avatar})
            .save();
            return done(null,username);
        }
    })
}));



passport.use('login', new passportLocal.Strategy({
    passReqToCallback: true,
    },
    function(req, username, password, done) {
        models.usuarios.classModel.findOne({'email': username}, (err, user) => {
            if(err) {
                console.log(err)
                return done(err)
            }
            if(!user) {
                return done(user)
            }
            if(validPassword(password, user.password)) {
                return done(null, user.username)
            } else {
                return done(null, false, console.log('contrasenia erronea'))
            }
        })
    }
    ));

function createHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

function validPassword (password, encriptedPass) {
    return bcrypt.compareSync(password, encriptedPass)
}

passport.serializeUser((username, done) => {
    models.usuarios.classModel.findOne({'username': username},(err,userFound) => {
        done(null, userFound._id);
    })
    
});

passport.deserializeUser((id, done)=>{
    models.usuarios.classModel.findOne({'_id': id},(err,user) => {
        done(null, user);
    })
});

app.post('/register', passport.authenticate('signup', {failureRedirect: '/failsignup'}), postSignUp);
app.get('/failsignup', getFailSignUp);
app.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), postLogin);
app.get('/failLogin', getFailLogin)

function postSignUp(req,res) {
    res.redirect('/index.html');
}

function getFailSignUp(req,res) {
    console.log('fallo')
    res.send('fail register')
}


function postLogin(req,res) {
    res.redirect('/home.html');
}


function getFailLogin(req,res) {
    res.send('fail login')
}

export default app;