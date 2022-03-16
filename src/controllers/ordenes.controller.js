import { compraService } from '../services/ordenes.service.js'

export const compraController = (req, res) => {
    compraService(req.body, req.params.userId)
    .then(response => res.status(200).json(response))
    .catch(error => console.log(error));
}