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
exports.cancelBooking = exports.createBooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const event_1 = __importDefault(require("../models/event"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, eventId, quantity } = req.body;
        if (quantity > 15) {
            return res.status(400).json({ error: 'Cannot book more than 15 tickets per request' });
        }
        const event = yield event_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        if (event.totalTickets - event.bookedTickets < quantity) {
            return res.status(400).json({ error: 'Not enough tickets available' });
        }
        event.bookedTickets += quantity;
        yield event.save();
        const newBooking = new booking_1.default({ userId, eventId, quantity });
        yield newBooking.save();
        res.status(201).json(newBooking);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating booking' });
    }
});
exports.createBooking = createBooking;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_1.default.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const event = yield event_1.default.findById(booking.eventId);
        if (event) {
            event.bookedTickets -= booking.quantity;
            yield event.save();
        }
        yield booking_1.default.findByIdAndDelete(req.params.id); // Use `findByIdAndDelete` on the Booking model
        res.status(200).json({ message: 'Booking cancelled' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error cancelling booking' });
    }
});
exports.cancelBooking = cancelBooking;
