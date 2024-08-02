"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTicket = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const event_1 = __importDefault(require("../models/event"));
const printTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingId } = req.body;
        const booking = yield booking_1.default.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const event = yield event_1.default.findById(booking.eventId);
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
    }
    catch (error) {
        res.status(500).json({ error: 'Error printing ticket' });
    }
});
exports.printTicket = printTicket;
