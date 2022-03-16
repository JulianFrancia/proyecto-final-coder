import { atlasDAO } from '../app.js';
import { ORDENES_MODEL } from '../DAO/Atlas.js';

export const compraService = (schema, userId) => {
    return atlasDAO.read(ORDENES_MODEL)
    .then(res => {
        const schemaObj = {
            items: schema.items,
            nroOrden: res.length,
            date: Date.now(),
            estado: 'generada',
            email: schema.email
        }
        return atlasDAO.insertOrden(schemaObj,userId)
        .then(response => response)
        .catch(err => err);
    })
    .catch(err => err)
}