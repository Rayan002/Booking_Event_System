"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(body_parser_1.default.json());
// Routes
app.use('/events', eventRoutes_1.default);
app.use('/bookings', bookingRoutes_1.default);
app.use('/print-ticket', ticketRoutes_1.default);
// MongoDB Connection
mongoose_1.default.connect('mongodb://localhost:27017/eventBooking')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
