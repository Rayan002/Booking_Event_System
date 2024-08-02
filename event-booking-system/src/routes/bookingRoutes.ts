import express from 'express';
import { createBooking, cancelBooking } from '../controllers/bookingController';

const router = express.Router();

router.post('/', createBooking);
router.delete('/:id', cancelBooking);

export default router;
