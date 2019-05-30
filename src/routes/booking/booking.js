import express from 'express'
import { getBookings, getBooking, updateBooking, addBooking, addHost2Reservation, assignRoom2Reservation } from "../../controller/booking";

let router = express.Router();

router.get('', getBookings);
router.post('', addBooking);
router.get('/:id', getBooking);
router.post('/:id', updateBooking);
router.post('/:id/addHost', addHost2Reservation);
router.post('/:id/assignRoom', assignRoom2Reservation);
// router.get('/:id/hosts', getHostsBooking);

export default router;
  
