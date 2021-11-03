import fs from 'fs';
import { v4 } from "uuid";
import path from 'path';

export class fsDAO {

    productos = [];
    carrito = {productos: []}

    constructor() {
        console.log('fylesistem listo!');
    }

    insert(model,schema) {
        let file;
        if(model == 'productos') {
            schema["id"] = v4();
            this.productos.push(schema);
            file ='productos.txt'
            fs.writeFileSync(file, JSON.stringify(this.productos));
        } else {
            this.carrito.productos.push(schema);
            file ='carrito.txt'
            fs.writeFileSync(file, JSON.stringify(this.carrito));
        }
    }

    read(model,query=null) {
        const __dirname = path.resolve(path.dirname(''));
        path.join(__dirname, './src')
        let file;
        file = model == 'productos' ? 'productos.txt' : 'carrito.txt';
        return new Promise((resolve,reject) => {
            try {
                resolve(fs.readFileSync(`${__dirname}/${file}`,'utf-8'))
            } catch(err) {
                reject(err)
            }
        });
    }
}