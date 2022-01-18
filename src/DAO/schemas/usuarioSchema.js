import mongoose from 'mongoose';

const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({   
    name: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, required: true}
})

export const usuarios = mongoose.model(usuariosCollection, UsuarioSchema);