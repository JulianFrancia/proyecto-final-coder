import mongoose from 'mongoose';

const ordenesCollection = 'ordenes';

const OrdenesSchema = new mongoose.Schema({   
    items: {type: Array, required: true},
    nroOrden: {type: Number, required: true},
    date: {type: Date, required: true},
    estado: {type: String, required: true},
    email: {type: String, required: true}
})

export const ordenes = mongoose.model(ordenesCollection, OrdenesSchema);