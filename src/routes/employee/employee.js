import express from 'express'
import { login, registration, getEmployees, getEmployee } from "../../controller/employee";
import {addClient, getClient, getClients} from "../../controller/client";

let router = express.Router();

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/login', login);
router.post('/registration', registration);
// router.get('/free', getFreeRooms);
// router.get('/:id', getRoom);
// router.post('/:id', updateRoom);

export default router;
