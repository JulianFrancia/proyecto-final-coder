import mongoose from 'mongoose';

const carritollection = 'carrito';

const carritoSchema = mongoose.Schema({
    productos: {type: Array, require: true}
});

export const carrito = mongoose.model(carritollection, carritoSchema);