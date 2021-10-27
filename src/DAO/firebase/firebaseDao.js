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
        const query = this.initFirestore(model);
        const doc = query.doc();
        doc.create(schema);
    }

    async read(model,query) {
        console.log(model)
        if(query) {
            try {
                const queryFirebase = this.initFirestore(model);
                const doc = queryFirebase.doc(`${query}`);
                const item = await doc.get();
                console.log(item.data())
                const response = item.data();
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
            const queryFirebase = this.initFirestore(model);
            const doc = queryFirebase.doc(`${query}`);      
            const item = await doc.delete();
            return item;
        } catch(error){
            console.log('Error!', error);
        }
    }
}