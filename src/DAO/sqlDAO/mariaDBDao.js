import mariaDBConfig from './optionsMariadb/mariaDB.js'

export const models = {
    carrito: 'carrito',
    productos: 'productos'
}

export class MariaDBDAO {

    constructor() {
        this.createProductsTable();
        this.createCarritoTable();
    }

    async createProductsTable() {
        mariaDBConfig.schema.hasTable('productos')
        .then(async exist => {
            if(!exist) {
                await mariaDBConfig.schema.createTable('productos', table => {
                    table.increments('id')
                    table.string('nombre')
                    table.string('codigo')
                    table.string('imagen')
                    table.integer('stock')
                    table.string('descripcion')
                    table.float('precio')
                })
                .then(() => console.log('tabla productos creada!'))
                .catch((error) => console.log(error))
            }
        })
    }

   async createCarritoTable() {
    mariaDBConfig.schema.hasTable('carrito')
       .then(async exist => {
           if(!exist) {
                await mariaDBConfig.schema.createTableIfNotExists('carrito', table => {
                    table.increments('id')
                    table.string('nombre')
                    table.string('codigo')
                    table.string('imagen')
                    table.integer('stock')
                    table.string('descripcion')
                    table.float('precio')
                })
                .then(() => console.log('tabla carrito creada!'))
                .catch((error) => console.log(error))
           }
       })
    }

    async insert(model,schema) {
        await mariaDBConfig(model).insert(schema);
    }

    read(model, query=null) {
        if(query) {
            return this.readOne(model,query)
        } else {
            return this.readAll(model)
        }
    }

    update(model, query,schema) {
       return mariaDBConfig.from(model).where('id','=',query).update({
            nombre: schema.nombre,
            codigo: schema.codigo,
            imagen: schema.imagen,
            descripcion: schema.descripcion,
            stock: schema.stock,
            precio: schema.precio
        })
        .then(response => {
            return new Promise((resolve,reject) => {
                try {
                    resolve(response)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    delete(model,query) {
        return mariaDBConfig.from(model).where('id', '=', query).del()
        .then(response => {
            return new Promise((resolve,reject) => {
                try {
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            })
        })
    }

    //desde aqui se realizan funciones especificas para cada modelo:

    async readAll(model) {
        let response = await mariaDBConfig.from(model).select('*');
        let elems = [];
                for(let res of response) {
                    elems.push(res)
                }
                return elems;
    }

    async readOne(model,query) {
        return mariaDBConfig.from(model).select('nombre','codigo','imagen','stock','descripcion','precio','id').where('id','=', query)
            .then(response => {
                return new Promise((resolve,reject) => {
                    try {
                        resolve(response[0])
                    } catch (error) {
                        reject(error)
                    }
                })
            })
            .catch(error => console.log(error));
    }
}