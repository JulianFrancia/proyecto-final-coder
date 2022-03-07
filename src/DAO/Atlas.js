import  mongoose  from 'mongoose';
import * as productos from './schemas/productosSchema.js'; 
import * as carrito from './schemas/carritoSchema.js'; 
import * as usuarios from './schemas/usuarioSchema.js';

export const models = {
    carrito: {
        constructor : (schema) => {return new carrito.carrito(schema)},
        classModel : carrito.carrito
    },
    productos: {
        constructor : (schema) => {return new productos.productos(schema)},
        classModel : productos.productos
    },
    usuarios: {
        constructor : (schema) => {return new usuarios.usuarios(schema)},
        classModel : usuarios.usuarios
    }
}

export const PRODUCTOS_MODEL = 'productos';
export const CARRITO_MODEL = 'carrito';
export const USUARIO_MODEL = 'usuarios';


export class AtlasDAO {

    constructor() {
        this.connectDB();
    }

    connectDB() {

        const uri = `mongodb+srv://admin:${process.env.PASS_DB}@cluster0.bq275.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        mongoose.connect(uri, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, err => {
            if(err) throw new Error(`Erro en la conexion a la base de datos ${err}`);
            console.log('Base de datos conectada')
        })
    }

    insert(model,schema) {
        model === CARRITO_MODEL ? this.insertProductCarrito(schema) : models[model].constructor(schema).save();
    }

    read(model,query=null) {
        const newModel = models[model].classModel;
        return query ? newModel.findOne(query) : newModel.find();
    }

    update(model, query, elemsUpdates) {
        return models[model].classModel.updateOne({_id:query}, {
            $set: elemsUpdates    
        });
    }

    delete(model, query) {
        return model === CARRITO_MODEL ? this.deleteProductCarrito(query) : models[model].classModel.deleteOne({_id : query});
    }

    //desde aqui se realizan funciones especificas para cada modelo:

    insertProductCarrito(schema) {
        this.read(CARRITO_MODEL)
        .then(response => {
            if(response.length == 0) {
                const  newModel = models[CARRITO_MODEL].constructor({productos:[schema]});
                newModel.save(); 
            } else {
                const newModel = models[CARRITO_MODEL].classModel;
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
        return this.read(CARRITO_MODEL)
        .then(response => {
            if(response.length > 0) {
                let idProducto = response[0].productos.find(elem => elem._id == id)._id;
                const newModel = models[CARRITO_MODEL].classModel;
                return newModel.updateOne(
                    {_id:response[0]._id},
                    { $pull: { productos: {_id: idProducto} } }
                )
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

}