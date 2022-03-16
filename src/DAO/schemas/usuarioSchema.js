import mongoose from 'mongoose';

const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({   
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    direccion: {type: String, required: true},
    edad: {type: Number, required: true},
    nroTelefono: {type: String, required: true},
    avatar: {type: String, required: true},
    carrito: {type : Array, required: true}
})

export const usuarios = mongoose.model(usuariosCollection, UsuarioSchema);