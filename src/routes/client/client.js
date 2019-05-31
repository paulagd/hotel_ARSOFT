import express from 'express'
import { getClients, getClient, addClient, updateClient, login} from "../../controller/client";

let router = express.Router();

router.get('', getClients);
router.post('', addClient);
router.get('/:id', getClient);
router.post('/:id', updateClient);

export default router;
