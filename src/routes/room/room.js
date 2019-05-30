import express from 'express'
import { getRooms, getRoom, getFreeRooms, updateRoom} from "../../controller/room";

let router = express.Router();

router.get('', getRooms);
router.get('/free', getFreeRooms);
router.get('/:id', getRoom);
router.post('/:id', updateRoom);

export default router;
