import  mongoose  from 'mongoose';
import * as productos from './schemas/productosSchema.js';
import * as usuarios from './schemas/usuarioSchema.js';
import * as ordenes from './schemas/ordenesSchema.js';

export const models = {
    productos: {
        constructor : (schema) => {return new productos.productos(schema)},
        classModel : productos.productos
    },
    usuarios: {
        constructor : (schema) => {return new usuarios.usuarios(schema)},
        classModel : usuarios.usuarios
    },
    ordenes: {
        constructor : (schema) => {return new ordenes.ordenes(schema)},
        classModel : ordenes.ordenes
    }
}

export const PRODUCTOS_MODEL = 'productos';
export const CARRITO_MODEL = 'carrito';
export const USUARIO_MODEL = 'usuarios';
export const ORDENES_MODEL = 'ordenes';


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
        switch(model) {
            case 'carrito' :
                this.insertProductCarrito(schema);
                break;
            case 'usuarios':
                models[USUARIO_MODEL].constructor(schema).save();
                break;
            default:
                break;
        }
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

    insertProducto(schema, filename) {
        let producto = new productos.productos(schema);
        producto.setImg(filename);
        producto.save();
    }

    insertProductCarrito(schema, userId) {
        this.read(USUARIO_MODEL, {_id: userId})
        .then(response => {
                const newModel = models[USUARIO_MODEL].classModel;
                return newModel.updateOne(
                    {_id:response._id},
                    { $push: { carrito: schema } }
                )
        })
        .catch(error => {
            console.log(error)
        })
    }

    deleteProductCarrito(id, userId) {
        return this.read(USUARIO_MODEL, {_id: userId})
        .then(response => {
                let idProducto = response.carrito.find(elem => elem._id == id)._id;
                const newModel = models[USUARIO_MODEL].classModel;
                return newModel.updateOne(
                    {_id:response._id},
                    { $pull: { carrito: {_id: idProducto} } }
                )
        })
        .catch(error => {
            console.log(error)
        })
    }

    insertOrden(schema, userId) {
        this.read(USUARIO_MODEL, {_id: userId})
        .then(response => {
            models[ORDENES_MODEL].constructor(schema).save();
            const newModel = models[USUARIO_MODEL].classModel;
            return newModel.updateOne(
                {_id: response._id},
                {$set: {carrito: []}}
            )
        });
    }

}