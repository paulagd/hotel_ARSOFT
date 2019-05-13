import express from 'express'
import { getBookings, getBooking } from "../../controller/booking";

let router = express.Router();

router.get('', getBookings);
router.get('/:id', getBooking);
// router.get('/:id/hosts', getHostsBooking);

export default router;
  
