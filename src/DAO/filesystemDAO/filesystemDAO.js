import fs from 'fs';

export class fsDAO {

    constructor() {}

    insert(model,productos) {
        let file;
        file = model == 'productos' ? 'productos.txt' : 'carrito.txt';
        fs.writeFileSync(file, JSON.stringify(productos));
    }

    read(model,query=null) {
        let file;
        file = model == 'productos' ? 'productos.txt' : 'carrito.txt';
        fs.readFileSync(`../../controllers/${file}`);
    }
}