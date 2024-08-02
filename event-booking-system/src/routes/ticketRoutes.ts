import express from 'express';
import { printTicket } from '../controllers/ticketController';

const router = express.Router();

router.post('/', printTicket);

export default router;
