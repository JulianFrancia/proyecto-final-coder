import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./ecommerce-75261-firebase-adminsdk-onfov-155657806e.json');


export const models = {
    carrito: 'carrito',
    productos: 'productos'
}

export class FirebaseDao {

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          });
          console.log('conectado con firebase')
    }

    initFirestore(model) {
        const db = admin.firestore();
        const query = db.collection(models[model]);
        return query;
    }

   async insert(model,schema) {
       if(model == 'carrito') {
            this.insertProductCarrito(model,schema)
       } else {
            const query = this.initFirestore(model);
            const doc = query.doc();
            doc.create(schema);
       }
    }

    async read(model,query=null) {
        if(query) {
            try {
                const queryFirebase = this.initFirestore(model);
                const doc = queryFirebase.doc(`${query}`);
                const item = await doc.get();
                const response = item.data();
                response["id"] = query;
                return response;
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                const queryFirebase = this.initFirestore(model);
                const items = queryFirebase.get();
                const docs = (await items).docs;
                return docs;
            } catch (error) {
                console.log(error)
            }
        }
    }

   async update(model,query,schema) {
        try {
            const queryFirebase = this.initFirestore(model);
            const doc = queryFirebase.doc(`${query}`);
            const item = await doc.update(schema);
            return item;
        } catch(error){
            console.log(error);
        }
    }

   async delete(model,query) {
        try {
            if(model == 'carrito') {
                this.deleteProductCarrito(model,query)
            } else {
                const queryFirebase = this.initFirestore(model);
                const doc = queryFirebase.doc(`${query}`);      
                const item = await doc.delete();
                return item;
            }
        } catch(error){
            console.log('Error!', error);
        }
    }

        //desde aqui se realizan funciones especificas para cada modelo:

        insertProductCarrito(model,schema) {
            this.read(model)
            .then(async response => {
                const carrito = await response.map(doc => ({
                    productos: doc.data().productos,
                    id:doc.id
                }));
                if(carrito.length == 0 ) {
                    const query = this.initFirestore(model);
                    const doc = query.doc();
                    doc.create({productos: [schema]});
                } else {
                    const query = this.initFirestore(model);
                    const doc = query.doc(carrito[0].id);
                    doc.update({
                        productos: admin.firestore.FieldValue.arrayUnion(schema)
                    })
                }
            })
            .catch(error => console.log(error))
        }

        deleteProductCarrito(model,schema) {
            this.read(model)
            .then(async response => {
                const carrito = await response.map(doc => ({
                    productos: doc.data().productos,
                    id:doc.id
                }));
                    const query = this.initFirestore(model);
                    const doc = query.doc(carrito[0].id);
                    doc.update({
                        productos: admin.firestore.FieldValue.arrayRemove(carrito[0].productos.filter(elem => elem.id == schema)[0])
                    });
            })
            .catch(error => console.log(error))
        }
}