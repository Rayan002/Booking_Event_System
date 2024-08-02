import { Request, Response } from 'express';
import Booking from '../models/booking';
import Event from '../models/event';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, eventId, quantity } = req.body;
    if (quantity > 15) {
      return res.status(400).json({ error: 'Cannot book more than 15 tickets per request' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.totalTickets - event.bookedTickets < quantity) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }

    event.bookedTickets += quantity;
    await event.save();

    const newBooking = new Booking({ userId, eventId, quantity });
    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    await Booking.findByIdAndDelete(req.params.id); // Use `findByIdAndDelete` on the Booking model

    res.status(200).json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ error: 'Error cancelling booking' });
  }
};
