import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import eventRoutes from './routes/eventRoutes';
import bookingRoutes from './routes/bookingRoutes';
import ticketRoutes from './routes/ticketRoutes';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);
app.use('/print-ticket', ticketRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eventBooking')
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
