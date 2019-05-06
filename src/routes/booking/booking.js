import express from 'express'
import { getBookings, getBooking } from "../../controller/booking";

let router = express.Router();

router.get('', getBookings);
router.get(':id', getBooking);

export default router;
