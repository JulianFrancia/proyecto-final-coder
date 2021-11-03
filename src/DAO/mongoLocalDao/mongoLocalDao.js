import mongoose from 'mongoose';
import * as productoModel from './models/producto-model.js';
import * as carritoModel from './models/carrito-model.js';

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

export class mongoLocalDao {

    constructor() {
        this.connectDB()
        .then(res => {
            console.log('Conectado a db mongo local!');
        })
        .catch(error => {
            console.log(error);
        })
    }

    async connectDB() {
        const URL = 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(URL,{
            useNewUrlParser: true
        }) 
    }

    insert(model,schema) {
        if(model == 'carrito') {
            this.insertProductCarrito(schema) 
        } else {
            const  newModel = models[model].constructor(schema);
            newModel.save(); 
        }
    }

    read(model,query=null) {
        const newModel = models[model].classModel;
        if(query) {
            return newModel.findOne({_id : query});
        } else {
            return newModel.find()
        }
    }

    update(model,query,elemsUpdates) {
        const newModel = models[model].classModel;
       return newModel.updateOne({_id:query}, {
            $set: elemsUpdates    
        })
    }

    delete(model,query) {
        if(model == 'carrito') {
            this.deleteProductCarrito(query) 
        } else {
            const newModel = models[model].classModel;
            return newModel.deleteOne({_id : query});
        }
    }

    //desde aqui se realizan funciones especificas para cada modelo:

    insertProductCarrito(schema) {
        this.read('carrito')
        .then(response => {
            if(response.length == 0) {
                const  newModel = models['carrito'].constructor({productos:[schema]});
                newModel.save(); 
            } else {
                const newModel = models['carrito'].classModel;
                return newModel.updateOne(
                    {_id:response[0]._id},
                    { $push: { productos: schema } }
                )
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    deleteProductCarrito(id) {
        this.read('carrito')
        .then(response => {
            if(response.length > 0) {
                let codigo = response[0].productos.find(elem => elem._id == id).codigo;
                const newModel = models['carrito'].classModel;
                return newModel.updateOne(
                    {_id:response[0]._id},
                    { $pull: { productos: {codigo: codigo} } }
                )
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}