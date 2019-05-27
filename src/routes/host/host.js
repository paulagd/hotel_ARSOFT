import express from 'express'
import { getHosts, getHost, updateHost, addHost } from "../../controller/host";

let router = express.Router();

router.get('', getHosts);
router.post('', addHost);
router.get('/:id', getHost);
router.post('/:id', updateHost);

export default router;
