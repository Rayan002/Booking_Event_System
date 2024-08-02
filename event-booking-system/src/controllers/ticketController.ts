import { Request, Response } from 'express';
import Booking from '../models/booking';
import Event from '../models/event';

export const printTicket = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const event = await Event.findById(booking.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const ticketDetails = {
      event: {
        name: event.name,
        date: event.date,
        totalTickets: event.totalTickets,
      },
      booking: {
        userId: booking.userId,
        quantity: booking.quantity,
        timestamp: booking.timestamp,
      },
    };

    res.status(200).json(ticketDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error printing ticket' });
  }
};
