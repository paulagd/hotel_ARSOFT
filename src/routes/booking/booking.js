import express from 'express'
import {getBooking} from "../../controller/booking";

let router = express.Router();

router.get('', getBooking);

export default router;

