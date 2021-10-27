import mongoose from 'mongoose';
import * as productoModel from '../mongoLocalDao/models/producto-model';
import * as carritoModel from '../mongoLocalDao/models/carrito-model';

export const models = {
    carrito: {
        constructor : (schema) => {return new carritoModel.carrito(schema)},
        classModel : carritoModel.carrito
    },
    productos: {
        constructor : (schema) => {return new productoModel.producto(schema)},
        classModel : productoModel.producto
    }
}
export class atlasDAO {

    constructor() {
        this.connectDB()
        .then(res => {
            console.log('Conectado a db mongo local!');
        })
        .catch(error => {
            console.log(error);
        });
    }

    async connectDB() {
        const URL = 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(URL,{
            useNewUrlParser: true
        }) 
    }

    insert(model,schema) {
        const  newModel = models[model].constructor(schema);
        newModel.save(); 
    }

    read(model,query=null) {
        const newModel = models[model].classModel;
        return newModel.find(query);
    }

    update(model,query,elemsUpdates) {
        const newModel = models[model].classModel;
       return newModel.updateOne(query, {
            $set: elemsUpdates    
        })
    }

    delete(model,query) {
        const newModel = models[model].classModel;
        return newModel.deleteOne(query);
    }
}