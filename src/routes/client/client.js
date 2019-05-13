import express from 'express'
import { getClients, getClient } from "../../controller/client";

let router = express.Router();

router.get('', getClients);
router.get('/:id', getClient);

export default router;
