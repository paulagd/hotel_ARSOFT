import express from 'express'
import { registration, getEmployees, getEmployee } from "../../controller/employee";

const router = express.Router();

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/registration', registration);

export default router;
