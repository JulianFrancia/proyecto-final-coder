import mongoose from 'mongoose';

const productosCollection = 'productos';

const ProductosSchema = new mongoose.Schema({   
    nombre: {type: String, require: true},
    codigo: {type: String, require: true},
    imagen: {type: String, require: true},
    stock: {type: Number, require: true},
    descripcion: {type: String, require: true},
    precio : {type: Number, require: true}
})

export const productos = mongoose.model(productosCollection, ProductosSchema);